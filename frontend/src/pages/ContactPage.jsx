import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();
  const isTe = language === 'te';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Building className="w-3.5 h-3.5 text-emerald-600" />
          <span>Public Health Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {isTe ? 'సంప్రదించండి & ఆరోగ్య సహాయ కేంద్రాలు' : 'Contact & Public Health Helplines'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
          {isTe
            ? 'ప్రజా ఆరోగ్య విభాగం మరియు సహాయ కేంద్రాల సంప్రదింపు వివరాలు.'
            : 'Get in touch with health coordinators, wellness guides, and public health support officers.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-3 text-emerald-800">
            <Building className="w-6 h-6 text-emerald-600 shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Public Health Information & Support Center
            </h3>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Office Location:</strong>
                <span>Public Health & Wellness Information Center</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Working Hours:</strong>
                <span>Monday - Saturday: 10:00 AM to 05:00 PM</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Email:</strong>
                <span>support@healthpulse.org</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Health Coordination Team:</strong>
                <span>Public Health Awareness & Wellness Support Cell</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Helplines & Govt Centres */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg sm:text-xl font-bold flex items-center space-x-2 text-white">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Government Emergency Helplines</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Medical Advice & Assistance</span>
                  <span className="text-xs text-emerald-200">24/7 Free Telemedicine</span>
                </div>
                <span className="text-xl font-black text-amber-300">104</span>
              </div>

              <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Emergency Ambulance Service</span>
                  <span className="text-xs text-emerald-200">Critical care transit</span>
                </div>
                <span className="text-xl font-black text-rose-300">108</span>
              </div>

              <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Government General Hospital</span>
                  <span className="text-xs text-emerald-200">Public Health Services</span>
                </div>
                <span className="text-sm font-bold text-white">08818-222345</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 text-xs text-emerald-900 leading-relaxed">
            <strong>Public Health Notice:</strong> For chronic disease checkups (BP, sugar), visit your nearest Urban Primary Health Centre (UPHC) every Tuesday and Friday for free screening.
          </div>
        </div>
      </div>
    </div>
  );
}
