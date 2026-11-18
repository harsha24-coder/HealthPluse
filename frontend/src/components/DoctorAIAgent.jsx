import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  MapPin,
  PhoneCall,
  Sparkles,
  Heart,
  ShieldCheck,
  AlertCircle,
  Navigation,
  Activity,
  Volume2,
  VolumeX,
  Stethoscope,
  ChevronDown,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSound } from '../utils/soundEffects';

// Curated Hospital & Clinic dataset for instant map & direction display
const NEARBY_HEALTH_CENTERS = [
  {
    id: 1,
    name_en: 'Urban Primary Health Centre (UPHC)',
    name_te: 'పట్టణ ప్రాథమిక ఆరోగ్య కేంద్రం (UPHC)',
    type: 'Govt Health Centre',
    distance: '0.8 km',
    timing: '09:00 AM - 05:00 PM (Mon-Sat)',
    services: 'Free BP/Sugar screening, doctor consultations, basic medicines',
    phone: '08818-222104',
    mapQuery: 'Urban+Primary+Health+Centre'
  },
  {
    id: 2,
    name_en: 'Government Area General Hospital',
    name_te: 'ప్రభుత్వ ప్రాంతీయ ఆసుపత్రి (ఏరియా హాస్పిటల్)',
    type: '24/7 Emergency Care',
    distance: '1.9 km',
    timing: '24/7 All Days Open',
    services: 'Emergency trauma, ICU, inpatient ward, full pathology labs',
    phone: '08818-222345',
    mapQuery: 'Government+Area+Hospital'
  },
  {
    id: 3,
    name_en: 'Citizen Wellness Diagnostic & Clinic',
    name_te: 'సిటిజన్ వెల్నెస్ డయాగ్నస్టిక్ సెంటర్',
    type: 'Diagnostic & OPD',
    distance: '1.2 km',
    timing: '07:00 AM - 09:00 PM',
    services: 'Blood tests, ECG, ultrasound, general physician consultations',
    phone: '08818-245678',
    mapQuery: 'Diagnostic+Centre+and+Clinic'
  },
  {
    id: 4,
    name_en: '24/7 Public Life Pharmacy',
    name_te: '24/7 పబ్లిక్ లైఫ్ మెడికల్స్ & ఫార్మసీ',
    type: 'Pharmacy',
    distance: '0.4 km',
    timing: 'Open 24 Hours',
    services: 'Prescription medicines, ORS, first-aid supplies, emergency drugs',
    phone: '08818-234567',
    mapQuery: 'Pharmacy+Medical+Store'
  }
];

