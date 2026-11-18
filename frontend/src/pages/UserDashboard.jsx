import React, { useState, useEffect } from 'react';
import {
  User,
  Award,
  ClipboardList,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function UserDashboard() {
  const { user, updateUser } = useAuth();
  const { language } = useLanguage();
  const isTe = language === 'te';

  const [quizHistory, setQuizHistory] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile Edit
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [age, setAge] = useState(user?.age || '');
  const [area, setArea] = useState(user?.area || '');
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const [quizRes, surveyRes, reminderRes] = await Promise.all([
        api.get('/quizzes/my-history').catch(() => ({ data: { data: [] } })),
        api.get('/surveys/my-surveys').catch(() => ({ data: { data: [] } })),
        api.get('/reminders').catch(() => ({ data: { data: [] } }))
      ]);

      setQuizHistory(quizRes.data.data || []);
      setSurveys(surveyRes.data.data || []);
      setReminders(reminderRes.data.data || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    api.put('/auth/profile', {
      name,
      phone,
      age: age ? parseInt(age) : null,
      area
    })
      .then(res => {
        if (res.data.success) {
          updateUser(res.data.user);
          setEditSuccess(true);
          setTimeout(() => setEditSuccess(false), 3000);
        }
      })
      .catch(err => console.error('Profile update error:', err));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Welcome Bar */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 text-2xl font-black">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="text-xs text-emerald-200 font-semibold uppercase tracking-wider">
              {isTe ? 'పౌర డ్యాష్‌బోర్డ్' : 'Citizen Health Portal'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome, {user?.name}!
            </h1>
            <p className="text-xs text-emerald-100">
              {user?.area || 'General Ward'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/quiz"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition"
          >
            Play Health Quiz
          </Link>
          <Link
            to="/survey"
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs rounded-xl transition"
          >
            Fill Survey
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Profile Details & Update */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>Personal Profile</span>
            </h3>

            {editSuccess && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200 flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email (Registered)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Role</label>
                  <input
                    type="text"
                    disabled
                    value={user?.role || 'user'}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 uppercase font-bold text-[10px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Ward Location</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition"
              >
                Save Profile Changes
              </button>
            </form>
          </div>

          {/* Quick Active Reminders */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Bell className="w-4 h-4 text-emerald-600" />
                <span>My Active Reminders</span>
              </h3>
              <Link to="/reminders" className="text-xs text-emerald-700 font-bold hover:underline">
                Manage
              </Link>
            </div>

            {reminders.length === 0 ? (
              <p className="text-xs text-slate-400">No active reminders set.</p>
            ) : (
              <div className="space-y-2">
                {reminders.slice(0, 3).map(r => (
                  <div key={r.id} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{isTe ? r.title_te : r.title_en}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{r.target_time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Quiz History & Completed Surveys */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quiz Achievements */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Quiz Attempts & Achievement Badges</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                {quizHistory.length} Attempts
              </span>
            </div>

            {loading ? (
              <div className="text-center py-6 text-xs text-slate-400">Loading history...</div>
            ) : quizHistory.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                <p className="text-xs text-slate-500">You haven't participated in any quizzes yet.</p>
                <Link
                  to="/quiz"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <span>Start your first health quiz now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {quizHistory.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900">
                        {isTe ? q.quiz_title_te : q.quiz_title_en}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {q.completed_at ? new Date(q.completed_at).toLocaleString() : 'Recent'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-emerald-700 font-extrabold text-base">
                          {q.score}/{q.total}
                        </span>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Score</div>
                      </div>
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        🏅 {q.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed Health Surveys */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <ClipboardList className="w-5 h-5 text-teal-600" />
                <span>Submitted Health Surveys</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {surveys.length} Submitted
              </span>
            </div>

            {loading ? (
              <div className="text-center py-6 text-xs text-slate-400">Loading surveys...</div>
            ) : surveys.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                <p className="text-xs text-slate-500">No survey responses submitted yet.</p>
                <Link
                  to="/survey"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-teal-600 hover:text-teal-700"
                >
                  <span>Participate in the 17-question health survey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {surveys.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 flex items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Public Health Awareness Survey
                      </h4>
                      <p className="text-xs text-slate-500">
                        Recorded for: {s.participant_name} ({s.gender}, Age: {s.age || 'N/A'})
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Submitted: {s.submitted_at ? new Date(s.submitted_at).toLocaleString() : 'Recent'}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-teal-600 text-white font-bold text-xs">
                      Recorded ✓
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
