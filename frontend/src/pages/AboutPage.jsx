import React from 'react';
import {
  Heart,
  Target,
  Layers,
  CheckCircle,
  MapPin,
  Building,
  GraduationCap,
  Users,
  Database,
  Server,
  Monitor
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();
  const isTe = language === 'te';

  const objectives = [
    {
      en: "To provide easy access to health awareness information through a modern digital platform.",
      te: "డిజిటల్ ప్లాట్‌ఫారమ్ ద్వారా ఆరోగ్య అవగాహన సమాచారాన్ని సులభంగా అందుబాటులోకి తీసుకురావడం."
    },
    {
      en: "To educate citizens and households about personal hygiene, handwashing, and cleanliness.",
      te: "వ్యక్తిగత పరిశుభ్రత, చేతులు కడుక్కోవడం మరియు పారిశుధ్యంపై సమాజానికి అవగాహన కల్పించడం."
    },
    {
      en: "To promote balanced nutrition and healthy affordable food habits among children, youth, and adults.",
      te: "పిల్లలు మరియు పెద్దలలో సమతుల్య పోషకాహారం మరియు సరసమైన స్థానిక ఆహారపు అలవాట్లను ప్రోత్సహించడం."
    },
    {
      en: "To create public awareness about common diseases (Dengue, Malaria) and preventive healthcare.",
      te: "సాధారణ వ్యాధులు (డెంగ్యూ, మలేరియా) మరియు నివారణ ఆరోగ్య సంరక్షణపై అవగాహన సృష్టించడం."
    },
    {
      en: "To digitize the original 17-question survey into an online response pipeline.",
      te: "17 ప్రశ్నల ఆఫ్ లైన్ పేపర్ సర్వేను ఆన్‌లైన్ డేటా సేకరణ వ్యవస్థగా మార్చడం."
    },
    {
      en: "To encourage students and citizens to participate in interactive health quizzes.",
      te: "విద్యార్థులు మరియు పౌరులు ఆరోగ్య క్విజ్‌లలో పాల్గొనేలా ప్రోత్సహించడం."
    },
    {
      en: "To provide administrators with an intuitive dashboard to manage educational content and survey results.",
      te: "అడ్మినిస్ట్రేటర్లు కంటెంట్ మరియు సర్వే ఫలితాలను నిర్వహించడానికి సమగ్ర డ్యాష్‌బోర్డ్‌ను అందించడం."
    },
    {
      en: "To support bilingual access (English & Telugu) for effortless comprehension.",
      te: "ప్రజలందరికీ సులభంగా అర్థమయ్యేలా ఇంగ్లీష్ మరియు తెలుగు భాషలకు మద్దతు ఇవ్వడం."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          <Heart className="w-3.5 h-3.5 text-emerald-600" />
          <span>System Background & Objectives</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {isTe ? 'సిస్టమ్ నేపథ్యం & ఉద్దేశాలు' : 'About HealthPulse & Public Wellness'}
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          {isTe
            ? 'ప్రజల ఆరోగ్యం, పరిశుభ్రత మరియు పోషకాహార అవగాహనను మరింత విస్తృతం చేయడానికి HealthPulse వెబ్ అప్లికేషన్ రూపొందించబడింది.'
            : 'HealthPulse is designed to empower citizens, families, and society with essential preventive healthcare guidelines, hygiene protocols, nutritional insights, and interactive wellness resources.'}
        </p>
      </div>

      {/* Fieldwork Context Summary */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 text-emerald-800">
          <MapPin className="w-6 h-6 text-emerald-600 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold">
            {isTe ? 'ప్రజా ఆరోగ్య ప్రాధాన్యతలు & మార్గదర్శకాలు' : 'Key Public Health Focus Areas'}
          </h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          Through widespread engagement, health education sessions, and interactive digital tools, HealthPulse addresses key public health priorities including preventive hygiene, balanced nutrition, vector-borne disease defense, and routine wellness tracking for every citizen and household.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <Building className="w-6 h-6 text-emerald-700 mb-2" />
            <h4 className="font-bold text-sm text-slate-800">Household Sanitation</h4>
            <p className="text-xs text-slate-600 mt-1">Safe drinking water filtration, domestic cleanliness, and waste segregation.</p>
          </div>
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100">
            <GraduationCap className="w-6 h-6 text-teal-700 mb-2" />
            <h4 className="font-bold text-sm text-slate-800">Personal Hygiene</h4>
            <p className="text-xs text-slate-600 mt-1">WHO 6-step handwashing demonstrations and personal cleanliness habits.</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <Users className="w-6 h-6 text-blue-700 mb-2" />
            <h4 className="font-bold text-sm text-slate-800">Vector Defense</h4>
            <p className="text-xs text-slate-600 mt-1">Anti-mosquito Friday dry days, covered water storage, and safe surroundings.</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
            <Heart className="w-6 h-6 text-amber-700 mb-2" />
            <h4 className="font-bold text-sm text-slate-800">Nutrition & Wellness</h4>
            <p className="text-xs text-slate-600 mt-1">Balanced diet, iron-rich foods, anaemia awareness, and daily active wellness.</p>
          </div>
        </div>
      </div>

      {/* Objectives Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Target className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-bold text-slate-900">
            {isTe ? 'ప్రాజెక్ట్ ముఖ్య లక్ష్యాలు' : 'Objectives of the Project'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((obj, i) => (
            <div key={i} className="flex items-start space-x-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {isTe ? obj.te : obj.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* System Architecture */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6">
        <div className="flex items-center space-x-3 text-emerald-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isTe ? 'సిస్టమ్ ఆర్కిటెక్చర్ (త్రీ-టైర్ మోడల్)' : 'System Architecture (Three-Tier Architecture)'}
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
          HealthPulse is built with a modular, scalable full-stack web architecture separating the user presentation layer, business logic APIs, and persistent database storage.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Frontend Tier */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Monitor className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">1. Frontend Layer</h3>
            <p className="text-xs text-slate-400">
              React.js 18 with Vite, Tailwind CSS, React Router DOM, and Context API for seamless bilingual toggling.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-medium text-blue-300">
              <span className="bg-slate-700 px-2 py-0.5 rounded">React 18</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded">Vite</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded">Tailwind</span>
            </div>
          </div>

          {/* Backend Tier */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">2. Backend Layer</h3>
            <p className="text-xs text-slate-400">
              Node.js and Express.js REST APIs providing JWT authentication, quiz score calculation, survey ingestion, and admin reporting.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-medium text-emerald-300">
              <span className="bg-slate-700 px-2 py-0.5 rounded">Node.js</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded">Express</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded">JWT</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded">bcrypt</span>
            </div>
          </div>

          {/* Database Tier */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">3. Database Layer</h3>
            <p className="text-xs text-slate-400">
              Relational database managing users, surveys, quiz records, educational content, feedback, and reminders.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-medium text-amber-300">
              <span className="bg-slate-700 px-2 py-0.5 rounded">MySQL / DB</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded">Normalized Tables</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded">JSON Store</span>
            </div>
          </div>
        </div>

        {/* Architecture Flow Banner */}
        <div className="mt-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-center text-xs text-emerald-300 font-mono">
          User ⇄ React Frontend ⇄ Express.js REST API ⇄ Database
        </div>
      </div>
    </div>
  );
}