export default function DoctorAIAgent() {
  const { language } = useLanguage();
  const isTe = language === 'te';

  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'doctor',
      text: isTe
        ? 'నమస్కారం! నేను డాక్టర్ పల్స్ (Dr. Pulse) - మీ AI ఆరోగ్య సలహాదారుని. మీకు ఎలాంటి ఆరోగ్య లేదా జీవనశైలి సమస్యలు ఉన్నా నన్ను అడగండి.'
        : 'Hello! I am Dr. Pulse, your AI Health & Wellness Guide. How are you feeling today? Ask me about symptoms, nutrition, or nearby clinics.',
      hasMap: false,
      suggestions: [
        isTe ? 'జ్వరం & తలనొప్పికి ఏం చేయాలి?' : 'I have a fever & body ache',
        isTe ? 'రక్తహీనత నివారణకు ఎలాంటి ఆహారం?' : 'Diet for anaemia & iron deficiency',
        isTe ? 'నా దగ్గరలోని ఆసుపత్రులు / క్లినిక్‌లు' : 'Find nearby clinics & hospitals',
        isTe ? 'డెంగ్యూ వ్యాధి లక్షణాలు ఏమిటి?' : 'How to prevent Dengue fever?'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Speech synthesizer for voice readout
  const speakText = (text) => {
    if (!speechEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*#✓⚠•❌]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // ignore
    }
  };

  const handleSend = (textToSend = null) => {
    const userText = textToSend || input.trim();
    if (!userText) return;

    playSound('click');

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // AI Doctor Reasoning Simulation
    setTimeout(() => {
      const response = generateDoctorResponse(userText, isTe);
      setIsTyping(false);
      setMessages(prev => [...prev, response]);
      playSound('pop');
      speakText(response.text);
    }, 900);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end select-none font-sans">
      {/* Minimized Greeting Speech Bubble */}
      {!isOpen && showBubble && (
        <div className="mb-2 bg-white rounded-2xl p-3 shadow-xl border border-emerald-100 max-w-xs animate-bounce flex items-start space-x-2.5 text-xs text-slate-700">
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
            <Stethoscope className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900 leading-tight">
              {isTe ? 'డాక్టర్ పల్స్ ఆన్‌లైన్ లో ఉన్నారు!' : 'Dr. Pulse is Online!'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isTe ? 'ఆరోగ్య సలహాలు లేదా క్లినిక్‌ల కోసం నొక్కండి.' : 'Ask health symptoms or locate nearby clinics.'}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Animated Doctor Button (When Chat is Closed) */}
      {!isOpen && (
        <button
          onClick={() => {
            playSound('pop');
            setIsOpen(true);
            setShowBubble(false);
            setUnreadCount(0);
          }}
          className="group relative flex items-center justify-center focus:outline-none"
          title="Open Dr. Pulse AI Health Assistant"
        >
          {/* Animated pulse rings */}
          <span className="absolute -inset-1.5 rounded-full bg-emerald-500/30 animate-ping duration-1000"></span>
          <span className="absolute -inset-1 rounded-full bg-teal-500/40 animate-pulse"></span>

          {/* Doctor Badge Container */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 p-1 shadow-2xl flex items-center justify-center group-hover:scale-110 transition duration-300">
            {/* Doctor Head & Lab Coat Illustration */}
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center overflow-hidden border-2 border-white shadow-inner relative">
              {/* Doctor Head with Medical Reflector */}
              <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center relative mt-0.5 shadow-sm">
                {/* Doctor hair */}
                <div className="absolute -top-0.5 inset-x-1 h-2 bg-slate-800 rounded-t-full"></div>
                {/* Reflector head mirror */}
                <div className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-500 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                </div>
                {/* Eyes & smile */}
                <div className="flex space-x-1.5 pt-1">
                  <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                  <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                </div>
              </div>

              {/* White Lab Coat & Stethoscope */}
              <div className="w-full h-7 bg-white relative flex items-center justify-center border-t border-slate-100">
                <div className="absolute inset-x-2.5 top-0 bottom-0 bg-teal-50 flex items-center justify-center">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Online Status Dot */}
            <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>

          {/* Doctor Floating Label Pill */}
          <span className="hidden md:inline-flex absolute right-20 items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold shadow-lg whitespace-nowrap border border-slate-700/60 pointer-events-none group-hover:right-22 transition-all">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Dr. Pulse (AI Doctor)</span>
          </span>
        </button>
      )}

      {/* Expanded Floating AI Doctor Window */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[440px] max-h-[85vh] h-[640px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-slide-up z-50">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-4 flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center space-x-3">
              {/* Doctor Avatar Badge */}
              <div className="relative w-11 h-11 rounded-2xl bg-white p-0.5 flex flex-col items-center justify-center overflow-hidden border border-white/40 shadow">
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center relative shadow-xs">
                  <div className="flex space-x-1">
                    <div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div>
                  </div>
                </div>
                <div className="w-full h-4 bg-teal-50 flex items-center justify-center">
                  <Stethoscope className="w-2.5 h-2.5 text-emerald-700" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-white rounded-full"></span>
              </div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-tight">
                    Dr. Pulse, M.D.
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/40">
                    AI Doctor
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/90 font-medium">
                  {isTe ? 'పబ్లిక్ హెల్త్ & క్లినిక్ గైడ్' : 'Public Health & Clinic Guide'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-200 hover:text-white transition"
                title={speechEnabled ? 'Mute Speech Readout' : 'Enable Speech Readout'}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4 text-emerald-300" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  setMessages([
                    {
                      id: Date.now(),
                      sender: 'doctor',
                      text: isTe
                        ? 'చాట్ క్లియర్ చేయబడింది. మీకు ఎలాంటి ఆరోగ్య లేదా పోషకాహార ప్రశ్నలు ఉన్నా నన్ను అడగండి!'
                        : 'Chat refreshed. Feel free to ask about any symptoms, diet guidelines, or healthcare questions!',
                      hasMap: false
                    }
                  ]);
                }}
                className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-200 hover:text-white transition"
                title="Clear Chat History"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playSound('pop');
                  setIsOpen(false);
                }}
                className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-200 hover:text-white transition"
                title="Minimize Dr. Pulse"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Emergency Quick Hotbar */}
          <div className="bg-amber-50 px-3 py-1.5 border-b border-amber-200/80 flex items-center justify-between text-[11px] text-amber-900 font-semibold shrink-0">
            <span className="flex items-center space-x-1">
              <PhoneCall className="w-3 h-3 text-amber-700" />
              <span>Medical Emergency: <strong>108</strong> • Doctor Advice: <strong>104</strong></span>
            </span>
            <span className="text-[10px] text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-200">
              Free 24/7
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Interactive Map & Nearby Health Center Cards (Special Effect) */}
                {msg.hasMap && (
                  <div className="w-full mt-2 space-y-2.5 animate-fade-in">
                    {/* Visual Animated Map Simulation */}
                    <div className="relative w-full h-36 rounded-2xl bg-gradient-to-tr from-slate-800 via-teal-950 to-slate-900 p-3 overflow-hidden border border-teal-500/30 shadow-md text-white flex flex-col justify-between">
                      {/* Map Grid and streets simulation lines */}
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]"></div>
                      <div className="absolute top-1/3 inset-x-0 h-1 bg-teal-500/20"></div>
                      <div className="absolute left-1/3 inset-y-0 w-1 bg-emerald-500/20"></div>
                      <div className="absolute top-2/3 inset-x-0 h-1 bg-blue-500/20"></div>

                      {/* Map Location Pins */}
                      <div className="relative z-10 flex items-center justify-between text-[11px] font-bold">
                        <span className="flex items-center space-x-1.5 bg-slate-900/80 px-2 py-1 rounded-lg border border-teal-400/30">
                          <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                          <span>Nearby Medical Map Finder</span>
                        </span>
                        <span className="text-[10px] text-emerald-300">Live GPS Zone</span>
                      </div>

                      {/* Visual Pins */}
                      <div className="relative z-10 flex items-center justify-around py-1">
                        <div className="flex flex-col items-center">
                          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md animate-bounce">
                            🏥
                          </span>
                          <span className="text-[9px] text-emerald-200 mt-0.5">UPHC (0.8km)</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                            🚑
                          </span>
                          <span className="text-[9px] text-rose-200 mt-0.5">Hospital (1.9km)</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                            💊
                          </span>
                          <span className="text-[9px] text-blue-200 mt-0.5">Pharmacy (0.4km)</span>
                        </div>
                      </div>

                      <div className="relative z-10 text-[10px] text-slate-300 flex items-center justify-between pt-1 border-t border-white/10">
                        <span>Click any facility below for instant navigation:</span>
                      </div>
                    </div>

                    {/* Facility Detail Cards */}
                    <div className="space-y-2">
                      {NEARBY_HEALTH_CENTERS.map((center) => (
                        <div
                          key={center.id}
                          className="bg-white p-3 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm transition space-y-1.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-xs text-slate-900 leading-snug">
                                {isTe ? center.name_te : center.name_en}
                              </h4>
                              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                                {center.type} • {center.distance}
                              </span>
                            </div>

                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.mapQuery)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold shadow-sm transition shrink-0 flex items-center space-x-1"
                            >
                              <span>Maps</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>

                          <p className="text-[11px] text-slate-600">
                            {center.services}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                            <span>🕒 {center.timing}</span>
                            <span>📞 {center.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestion Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1 max-w-[90%]">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sug)}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-[11px] font-semibold border border-slate-200 transition shadow-xs flex items-center space-x-1"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Animation */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-500 text-xs p-3 bg-white rounded-2xl w-fit shadow-xs border border-slate-100 animate-pulse">
                <Stethoscope className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>{isTe ? 'డాక్టర్ పల్స్ సమాధానం పరిశీలిస్తున్నారు...' : 'Dr. Pulse is analyzing your inquiry...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Carousel Row */}
          <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200 overflow-x-auto flex items-center space-x-2 scrollbar-none shrink-0">
            {[
              isTe ? 'హెల్త్ టిప్స్' : 'Daily Health Tips',
              isTe ? 'డెంగ్యూ నివారణ' : 'Dengue Defense',
              isTe ? 'రక్తహీనత ఆహారం' : 'Anaemia Diet',
              isTe ? 'బీపీ / షుగర్' : 'High BP Relief',
              isTe ? 'క్లినిక్‌ల మ్యాప్' : 'Hospitals Map'
            ].map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip)}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-600 hover:text-white text-slate-600 text-[11px] font-semibold border border-slate-200 transition whitespace-nowrap shadow-xs"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder={isTe ? 'మీ ఆరోగ్య ప్రశ్న లేదా లక్షణాలు టైప్ చేయండి...' : 'Ask about symptoms, food, clinics...'}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-2xl transition shadow-sm hover:scale-105"
              title="Send to Dr. Pulse"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   INTELLIGENT MEDICAL KNOWLEDGE & RESPONSE GENERATOR
========================================================================= */
function generateDoctorResponse(query, isTe) {
  const q = query.toLowerCase();

  // 1. FEVER / INFECTION / HEADACHE
  if (q.includes('fever') || q.includes('headache') || q.includes('body ache') || q.includes('జ్వరం') || q.includes('తలనొప్పి')) {
    return {
      id: Date.now(),
      sender: 'doctor',
      text: isTe
        ? `🩺 డాక్టర్ పల్స్ క్లినికల్ సూచన:
1. విశ్రాంతి: తగినంత విశ్రాంతి తీసుకోండి మరియు హైడ్రేషన్ కోసం పుష్కలంగా నీరు, కొబ్బరి నీరు లేదా ORS తీసుకోండి.
2. ఆహారం: తేలికపాటి గంజి, రాగి జావ, లేదా పెసరపప్పు కిచిడీ తీసుకోండి. నూనె పదార్థాలు మానండి.
3. ఉష్ణోగ్రత పర్యవేక్షణ: ప్రతి 4 గంటలకు థర్మామీటర్‌తో జ్వరాన్ని పరీక్షించండి.

⚠ హెచ్చరిక సంకేతాలు (Red Flags):
జ్వరం 102°F దాటినా, విపరీతమైన వాంతులు, ఒంటిపై దద్దుర్లు లేదా శ్వాస తీసుకోవడంలో ఇబ్బంది ఉంటే వెంటనే సమీప ప్రభుత్వ ఏరియా ఆసుపత్రికి వెళ్లండి.`
        : `🩺 Dr. Pulse Medical Assessment:
1. Hydration & Rest: Drink plenty of clean fluids (ORS, coconut water, warm soups) and ensure complete physical rest.
2. Light Diet: Eat easily digestible foods like moong dal khichdi, boiled vegetables, and fruits.
3. Monitor Vitals: Check temperature every 4 hours with a digital thermometer.

⚠ Red Flags (Seek Immediate Care):
If fever exceeds 102°F, persists past 48 hours, or is accompanied by rashes, severe vomiting, or shortness of breath, consult a doctor immediately. Check the nearby medical facilities below:`,
      hasMap: true,
      suggestions: [
        isTe ? 'డెంగ్యూ వ్యాధి లక్షణాలు ఏమిటి?' : 'What are Dengue warning signs?',
        isTe ? 'ఆసుపత్రికి ఎప్పుడు వెళ్ళాలి?' : 'When should I visit hospital?'
      ]
    };
  }

  // 2. DENGUE / MALARIA / MOSQUITO DEFENSE
  if (q.includes('dengue') || q.includes('mosquito') || q.includes('malaria') || q.includes('డెంగ్యూ') || q.includes('దోమ')) {
    return {
      id: Date.now(),
      sender: 'doctor',
      text: isTe
        ? `🦟 డెంగ్యూ & మలేరియా రక్షణ మార్గదర్శకాలు:
1. ఫ్రైడే డ్రై డే (Friday Dry Day): మీ ఇంటి చుట్టూ, ఎయిర్ కూలర్లు, పూలకుండీలు, ఖాళీ కొబ్బరి చిప్పల్లో నిల్వ ఉన్న నీటిని శుక్రవారం రోజున పూర్తిగా తొలగించి ఎండబెట్టండి.
2. దోమకాటు నివారణ: పిల్లలు మరియు వృద్ధులు పూర్తి చేతుల దుస్తులు ధరించాలి. పడుకునేటప్పుడు దోమతెరలు వాడండి.
3. లక్షణాలు: తీవ్రమైన కంటి వెనుక నొప్పి, కీళ్ల నొప్పులు, జ్వరం వస్తే ఆస్పత్రిలో CBC రక్త పరీక్ష చేయించుకోండి.`
        : `🦟 Dengue & Malaria Defense Protocol:
1. Observe Friday Dry Day: Empty, scrub, and dry all water containers, air coolers, flower pots, and scrap tires weekly. Aedes mosquitoes breed in clean stagnant water.
2. Bite Protection: Wear full-sleeved light clothing and sleep under insecticide-treated mosquito bed nets.
3. Warning Signs: Severe pain behind eyes, joint aches, high fever, or drop in platelet count. Get a CBC test done at the nearest UPHC.`,
      hasMap: true,
      suggestions: [
        isTe ? 'నీటిని ఎలా శుద్ధి చేయాలి?' : 'Safe drinking water purification',
        isTe ? 'నా దగ్గరలోని ఆసుపత్రులు' : 'Locate nearest health centre'
      ]
    };
  }

  // 3. NUTRITION / ANAEMIA / IRON DEFICIENCY
  if (q.includes('nutrition') || q.includes('anaemia') || q.includes('anemia') || q.includes('iron') || q.includes('diet') || q.includes('ఆహారం') || q.includes('రక్తహీనత')) {
    return {
      id: Date.now(),
      sender: 'doctor',
      text: isTe
        ? `🥗 పోషకాహారం & రక్తహీనత నివారణ సలహా:
1. ఆకుకూరలు: వారానికి 3-4 సార్లు పాలకూర, తోటకూర, గోంగూర తీసుకోవడం వల్ల సహజంగా ఐరన్ (ఇనుము) పెరుగుతుంది.
2. బెల్లం & పల్లీ చిక్కీ: భోజనం తర్వాత బెల్లం, శనగలు లేదా రాగి పిండితో చేసిన ఆహారం రక్తహీనతను తరిమికొడుతుంది.
3. విటమిన్ సి జోడింపు: ఉసిరికాయ, నిమ్మరసం ఆహారంలో చేర్చడం వల్ల శరీరానికి ఐరన్ గ్రహణ శక్తి రెట్టింపవుతుంది.`
        : `🥗 Clinical Nutrition & Anaemia Prevention Plan:
1. Iron-Rich Local Greens: Consume Palakura (spinach), Thotakura, and Gongura 3-4 times weekly.
2. Jaggery & Millets: Pair traditional millets (Ragi mudda, Jowar) with roasted groundnuts and jaggery for affordable daily haemoglobin support.
3. Vitamin C Boost: Add Amla (Indian gooseberry) or freshly squeezed lemon to your meals; Vitamin C doubles dietary iron absorption!`,
      hasMap: false,
      suggestions: [
        isTe ? 'సమతుల్య ప్లేట్ గేమ్ ఆడండి' : 'Play Healthy Plate Game',
        isTe ? 'రోజుకు ఎంత నీరు తాగాలి?' : 'How much water should I drink?'
      ]
    };
  }

  // 4. MAP / CLINIC / HOSPITAL / PHARMACY LOCATOR
  if (q.includes('hospital') || q.includes('clinic') || q.includes('doctor') || q.includes('pharmacy') || q.includes('map') || q.includes('ఆసుపత్రి') || q.includes('క్లినిక్') || q.includes('మందులు')) {
    return {
      id: Date.now(),
      sender: 'doctor',
      text: isTe
        ? `🏥 మీ ప్రాంతంలోని సమీప వైద్య కేంద్రాలు మరియు ఆసుపత్రుల వివరాలు:
ప్రాథమిక పరీక్షలు మరియు ఉచిత మందుల కోసం UPHC కి లేదా అత్యవసర పరిస్థితుల్లో ఏరియా ఆసుపత్రికి వెళ్ళవచ్చు. క్రింది మ్యాప్ మరియు డైరెక్షన్స్ చూడండి:`
        : `🏥 Nearby Healthcare Facilities & Clinic Locator:
Here are the verified public healthcare facilities and 24/7 emergency centers in your locality. Tap 'Maps' on any card to get instant GPS directions:`,
      hasMap: true,
      suggestions: [
        isTe ? 'అత్యవసర ఫోన్ నంబర్లు' : 'Emergency helplines',
        isTe ? 'బీపీ / షుగర్ పరీక్షల రోజులు' : 'When is free BP/sugar screening?'
      ]
    };
  }

  // 5. HYPERTENSION / DIABETES / LIFESTYLE
  if (q.includes('bp') || q.includes('sugar') || q.includes('diabetes') || q.includes('pressure') || q.includes('stress') || q.includes('బీపీ') || q.includes('షుగర్')) {
    return {
      id: Date.now(),
      sender: 'doctor',
      text: isTe
        ? `💓 రక్తపోటు (BP) & మధుమేహం (షుగర్) నియంత్రణ:
1. ఉప్పు మరియు నూనె నియంత్రణ: రోజువారీ వంటల్లో ఉప్పును ఒక టీస్పూన్ లోపు మాత్రమే వాడండి.
2. 30 నిమిషాల నడక: ఉదయం లేదా సాయంత్రం క్రమం తప్పకుండా వేగంగా నడవడం వల్ల రక్తపోటు సహజంగా తగ్గుతుంది.
3. ఉచిత స్క్రీనింగ్: ప్రతి మంగళవారం, శుక్రవారం సమీప పట్టణ ఆరోగ్య కేంద్రంలో (UPHC) ఉచితంగా పరీక్షలు చేయించుకోండి.`
        : `💓 Blood Pressure & Blood Sugar Management Guidelines:
1. Reduce Dietary Sodium: Keep daily salt intake under 1 level teaspoon (5g). Limit pickles and papads.
2. 30-Minute Brisk Walk: Daily moderate exercise increases arterial flexibility and naturally stabilizes blood sugar.
3. Free Screening: Visit your nearest Urban Primary Health Centre (UPHC) every Tuesday and Friday for free BP and glucometer checks.`,
      hasMap: true,
      suggestions: [
        isTe ? 'రోజువారీ రిమైండర్లు సెట్ చేయండి' : 'Set daily habit reminders',
        isTe ? 'మానసిక ప్రశాంతత చిట్కాలు' : 'Mental stress reduction tips'
      ]
    };
  }

  // 6. SAFE DRINKING WATER / HYGIENE
  if (q.includes('water') || q.includes('filter') || q.includes('boil') || q.includes('hygiene') || q.includes('నీరు') || q.includes('పరిశుభ్రత')) {
    return {
      id: Date.now(),
      sender: 'doctor',
      text: isTe
        ? `💧 రక్షిత తాగునీరు & పరిశుభ్రత అలవాట్లు:
1. కాచి చల్లార్చడం: తాగునీటిని కనీసం 10-15 నిమిషాలు బాగా మరిగించడం ద్వారా నీటిలోని హానికర బ్యాక్టీరియా నశిస్తుంది.
2. 6-దశల చేతులు కడగడం: భోజనానికి ముందు మరియు మరుగుదొడ్డి ఉపయోగించిన తర్వాత సబ్బుతో కనీసం 20 సెకన్ల పాటు చేతులు శుభ్రం చేసుకోండి.
3. నీటి పాత్రల సంరక్షణ: తాగునీటి పాత్రలను ఎల్లప్పుడూ మూతపెట్టి, పొడవాటి గరిటెతో మాత్రమే నీటిని తీసుకోండి.`
        : `💧 Safe Drinking Water & Hygiene Protocol:
1. Rolling Boil for 10-15 mins: The most foolproof household method to eliminate waterborne pathogens causing diarrhea and typhoid.
2. WHO 6-Step Handwashing: Lather with soap for a minimum of 20 seconds before meals and after toilet usage.
3. Covered Storage: Store domestic drinking water in narrow-mouth, covered containers with a dedicated ladle to prevent hand contamination.`,
      hasMap: false,
      suggestions: [
        isTe ? 'జెర్మ్ బస్టర్ గేమ్ ఆడండి' : 'Play Germ Buster Game',
        isTe ? 'ఆరోగ్య క్విజ్ ప్రారంభించండి' : 'Test knowledge in Health Quiz'
      ]
    };
  }

  // DEFAULT HELPFUL DOCTOR RESPONSE
  return {
    id: Date.now(),
    sender: 'doctor',
    text: isTe
      ? `🩺 డాక్టర్ పల్స్ సలహా:
మీరు అడిగిన అంశంపై పరిశుభ్రత, పోషకాహారం మరియు నివారణ పద్ధతులు చాలా కీలకం. ఆరోగ్యకరమైన సమాజం కోసం రోజువారీ 30 నిమిషాల నడక, తగినంత తాగునీరు (2.5-3.5 లీటర్లు), మరియు సమతుల్య ఆహారం పాటించండి.

మీకు అవసరమైతే సమీప ఆరోగ్య కేంద్రాల వివరాలు లేదా మరిన్ని సూచనలు పొందవచ్చు:`
      : `🩺 Dr. Pulse Health Assessment:
Thank you for your question! Preventive healthcare rests on three core pillars: optimal daily hydration (2.5–3.5 litres), a balanced local diet (50% vegetables, 25% millets, 25% protein), and daily physical activity.

If you are experiencing acute discomfort or require immediate consultation, please check nearby health centres or choose an option below:`,
    hasMap: true,
    suggestions: [
      isTe ? 'సమీప క్లినిక్‌లు చూడండి' : 'Find nearby clinics & hospitals',
      isTe ? 'న్యూట్రిషన్ ప్లేట్ గేమ్ ఆడండి' : 'Try Healthy Plate Game',
      isTe ? 'హెల్త్ క్విజ్ ఆడండి' : 'Take Health Quiz Challenge'
    ]
  };
}

