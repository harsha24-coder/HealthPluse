import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Star,
  Send,
  CheckCircle,
  ThumbsUp,
  User
} from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function FeedbackPage() {
  const { language } = useLanguage();
  const isTe = language === 'te';
  const { user } = useAuth();

  const [feedbackList, setFeedbackList] = useState([]);
  const [avgRating, setAvgRating] = useState('5.0');
  const [loading, setLoading] = useState(true);

  // Form
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Awareness Program');
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = () => {
    api.get('/feedback')
      .then(res => {
        if (res.data.success) {
          setFeedbackList(res.data.data);
          setAvgRating(res.data.averageRating);
        }
      })
      .catch(err => console.error('Feedback error:', err))
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comments) return;

    setSubmitting(true);
    api.post('/feedback', {
      name,
      email,
      rating,
      category,
      comments
    })
      .then(res => {
        if (res.data.success) {
          setSubmitted(true);
          setComments('');
          loadFeedback();
          setTimeout(() => setSubmitted(false), 4000);
        }
      })
      .catch(err => {
        console.error('Feedback submission error:', err);
        alert('Could not submit feedback.');
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>Public Feedback & Ratings</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {isTe ? 'ప్రజల అభిప్రాయాలు & రేటింగ్‌లు' : 'Feedback & Public Voice'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
          {isTe
            ? 'ఈ ఆరోగ్య అవగాహన పోర్టల్ మరియు సేవలపై మీ విలువైన సలహాలు, అభిప్రాయాలను పంచుకోండి.'
            : 'Help us improve health awareness content and wellness resources by providing your thoughts.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            {isTe ? 'మీ అభిప్రాయాన్ని తెలపండి' : 'Share Your Experience'}
          </h3>

          {submitted && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center space-x-2 border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Feedback submitted successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anusha Rani"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. anusha@example.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
              >
                <option value="Awareness Program">Health Awareness Content</option>
                <option value="Health Content">Educational Information</option>
                <option value="Quiz & Survey">Interactive Quiz & Survey</option>
                <option value="General Suggestion">General Wellness Suggestion</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Overall Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Comments & Suggestions *</label>
              <textarea
                rows="4"
                required
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your thoughts about personal hygiene tips or ward health camps..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting...' : 'Submit Feedback'}</span>
            </button>
          </form>
        </div>

        {/* Feedback Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs text-slate-500">Public Average Rating</span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black text-slate-900">{avgRating}</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
              {feedbackList.length} Responses
            </span>
          </div>

          {loading ? (
            <div className="min-h-[20vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {feedbackList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.name}</h4>
                        <span className="text-[10px] text-slate-400">
                          {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(item.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    "{item.comments}"
                  </p>

                  <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {item.category}
                    </span>
                    <span className="text-emerald-700 font-semibold">Citizen Review</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
