import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  UserCheck,
  HeartPulse
} from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function SurveyPage() {
  const { language } = useLanguage();
  const isTe = language === 'te';
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [participantName, setParticipantName] = useState(user ? user.name : '');
  const [age, setAge] = useState(user ? user.age || '' : '');
  const [gender, setGender] = useState(user ? user.gender || 'Male' : 'Male');
  const [area, setArea] = useState(user ? user.area || 'General Ward' : 'General Ward');
  const [answers, setAnswers] = useState({});

  // Active step (sections 1 to 7)
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    api.get('/surveys/questions')
      .then(res => {
        if (res.data.success) {
          setQuestions(res.data.data);
        }
      })
      .catch(err => {
        console.error('Error loading survey questions:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Group questions by section_number
  const sections = [
    { num: 1, title_en: "1. Personal Information", title_te: "1. వ్యక్తిగత సమాచారం" },
    { num: 2, title_en: "2. General Health", title_te: "2. సాధారణ ఆరోగ్యం" },
    { num: 3, title_en: "3. Food and Lifestyle", title_te: "3. ఆహారం మరియు జీవనశైలి" },
    { num: 4, title_en: "4. Hygiene & Cleanliness", title_te: "4. పరిశుభ్రత & పారిశుధ్యం" },
    { num: 5, title_en: "5. Disease Awareness", title_te: "5. వ్యాధుల అవగాహన" },
    { num: 6, title_en: "6. Mental Health", title_te: "6. మానసిక ఆరోగ్యం" },
    { num: 7, title_en: "7. Awareness & Support", title_te: "7. అవగాహన మరియు మద్దతు" },
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const currentQuestions = questions.filter(q => q.section_number === currentSection);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!participantName) {
      alert(isTe ? 'దయచేసి మీ పేరు నమోదు చేయండి.' : 'Please enter your name.');
      setCurrentSection(1);
      return;
    }

    setSubmitting(true);
    api.post('/surveys/submit', {
      participant_name: participantName,
      age: age ? parseInt(age) : null,
      gender,
      area,
      answers
    })
      .then(res => {
        if (res.data.success) {
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      })
      .catch(err => {
        console.error('Survey submission error:', err);
        alert('Failed to submit survey. Please verify your connection.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600"></div>
        <p className="text-xs text-slate-500 font-medium">Loading 17-Question Health Survey...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">
          {isTe ? 'సర్వే విజయవంతంగా సమర్పించబడింది!' : 'Thank You for Participating!'}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed max-w-lg mx-auto">
          {isTe
            ? 'ప్రజా ఆరోగ్యాభివృద్ధి మరియు శ్రేయస్సు కోసం మీ సమాధానాలు భద్రపరచబడ్డాయి.'
            : 'Your responses have been recorded in the HealthPulse database to support continuous public health improvements across society.'}
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
              setCurrentSection(1);
            }}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-800 transition"
          >
            {isTe ? 'మరొక సర్వే సమర్పించండి' : 'Submit Another Survey'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <ClipboardList className="w-3.5 h-3.5 text-teal-600" />
          <span>Public Wellness • 17-Question Questionnaire</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {isTe ? 'ప్రజా ఆరోగ్య సర్వే' : 'Public Health Awareness Survey'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
          {isTe
            ? 'ప్రజల ఆరోగ్యం మరియు జీవనశైలి అవగాహన కోసం రూపొందించిన 7 విభాగాల సమగ్ర సర్వే.'
            : 'Comprehensive 7-section questionnaire for health awareness and preventive wellness.'}
        </p>
      </div>

      {/* Section Progress Stepper */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[500px] text-xs">
          {sections.map(s => {
            const isDone = s.num < currentSection;
            const isCurrent = s.num === currentSection;
            return (
              <button
                key={s.num}
                onClick={() => setCurrentSection(s.num)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg font-semibold transition ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isDone
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <span>S{s.num}</span>
                <span className="hidden sm:inline font-normal">
                  {isTe ? s.title_te.split('.')[1] : s.title_en.split('.')[1]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {isTe ? sections[currentSection - 1].title_te : sections[currentSection - 1].title_en}
          </h2>
          <p className="text-xs text-slate-500">
            Section {currentSection} of 7 • Please answer truthfully.
          </p>
        </div>

        {/* Section 1 Extra: Demographics Form Fields */}
        {currentSection === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Participant Full Name *
              </label>
              <input
                type="text"
                required
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-emerald-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                <input
                  type="number"
                  min="5"
                  max="110"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 28"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-emerald-500 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Residential Ward / Location Context
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-emerald-500 bg-white"
              />
            </div>
          </div>
        )}

        {/* Dynamic Questions for Current Section */}
        <div className="space-y-6">
          {currentQuestions.map((q) => {
            const selectedVal = answers[q.id] || '';
            const opts = Array.isArray(q.options) ? q.options : [];

            return (
              <div key={q.id} className="space-y-3 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
                <label className="block text-sm font-bold text-slate-900 leading-snug">
                  {q.order_seq}. {isTe ? q.question_te : q.question_en}
                </label>

                {/* Radio or Options rendering */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {opts.map((opt, oIdx) => {
                    const isChecked = selectedVal === opt;
                    return (
                      <button
                        type="button"
                        key={oIdx}
                        onClick={() => handleAnswerChange(q.id, opt)}
                        className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center space-x-2.5 ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                            : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isChecked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setCurrentSection(prev => Math.max(1, prev - 1))}
            disabled={currentSection === 1}
            className="inline-flex items-center space-x-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isTe ? 'మునుపటి విభాగం' : 'Previous Section'}</span>
          </button>

          {currentSection < 7 ? (
            <button
              type="button"
              onClick={() => setCurrentSection(prev => Math.min(7, prev + 1))}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm"
            >
              <span>{isTe ? 'తరువాతి విభాగం' : 'Next Section'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : isTe ? 'సర్వే సమర్పించండి' : 'Submit Final Survey'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
