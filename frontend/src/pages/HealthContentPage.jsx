import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Apple,
  ShieldAlert,
  Activity,
  Check,
  X,
  BookOpen,
  Droplets,
  Heart
} from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function HealthContentPage() {
  const { language } = useLanguage();
  const isTe = language === 'te';
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'All', name_en: 'All Topics', name_te: 'అన్ని విభాగాలు', icon: BookOpen },
    { id: 'Personal Hygiene', name_en: 'Personal Hygiene', name_te: 'వ్యక్తిగత పరిశుభ్రత', icon: Sparkles },
    { id: 'Nutrition', name_en: 'Nutrition & Food', name_te: 'పోషకాహారం & ఆహారం', icon: Apple },
    { id: 'Disease Prevention', name_en: 'Disease Prevention', name_te: 'వ్యాధుల నివారణ', icon: ShieldAlert },
    { id: 'Lifestyle Tips', name_en: 'Healthy Lifestyle', name_te: 'ఆరోగ్య జీవనశైలి', icon: Activity },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setLoading(true);
    const query = currentCategory !== 'All' ? `?category=${encodeURIComponent(currentCategory)}` : '';
    api.get(`/content${query}`)
      .then(res => {
        if (res.data.success) {
          setArticles(res.data.data);
        }
      })
      .catch(err => {
        console.error('Failed to load health content:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {isTe ? 'ఆరోగ్య విద్య & నివారణ చిట్కాలు' : 'Health Education & Preventive Guidelines'}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
          {isTe
            ? 'ప్రజలందరి కోసం సంకలనం చేయబడిన ముఖ్యమైన ఆరోగ్య, పరిశుభ్రత మరియు పోషకాహార సూచనలు.'
            : 'Curated hygiene, nutrition, disease defense, and preventive healthcare guidelines for everyone in society.'}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => {
          const IconC = cat.icon;
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSearchParams(cat.id === 'All' ? {} : { category: cat.id })}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <IconC className="w-4 h-4" />
              <span>{isTe ? cat.name_te : cat.name_en}</span>
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="min-h-[30vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm">No health content articles found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map(article => (
            <article
              key={article.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {article.author}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {isTe ? article.title_te : article.title_en}
                </h3>

                <p className="text-xs sm:text-sm font-medium text-emerald-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100/80">
                  {isTe ? article.summary_te : article.summary_en}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {isTe ? article.content_te : article.content_en}
                </p>
              </div>

              {/* Extra visual actionable checklist depending on category */}
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span className="inline-flex items-center space-x-1 text-emerald-600 font-semibold">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{isTe ? 'రోజువారీ అనుసరించండి' : 'Recommended Daily Habit'}</span>
                </span>
                <span className="text-[11px]">Public Health Advisory</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Practical Quick Checklist Box */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white rounded-3xl p-8 space-y-6 shadow-md">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold">
            {isTe ? 'రోజువారీ పరిశుభ్రత & శ్రేయస్సు మార్గదర్శకాలు' : 'Daily Hygiene & Wellness Essentials'}
          </h3>
          <p className="text-xs sm:text-sm text-teal-200 mt-1">
            Simple daily dos and don'ts recommended for healthy daily living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          {/* Do's */}
          <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-emerald-400 flex items-center space-x-1.5 uppercase tracking-wide text-xs">
              <Check className="w-4 h-4" />
              <span>{isTe ? 'తప్పనిసరిగా చేయవలసినవి (Do\'s)' : 'Healthy Practices (Do\'s)'}</span>
            </h4>
            <ul className="space-y-1.5 text-slate-200">
              <li>✓ Wash hands with soap for 20 seconds before eating and after toilet use.</li>
              <li>✓ Observe Friday "Dry Day": scrub clean and dry all water coolers and pots.</li>
              <li>✓ Drink 2.5–3.5 litres of boiled/filtered drinking water daily.</li>
              <li>✓ Include green leafy vegetables (Palakura, Thotakura) and ragi in meals.</li>
              <li>✓ Separate wet kitchen waste and dry waste before giving to municipal vans.</li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-rose-400 flex items-center space-x-1.5 uppercase tracking-wide text-xs">
              <X className="w-4 h-4" />
              <span>{isTe ? 'నివారించవలసినవి (Don\'ts)' : 'Harmful Habits (Don\'ts)'}</span>
            </h4>
            <ul className="space-y-1.5 text-slate-200">
              <li>✗ Don't allow rainwater to stagnate in open tires, coconut shells, or cans.</li>
              <li>✗ Don't consume tobacco products, beedi, khaini, or gutkha.</li>
              <li>✗ Don't self-medicate with high-dose painkillers during unknown fevers.</li>
              <li>✗ Don't dump domestic garbage directly into storm drains.</li>
              <li>✗ Don't skip breakfast or ignore chronic fatigue and dizziness.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
