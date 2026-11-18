import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  Clock,
  Droplet,
  Sparkles,
  Activity,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function RemindersPage() {
  const { language } = useLanguage();
  const isTe = language === 'te';
  const { user } = useAuth();

  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // New reminder form
  const [showModal, setShowModal] = useState(false);
  const [titleEn, setTitleEn] = useState('');
  const [titleTe, setTitleTe] = useState('');
  const [reminderType, setReminderType] = useState('water');
  const [frequency, setFrequency] = useState('Daily');
  const [targetTime, setTargetTime] = useState('09:00');

  useEffect(() => {
    loadReminders();
  }, [user]);

  const loadReminders = () => {
    if (user) {
      api.get('/reminders')
        .then(res => {
          if (res.data.success) {
            setReminders(res.data.data);
          }
        })
        .catch(err => console.error('Reminders load error:', err))
        .finally(() => setLoading(false));
    } else {
      // Default sample reminders for guest users
      setReminders([
        {
          id: 1,
          title_en: 'Drink 1 Glass of Clean Water',
          title_te: 'ఒక గ్లాసు మంచి నీరు తాగండి',
          reminder_type: 'water',
          frequency: 'Every 2 Hours',
          target_time: '09:00:00',
          is_active: 1
        },
        {
          id: 2,
          title_en: 'Wash Hands with Soap Before Meals',
          title_te: 'భోజనానికి ముందు సబ్బుతో చేతులు కడగండి',
          reminder_type: 'handwash',
          frequency: 'Before Meals',
          target_time: '12:30:00',
          is_active: 1
        },
        {
          id: 3,
          title_en: 'Evening 30-Minute Brisk Walk',
          title_te: 'సాయంత్రం 30 నిమిషాల నడక లేదా వ్యాయామం',
          reminder_type: 'exercise',
          frequency: 'Daily Evening',
          target_time: '17:30:00',
          is_active: 1
        }
      ]);
      setLoading(false);
    }
  };

  const handleToggle = (id) => {
    if (user) {
      api.patch(`/reminders/${id}/toggle`)
        .then(() => {
          setReminders(prev => prev.map(r => r.id === id ? { ...r, is_active: !r.is_active } : r));
        })
        .catch(err => console.error('Toggle error:', err));
    } else {
      setReminders(prev => prev.map(r => r.id === id ? { ...r, is_active: !r.is_active } : r));
    }
  };

  const handleDelete = (id) => {
    if (user) {
      api.delete(`/reminders/${id}`)
        .then(() => {
          setReminders(prev => prev.filter(r => r.id !== id));
        })
        .catch(err => console.error('Delete error:', err));
    } else {
      setReminders(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleCreateReminder = (e) => {
    e.preventDefault();
    if (!titleEn) return;

    if (user) {
      api.post('/reminders', {
        title_en: titleEn,
        title_te: titleTe || titleEn,
        reminder_type: reminderType,
        frequency,
        target_time: targetTime
      })
        .then(res => {
          if (res.data.success) {
            setShowModal(false);
            setTitleEn('');
            setTitleTe('');
            loadReminders();
          }
        })
        .catch(err => console.error('Add reminder error:', err));
    } else {
      const newR = {
        id: Date.now(),
        title_en: titleEn,
        title_te: titleTe || titleEn,
        reminder_type: reminderType,
        frequency,
        target_time: targetTime + ':00',
        is_active: 1
      };
      setReminders(prev => [newR, ...prev]);
      setShowModal(false);
      setTitleEn('');
      setTitleTe('');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'water':
        return <Droplet className="w-5 h-5 text-sky-500" />;
      case 'handwash':
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
      case 'exercise':
        return <Activity className="w-5 h-5 text-amber-500" />;
      default:
        return <Bell className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
            <Bell className="w-3.5 h-3.5 text-emerald-600" />
            <span>Health Habits Tracking</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            {isTe ? 'రోజువారీ ఆరోగ్య రిమైండర్లు' : 'Daily Health & Hygiene Reminders'}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            {isTe
              ? 'నీరు తాగడం, చేతులు కడగడం, వ్యాయామం అలవాట్లను గుర్తుంచుకోవడానికి సులభమైన సాధనం.'
              : 'Automated reminders to sustain good daily health habits, drinking water discipline, and regular exercise.'}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isTe ? 'కొత్త రిమైండర్ జోడించండి' : 'Add New Reminder'}</span>
        </button>
      </div>

      {!user && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            You are viewing reminders in guest mode. Log in to persist your personal schedule in the MySQL database across devices!
          </span>
        </div>
      )}

      {/* Reminders List */}
      {loading ? (
        <div className="min-h-[30vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reminders.map(rem => (
            <div
              key={rem.id}
              className={`p-5 rounded-2xl border transition shadow-sm flex items-start justify-between gap-3 ${
                rem.is_active
                  ? 'bg-white border-slate-200'
                  : 'bg-slate-50 border-slate-200/60 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                  {getTypeIcon(rem.reminder_type)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {isTe ? rem.title_te : rem.title_en}
                  </h3>
                  <div className="flex items-center space-x-3 mt-1.5 text-xs text-slate-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{rem.target_time}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {rem.frequency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleToggle(rem.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition ${
                    rem.is_active
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {rem.is_active ? 'Active' : 'Paused'}
                </button>
                <button
                  onClick={() => handleDelete(rem.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Reminder Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {isTe ? 'కొత్త ఆరోగ్య రిమైండర్' : 'Add Health Reminder'}
            </h2>

            <form onSubmit={handleCreateReminder} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drink 250ml Water"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Title (Telugu - Optional)
                </label>
                <input
                  type="text"
                  placeholder="ఉదా: 250 మి.లీ మంచి నీరు తాగండి"
                  value={titleTe}
                  onChange={(e) => setTitleTe(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Reminder Category
                  </label>
                  <select
                    value={reminderType}
                    onChange={(e) => setReminderType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                  >
                    <option value="water">Water Intake</option>
                    <option value="handwash">Handwashing</option>
                    <option value="exercise">Physical Activity</option>
                    <option value="medicine">Health Checkup</option>
                    <option value="other">General Habit</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Scheduled Time
                  </label>
                  <input
                    type="time"
                    required
                    value={targetTime}
                    onChange={(e) => setTargetTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
