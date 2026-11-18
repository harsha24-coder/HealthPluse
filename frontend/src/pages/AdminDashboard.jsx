import React, { useState, useEffect } from 'react';
import {
  Users,
  ClipboardList,
  Award,
  MessageSquare,
  Star,
  Plus,
  Trash2,
  Calendar,
  ShieldAlert,
  Eye,
  CheckCircle,
  FileText,
  BookOpen
} from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function AdminDashboard() {
  const { language } = useLanguage();
  const isTe = language === 'te';

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSurveys: 0,
    totalQuizzes: 0,
    totalFeedback: 0,
    avgRating: 5.0,
    totalActivities: 0
  });

  const [activeTab, setActiveTab] = useState('surveys'); // 'surveys' | 'quizzes' | 'users' | 'feedback' | 'content'
  const [surveys, setSurveys] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  // Survey Detail Modal
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  // New Content Form
  const [newContent, setNewContent] = useState({
    category: 'Personal Hygiene',
    title_en: '',
    title_te: '',
    summary_en: '',
    summary_te: '',
    content_en: '',
    content_te: '',
    author: 'Ward Health Coordinator'
  });
  const [contentSuccess, setContentSuccess] = useState(false);

  useEffect(() => {
    loadDashboardStats();
    loadTabContent(activeTab);
  }, [activeTab]);

  const loadDashboardStats = () => {
    api.get('/admin/stats')
      .then(res => {
        if (res.data.success) {
          setStats(res.data.stats);
        }
      })
      .catch(err => console.error('Admin stats error:', err));
  };

  const loadTabContent = (tab) => {
    setLoading(true);
    if (tab === 'surveys') {
      api.get('/surveys/all-responses')
        .then(res => setSurveys(res.data.data || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else if (tab === 'quizzes') {
      api.get('/quizzes/all-results')
        .then(res => setQuizzes(res.data.data || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else if (tab === 'users') {
      api.get('/admin/users')
        .then(res => setUsers(res.data.data || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else if (tab === 'feedback') {
      api.get('/feedback')
        .then(res => setFeedback(res.data.data || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  const handleDeleteUser = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    api.delete(`/admin/users/${userId}`)
      .then(() => {
        setUsers(prev => prev.filter(u => u.id !== userId));
        loadDashboardStats();
      })
      .catch(err => alert(err.response?.data?.message || 'Delete failed'));
  };

  const handleDeleteFeedback = (fbId) => {
    if (!window.confirm('Delete this feedback?')) return;
    api.delete(`/feedback/${fbId}`)
      .then(() => {
        setFeedback(prev => prev.filter(f => f.id !== fbId));
        loadDashboardStats();
      })
      .catch(err => console.error(err));
  };

  const handleCreateContent = (e) => {
    e.preventDefault();
    api.post('/content', newContent)
      .then(res => {
        if (res.data.success) {
          setContentSuccess(true);
          setNewContent({
            category: 'Personal Hygiene',
            title_en: '',
            title_te: '',
            summary_en: '',
            summary_te: '',
            content_en: '',
            content_te: '',
            author: 'Ward Health Coordinator'
          });
          setTimeout(() => setContentSuccess(false), 3000);
        }
      })
      .catch(err => alert(err.response?.data?.message || 'Could not save content'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Administrator Control Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            HealthPulse Admin Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Public Health Management • Surveys, Quizzes, Users & Educational Content
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <span>Citizens</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.totalUsers}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1">
            <ClipboardList className="w-3.5 h-3.5 text-teal-500" />
            <span>Surveys</span>
          </div>
          <div className="text-2xl font-black text-teal-600">{stats.totalSurveys}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Quizzes</span>
          </div>
          <div className="text-2xl font-black text-amber-600">{stats.totalQuizzes}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1">
            <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
            <span>Feedback</span>
          </div>
          <div className="text-2xl font-black text-purple-600">{stats.totalFeedback}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span>Avg Rating</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.avgRating} ★</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>Health Guides</span>
          </div>
          <div className="text-2xl font-black text-emerald-600">Active</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'surveys', label: 'Survey Responses', icon: ClipboardList },
          { id: 'quizzes', label: 'Quiz Results', icon: Award },
          { id: 'users', label: 'Registered Users', icon: Users },
          { id: 'feedback', label: 'Citizen Feedback', icon: MessageSquare },
          { id: 'content', label: 'Add Health Content', icon: Plus },
        ].map(tab => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {loading ? (
        <div className="min-h-[30vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      ) : activeTab === 'surveys' ? (
        /* SURVEYS TABLE */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              Submitted Health Survey Responses ({surveys.length})
            </h3>
            <span className="text-xs text-slate-500">Public Health Survey Ingestion</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Participant</th>
                  <th className="p-4">Age / Gender</th>
                  <th className="p-4">Area Context</th>
                  <th className="p-4">Submitted At</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {surveys.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 text-slate-400">#{s.id}</td>
                    <td className="p-4 font-bold text-slate-900">{s.participant_name}</td>
                    <td className="p-4">{s.age || 'N/A'} yrs • {s.gender}</td>
                    <td className="p-4">{s.area}</td>
                    <td className="p-4">{new Date(s.submitted_at).toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedSurvey(s)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-teal-50 text-teal-700 font-bold hover:bg-teal-100 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Answers</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'quizzes' ? (
        /* QUIZ RESULTS TABLE */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              Quiz Submissions & Achievement Badges ({quizzes.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Participant</th>
                  <th className="p-4">Quiz Category</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Badge</th>
                  <th className="p-4">Completed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {quizzes.map(q => (
                  <tr key={q.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 text-slate-400">#{q.id}</td>
                    <td className="p-4 font-bold text-slate-900">{q.participant_name}</td>
                    <td className="p-4 font-semibold text-slate-700">{q.quiz_title_en}</td>
                    <td className="p-4 font-black text-emerald-700">{q.score} / {q.total}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {q.badge}
                      </span>
                    </td>
                    <td className="p-4">{new Date(q.completed_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'users' ? (
        /* USERS TABLE */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              Registered Ward Citizens & Coordinators ({users.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Area</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 text-slate-400">#{u.id}</td>
                    <td className="p-4 font-bold text-slate-900">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.phone || 'N/A'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">{u.area}</td>
                    <td className="p-4 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'feedback' ? (
        /* FEEDBACK TABLE */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              Citizen Feedback Entries ({feedback.length})
            </h3>
          </div>
          <div className="p-5 space-y-3">
            {feedback.map(f => (
              <div key={f.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{f.name}</span>
                    <span className="text-slate-400 text-[11px]">({f.email || 'No email'})</span>
                    <span className="text-amber-500 font-bold">{f.rating} ★</span>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm">"{f.comments}"</p>
                  <span className="text-[10px] text-slate-400 font-medium">Category: {f.category}</span>
                </div>
                <button
                  onClick={() => handleDeleteFeedback(f.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ADD CONTENT FORM */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-3xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Publish New Health Awareness Content
          </h3>

          {contentSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center space-x-2 border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Health content published successfully to the database!</span>
            </div>
          )}

          <form onSubmit={handleCreateContent} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={newContent.category}
                  onChange={(e) => setNewContent({ ...newContent, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                >
                  <option value="Personal Hygiene">Personal Hygiene</option>
                  <option value="Nutrition">Nutrition & Food</option>
                  <option value="Disease Prevention">Disease Prevention</option>
                  <option value="Lifestyle Tips">Healthy Lifestyle Tips</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Author Credit</label>
                <input
                  type="text"
                  value={newContent.author}
                  onChange={(e) => setNewContent({ ...newContent, author: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oral Hygiene & Cavity Defense"
                  value={newContent.title_en}
                  onChange={(e) => setNewContent({ ...newContent, title_en: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title (Telugu) *</label>
                <input
                  type="text"
                  required
                  placeholder="ఉదా: దంతాల పరిశుభ్రత & సంరక్షణ"
                  value={newContent.title_te}
                  onChange={(e) => setNewContent({ ...newContent, title_te: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Summary (English)</label>
                <textarea
                  rows="2"
                  value={newContent.summary_en}
                  onChange={(e) => setNewContent({ ...newContent, summary_en: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Summary (Telugu)</label>
                <textarea
                  rows="2"
                  value={newContent.summary_te}
                  onChange={(e) => setNewContent({ ...newContent, summary_te: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                ></textarea>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Detailed Content (English) *</label>
              <textarea
                rows="4"
                required
                value={newContent.content_en}
                onChange={(e) => setNewContent({ ...newContent, content_en: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Detailed Content (Telugu) *</label>
              <textarea
                rows="4"
                required
                value={newContent.content_te}
                onChange={(e) => setNewContent({ ...newContent, content_te: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition"
            >
              Publish to Public Platform
            </button>
          </form>
        </div>
      )}

      {/* Survey Details Modal */}
      {selectedSurvey && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  Survey Submission #{selectedSurvey.id}
                </h3>
                <p className="text-xs text-slate-500">
                  Participant: <strong>{selectedSurvey.participant_name}</strong> • Age: {selectedSurvey.age || 'N/A'} • {selectedSurvey.gender}
                </p>
              </div>
              <button
                onClick={() => setSelectedSurvey(null)}
                className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <h4 className="font-bold text-slate-800 flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Recorded Question Responses:</span>
              </h4>

              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                {Object.entries(selectedSurvey.answers || {}).map(([qKey, aVal], idx) => (
                  <div key={idx} className="border-b border-slate-200/60 pb-2 last:border-0 last:pb-0">
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Question ID #{qKey}:
                    </span>
                    <span className="font-bold text-emerald-900 text-xs sm:text-sm">
                      {String(aVal)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
