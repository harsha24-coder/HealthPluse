import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, PhoneCall, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="font-extrabold text-lg text-white">HealthPulse</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footerDesc')}
            </p>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Public Health & Wellness Initiative</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-emerald-400 transition">About Our Portal</Link></li>
              <li><Link to="/health-content" className="hover:text-emerald-400 transition">Hygiene & Nutrition</Link></li>
              <li><Link to="/games" className="hover:text-emerald-400 transition">Health Awareness Games</Link></li>
              <li><Link to="/quiz" className="hover:text-emerald-400 transition">Interactive Health Quiz</Link></li>
              <li><Link to="/survey" className="hover:text-emerald-400 transition">Public Health Survey</Link></li>
              <li><Link to="/reminders" className="hover:text-emerald-400 transition">Daily Habit Reminders</Link></li>
            </ul>
          </div>

          {/* Healthcare Guidelines */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Key Focus Areas
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• WHO 6-Step Handwashing</li>
              <li>• Anaemia & Local Nutrition</li>
              <li>• Mosquito Defense & Dry Day</li>
              <li>• Safe Drinking Water Filtration</li>
              <li>• Non-Communicable Diseases (NCD)</li>
            </ul>
          </div>

          {/* Contact & Helplines */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {t('footerContact')}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Public Health & Wellness Information Center</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@healthpulse.org</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <p className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1.5 mb-1">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Public Health Helplines</span>
                </p>
                <p className="text-[11px] text-slate-300">
                  Medical Advice: <strong className="text-white">104</strong> • Emergency: <strong className="text-white">108</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>{t('footerCopyright')}</p>
          <p className="text-slate-400">
            Educational web app for public health & wellness • Not a replacement for emergency medical care
          </p>
        </div>
      </div>
    </footer>
  );
}
