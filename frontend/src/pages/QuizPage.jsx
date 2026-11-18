import React, { useState, useEffect } from 'react';
import {
  Award,
  Sparkles,
  Apple,
  ShieldCheck,
  Activity,
  CheckCircle,
  XCircle,
  RefreshCw,
  ArrowRight,
  HelpCircle,
  Trophy
} from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const DEFAULT_CATEGORIES = [
  { id: 1, title_en: 'Personal Hygiene Quiz', title_te: 'వ్యక్తిగత పరిశుభ్రత క్విజ్', total_questions: 5 },
  { id: 2, title_en: 'Healthy Food and Nutrition', title_te: 'ఆరోగ్యకరమైన ఆహారం మరియు పోషకాహారం', total_questions: 5 },
  { id: 3, title_en: 'Common Diseases & Prevention', title_te: 'సాధారణ వ్యాధులు మరియు నివారణ', total_questions: 5 },
  { id: 4, title_en: 'Preventive Healthcare & Habits', title_te: 'నివారణ ఆరోగ్య సంరక్షణ & అలవాట్లు', total_questions: 5 }
];

export default function QuizPage() {
  const { language } = useLanguage();
  const isTe = language === 'te';
  const { user } = useAuth();

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedQuiz, setSelectedQuiz] = useState(DEFAULT_CATEGORIES[0]);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [participantName, setParticipantName] = useState(user ? user.name : '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Load quiz categories
  useEffect(() => {
    api.get('/quizzes/categories')
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          setCategories(res.data.data);
        }
      })
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  // When selectedQuiz changes, load 5 questions
  useEffect(() => {
    if (selectedQuiz) {
      startQuiz(selectedQuiz.id);
    }
  }, [selectedQuiz?.id]);

  const startQuiz = (quizId) => {
    setLoading(true);
    setResult(null);
    setAnswers({});
    setCurrentIdx(0);

    api.get(`/quizzes/${quizId}/questions`)
      .then(res => {
        if (res.data.success) {
          setQuestions(res.data.data);
        }
      })
      .catch(err => console.error('Failed to load questions:', err))
      .finally(() => setLoading(false));
  };

  const handleSelectOption = (questionId, optionLetter) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionLetter
    }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length < questions.length) {
      if (!window.confirm(isTe ? 'మీరు అన్ని ప్రశ్నలకు సమాధానాలు ఇవ్వలేదు. సమర్పించాలనుకుంటున్నారా?' : 'You haven\'t answered all questions. Submit anyway?')) {
        return;
      }
    }

    setLoading(true);
    api.post(`/quizzes/${selectedQuiz.id}/submit`, {
      participant_name: participantName || (user ? user.name : 'Citizen Learner'),
      user_answers: answers
    })
      .then(res => {
        if (res.data.success) {
          setResult(res.data);
        }
      })
      .catch(err => {
        console.error('Quiz submission error:', err);
        alert('Could not submit quiz. Please check server connection.');
      })
      .finally(() => setLoading(false));
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Health Champion':
        return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950';
      case 'Health Expert':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white';
      case 'Health Learner':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
      case 'Health Beginner':
        return 'bg-gradient-to-r from-slate-600 to-slate-700 text-white';
      default:
        return 'bg-slate-200 text-slate-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>Interactive Health Awareness Quiz</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {isTe ? 'ఆరోగ్య అవగాహన క్విజ్' : 'Health Knowledge Quiz Challenge'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
          {isTe
            ? 'ప్రతి క్విజ్ లో 5 ప్రశ్నలు ఉంటాయి. సరైన సమాధానాలు ఇచ్చి మీ హెల్త్ బ్యాడ్జ్‌ని అందుకోండి!'
            : 'Answer 5 multiple-choice questions to test your preventive health awareness and unlock achievement badges.'}
        </p>
      </div>

      {/* Quiz Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => {
          const isCurrent = selectedQuiz?.id === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedQuiz(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm ${
                isCurrent
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isTe ? cat.title_te : cat.title_en}
            </button>
          );
        })}
      </div>

      {/* Quiz Card or Result Screen */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600"></div>
          <p className="text-xs text-slate-500 font-medium">Preparing questions...</p>
        </div>
      ) : result ? (
        /* RESULT VIEW */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className={`inline-block px-5 py-2 rounded-2xl font-black text-sm sm:text-base shadow-sm ${getBadgeStyle(result.badge)}`}>
              🏆 {result.badge}
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900">
              {result.score >= 4 ? 'Congratulations!' : 'Good Effort! Keep Learning!'}
            </h2>

            <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-slate-800">
              <span>You scored:</span>
              <span className="text-emerald-600 text-3xl">{result.score}</span>
              <span>/</span>
              <span>{result.total}</span>
              <span className="text-sm font-semibold text-slate-500">({result.percentage}%)</span>
            </div>

            <p className="text-xs text-slate-500">
              Result recorded for <strong>{participantName || 'Guest'}</strong> under {isTe ? selectedQuiz?.title_te : selectedQuiz?.title_en}.
            </p>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>{isTe ? 'ప్రశ్నల సమాధానాల సమీక్ష & వివరణ' : 'Answers Review & Explanations'}</span>
            </h3>

            <div className="space-y-3">
              {result.review.map((item, idx) => {
                const questionData = questions.find(q => q.id === item.question_id);
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                      item.is_correct
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : 'bg-rose-50/60 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-slate-800">
                        {idx + 1}. {isTe ? questionData?.question_te : questionData?.question_en}
                      </p>
                      {item.is_correct ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold shrink-0">
                          <CheckCircle className="w-4 h-4" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-rose-700 font-bold shrink-0">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>

                    <div className="text-slate-600 space-y-1">
                      <p>
                        Your choice: <strong className="text-slate-900">Option {item.user_choice || 'None'}</strong> • Correct: <strong className="text-emerald-700">Option {item.correct_option}</strong>
                      </p>
                      <p className="text-slate-700 bg-white/70 p-2.5 rounded-lg border border-slate-200/50">
                        💡 <strong>Why:</strong> {isTe ? item.explanation_te : item.explanation_en}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => startQuiz(selectedQuiz.id)}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isTe ? 'మళ్ళీ ఆడండి' : 'Retake This Quiz'}</span>
            </button>
          </div>
        </div>
      ) : questions.length > 0 ? (
        /* QUIZ QUESTIONS ACTIVE VIEW */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Header bar: Participant Name + Progress */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                {isTe ? selectedQuiz?.title_te : selectedQuiz?.title_en}
              </span>
              <div className="text-xs text-slate-500 mt-0.5">
                Question {currentIdx + 1} of {questions.length}
              </div>
            </div>

            {/* Optional Participant Name input */}
            <div className="flex items-center space-x-2">
              <label className="text-xs text-slate-500">Name:</label>
              <input
                type="text"
                placeholder="Participant Name"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                className="px-3 py-1 text-xs border border-slate-200 rounded-lg focus:outline-emerald-500"
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentIdx + 1}. {isTe ? questions[currentIdx].question_te : questions[currentIdx].question_en}
            </h2>

            {/* 4 Options */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {['A', 'B', 'C', 'D'].map((letter) => {
                const optKeyEn = `option_${letter.toLowerCase()}_en`;
                const optKeyTe = `option_${letter.toLowerCase()}_te`;
                const isSelected = answers[questions[currentIdx].id] === letter;

                return (
                  <button
                    key={letter}
                    onClick={() => handleSelectOption(questions[currentIdx].id, letter)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center space-x-3 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/20'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {letter}
                    </span>
                    <span>
                      {isTe ? questions[currentIdx][optKeyTe] : questions[currentIdx][optKeyEn]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50"
            >
              {isTe ? 'మునుపటిది' : 'Previous'}
            </button>

            <div className="flex space-x-1">
              {questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                    idx === currentIdx
                      ? 'bg-slate-900 text-white'
                      : answers[q.id]
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
              >
                {isTe ? 'తరువాతిది' : 'Next'}
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-sm"
              >
                {isTe ? 'క్విజ్ సమర్పించండి' : 'Submit Quiz'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center space-y-4">
          <HelpCircle className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            {isTe ? 'క్విజ్ లోడ్ అవుతోంది లేదా సిద్ధంగా ఉంది' : 'Quiz Ready'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {isTe ? 'ప్రశ్నలను చూడటానికి క్రింది బటన్ నొక్కండి.' : 'Click below to load or restart the interactive questions for this category.'}
          </p>
          <button
            onClick={() => startQuiz(selectedQuiz?.id || 1)}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition"
          >
            {isTe ? 'క్విజ్ ప్రారంభించండి' : 'Start Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}
