import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Apple,
  Activity,
  ClipboardList,
  Award,
  ArrowRight,
  Bell,
  CheckCircle2,
  Users,
  MapPin,
  Building2,
  GraduationCap,
  Gamepad2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { language, t } = useLanguage();

  const isTe = language === 'te';

  const featureCards = [
    {
      icon: Sparkles,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 text-blue-700 border-blue-100",
      title: t('featHygieneTitle'),
      desc: t('featHygieneDesc'),
      link: "/health-content?category=Personal Hygiene"
    },
    {
      icon: Apple,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-700 border-emerald-100",
      title: t('featNutritionTitle'),
      desc: t('featNutritionDesc'),
      link: "/health-content?category=Nutrition"
    },
    {
      icon: ShieldCheck,
      color: "from-rose-500 to-pink-600",
      bgLight: "bg-rose-50 text-rose-700 border-rose-100",
      title: t('featDiseaseTitle'),
      desc: t('featDiseaseDesc'),
      link: "/health-content?category=Disease Prevention"
    },
    {
      icon: Activity,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 text-amber-700 border-amber-100",
      title: t('featLifestyleTitle'),
      desc: t('featLifestyleDesc'),
      link: "/health-content?category=Lifestyle Tips"
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-teal-900 to-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t('heroTag')}</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white ${isTe ? 'font-telugu' : ''}`}>
            {t('heroTitle')}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
            {t('heroDesc')}
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/survey"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] transition transform text-sm sm:text-base"
            >
              <ClipboardList className="w-5 h-5 text-slate-950" />
              <span>{t('btnTakeSurvey')}</span>
            </Link>

            <Link
              to="/quiz"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 backdrop-blur-sm transition text-sm sm:text-base"
            >
              <Award className="w-5 h-5 text-amber-400" />
              <span>{t('btnTakeQuiz')}</span>
            </Link>

            <Link
              to="/health-content"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 text-emerald-200 border border-emerald-700/60 transition text-sm sm:text-base"
            >
              <span>{t('btnExploreContent')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300">{t('statsWeeks')}</div>
              <div className="text-xs text-slate-300 font-medium">{t('statsWeeksLabel')}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">{t('statsParticipants')}</div>
              <div className="text-xs text-slate-300 font-medium">{t('statsParticipantsLabel')}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">{t('statsLocations')}</div>
              <div className="text-xs text-slate-300 font-medium">{t('statsLocationsLabel')}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-300">{t('statsAwareness')}</div>
              <div className="text-xs text-slate-300 font-medium">{t('statsAwarenessLabel')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('featuresTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <Link
                key={idx}
                to={feat.link}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-emerald-700 transition">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition">
                  <span>{isTe ? 'మరింత చదవండి' : 'Read Guidelines'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Interactive Highlights Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Health Survey Card */}
          <div className="bg-gradient-to-br from-teal-500 to-emerald-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-800/60 text-teal-200 text-xs font-semibold">
                <ClipboardList className="w-3.5 h-3.5" />
                <span>{isTe ? '17 ప్రశ్నల ఆన్‌లైన్ ఫారం' : '17 Digitized Questions'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                {t('surveySectionTitle')}
              </h3>
              <p className="text-teal-50 text-sm leading-relaxed">
                {t('surveySectionDesc')}
              </p>
              <ul className="text-xs space-y-1.5 text-teal-100 pt-1">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>General Health, BP & Diabetes indicators</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Hygiene, Drinking Water & Sanitation habits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Mental health, stress relief & public health feedback</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/survey"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-bold hover:bg-teal-50 transition text-sm shadow-md"
                >
                  <span>{t('btnFillSurvey')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Health Quiz Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-200 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{isTe ? 'విజ్ఞానం & బ్యాడ్జ్‌లు' : 'Knowledge & Badges'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                {t('quizSectionTitle')}
              </h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                {t('quizSectionDesc')}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-indigo-200">
                <div className="p-2 bg-indigo-950/40 rounded-lg border border-indigo-500/20">
                  <strong className="text-amber-400 block font-bold">5/5 Correct</strong>
                  <span>Health Champion</span>
                </div>
                <div className="p-2 bg-indigo-950/40 rounded-lg border border-indigo-500/20">
                  <strong className="text-amber-300 block font-bold">4/5 Correct</strong>
                  <span>Health Expert</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/quiz"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition text-sm shadow-md"
                >
                  <span>{t('btnStartQuiz')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Health Games Arena Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>{isTe ? 'కొత్త గేమింగ్ విభాగం' : 'New Interactive Health Games'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {isTe ? 'సరదా ఆటల ద్వారా ఆరోగ్యం నేర్చుకోండి!' : 'Master Daily Wellness Through Professional Health Games'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              {isTe
                ? 'న్యూట్రిషన్ ప్లేట్ మాస్టర్, జెర్మ్ బస్టర్, మరియు 24-గంటల లైఫ్‌స్టైల్ క్వెస్ట్ ఆటలు ఆడి మీ జీవనశైలిని మెరుగుపరుచుకోండి.'
                : 'Build balanced plates (50-25-25 rule), bust vector threats, and test your 24-hour lifestyle routine for maximum daily energy and calm.'}
            </p>
          </div>

          <Link
            to="/games"
            className="px-6 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition hover:scale-105 shrink-0 flex items-center space-x-2"
          >
            <span>{isTe ? 'హెల్త్ గేమ్స్ ఆడండి' : 'Enter Health Gaming Arena'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Daily Reminders Quick Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/60 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {isTe ? 'రోజువారీ ఆరోగ్య అలవాట్ల రిమైండర్లు' : 'Daily Healthy Habits & Timers'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                {isTe
                  ? 'మంచి నీరు తాగడం, భోజనానికి ముందు చేతులు కడుక్కోవడం, 30 నిమిషాల నడక వంటి అలవాట్లను క్రమబద్ధం చేసుకోండి.'
                  : 'Track your daily water intake, handwashing discipline, and evening exercise with easy customizable reminders.'}
              </p>
            </div>
          </div>
          <Link
            to="/reminders"
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition shrink-0"
          >
            {isTe ? 'రిమైండర్లను చూడండి' : 'Open Reminders Tool'}
          </Link>
        </div>
      </section>
    </div>
  );
}
