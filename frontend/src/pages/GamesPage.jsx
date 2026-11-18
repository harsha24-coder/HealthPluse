import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  Apple,
  ShieldCheck,
  Activity,
  Heart,
  Droplets,
  RotateCcw,
  Volume2,
  VolumeX,
  Flame,
  Award,
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sun,
  Moon,
  Coffee,
  Footprints,
  Smartphone,
  BedDouble
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSound } from '../utils/soundEffects';

export default function GamesPage() {
  const { language } = useLanguage();
  const isTe = language === 'te';

  const [activeGame, setActiveGame] = useState('nutrition'); // 'nutrition' | 'hygiene' | 'quest'
  const [totalPoints, setTotalPoints] = useState(() => {
    return parseInt(localStorage.getItem('hp_game_points') || '120');
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const triggerSound = (type) => {
    if (soundEnabled) playSound(type);
  };

  const addPoints = (pts) => {
    setTotalPoints(prev => {
      const next = prev + pts;
      localStorage.setItem('hp_game_points', next.toString());
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-emerald-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>{isTe ? 'ఇంటరాక్టివ్ హెల్త్ గేమింగ్ జోన్' : 'Interactive Health Gaming Arena'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {isTe ? 'ఆరోగ్య అవగాహన & లైఫ్‌స్టైల్ గేమ్స్' : 'Play & Learn: Health Awareness Games'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              {isTe
                ? 'సరదా ఆటల ద్వారా సమతుల్య ఆహారం, పరిశుభ్రత పద్ధతులు మరియు ఆరోగ్యకరమైన దినచర్య అలవాట్లను ప్రాక్టీస్ చేయండి.'
                : 'Turn healthy daily habits into interactive fun! Master balanced nutrition, bust vector germs, and craft your 24-hour peak wellness lifestyle.'}
            </p>
          </div>

          {/* Player Score & Sound Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                <Trophy className="w-5 h-5 fill-slate-950" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-200 uppercase tracking-wider block font-semibold">Wellness Points</span>
                <span className="text-xl sm:text-2xl font-black text-white">{totalPoints} pts</span>
              </div>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-white transition"
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-300" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* Game Navigation Tabs */}
        <div className="mt-8 flex flex-wrap gap-2.5 pt-4 border-t border-white/10">
          {[
            { id: 'nutrition', name: isTe ? '1. న్యూట్రిషన్ ప్లేట్ మాస్టర్' : '1. Healthy Plate Master', icon: Apple, desc: isTe ? 'సమతుల్య ఆహార ప్లేట్' : 'Nutrition Builder' },
            { id: 'hygiene', name: isTe ? '2. జెర్మ్ బస్టర్ & వెక్టర్ డిఫెన్స్' : '2. Hygiene Hero: Germ Buster', icon: ShieldCheck, desc: isTe ? 'పరిశుభ్రత రక్షణ' : 'Speed Reflex Action' },
            { id: 'quest', name: isTe ? '3. 24-గంటల లైఫ్‌స్టైల్ క్వెస్ట్' : '3. 24-Hr Daily Lifestyle Quest', icon: Activity, desc: isTe ? 'దినచర్య సిమ్యులేటర్' : 'Healthy Habit Simulator' }
          ].map(tab => {
            const Icon = tab.icon;
            const isCurrent = activeGame === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  triggerSound('click');
                  setActiveGame(tab.id);
                }}
                className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
                  isCurrent
                    ? 'bg-emerald-400 text-slate-950 shadow-emerald-500/30 shadow-md scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <span>{tab.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Game */}
      {activeGame === 'nutrition' && (
        <NutritionPlateGame
          isTe={isTe}
          onSuccessPoints={addPoints}
          triggerSound={triggerSound}
        />
      )}

      {activeGame === 'hygiene' && (
        <GermBusterGame
          isTe={isTe}
          onSuccessPoints={addPoints}
          triggerSound={triggerSound}
        />
      )}

      {activeGame === 'quest' && (
        <DailyQuestGame
          isTe={isTe}
          onSuccessPoints={addPoints}
          triggerSound={triggerSound}
        />
      )}
    </div>
  );
}

/* =========================================================================
   GAME 1: HEALTHY PLATE MASTER (Nutrition Builder)
========================================================================= */
const FOOD_DATABASE = [
  // 50% Veggies & Fruits (Green)
  { id: 'palakura', name_en: 'Spinach / Palakura', name_te: 'పాలకూర (ఆకుకూర)', category: 'veggies', iron: 35, cal: 25, prot: 3, icon: '🥬', healthy: true },
  { id: 'amla', name_en: 'Amla / Indian Gooseberry', name_te: 'ఉసిరికాయ (విటమిన్ సి)', category: 'veggies', iron: 25, cal: 30, prot: 1, icon: '🍏', healthy: true },
  { id: 'carrot', name_en: 'Carrots & Tomato Salad', name_te: 'క్యారెట్ & టొమాటో సలాడ్', category: 'veggies', iron: 15, cal: 35, prot: 1, icon: '🥕', healthy: true },
  { id: 'papaya', name_en: 'Seasonal Papaya / Guava', name_te: 'బొప్పాయి / జామకాయ', category: 'veggies', iron: 15, cal: 45, prot: 1, icon: '🍈', healthy: true },

  // 25% Whole Grains / Millets (Orange)
  { id: 'ragi', name_en: 'Ragi / Millet Mudda', name_te: 'రాగి సంగటి / జొన్నలు', category: 'grains', iron: 30, cal: 120, prot: 7, icon: '🌾', healthy: true },
  { id: 'brown_rice', name_en: 'Brown / Hand-Pounded Rice', name_te: 'దంపుడు బియ్యం అన్నం', category: 'grains', iron: 15, cal: 130, prot: 4, icon: '🍚', healthy: true },
  { id: 'chapati', name_en: 'Whole Wheat Chapati (2)', name_te: 'గోధుమ చపాతీ (2)', category: 'grains', iron: 15, cal: 140, prot: 6, icon: '🫓', healthy: true },

  // 25% Lean Protein (Blue)
  { id: 'dal', name_en: 'Moong / Toor Dal Bowl', name_te: 'కందిపప్పు / పెసరపప్పు', category: 'protein', iron: 25, cal: 110, prot: 12, icon: '🍲', healthy: true },
  { id: 'sprouts', name_en: 'Moong Sprouts', name_te: 'మొలకెత్తిన గింజలు', category: 'protein', iron: 30, cal: 70, prot: 14, icon: '🌱', healthy: true },
  { id: 'egg', name_en: 'Boiled Egg / Paneer', name_te: 'ఉడకబెట్టిన గుడ్డు / పనీర్', category: 'protein', iron: 20, cal: 90, prot: 13, icon: '🥚', healthy: true },

  // Junk Traps (Unhealthy penalties)
  { id: 'cola', name_en: 'Sugary Carbonated Soda', name_te: 'కూల్ డ్రింక్ / శీతల పానీయం', category: 'junk', iron: 0, cal: 180, prot: 0, icon: '🥤', healthy: false },
  { id: 'samosa', name_en: 'Deep-Fried Samosa', name_te: 'నూనెలో వేయించిన సమోసా', category: 'junk', iron: 2, cal: 260, prot: 2, icon: '🥟', healthy: false }
];

function NutritionPlateGame({ isTe, onSuccessPoints, triggerSound }) {
  const [plate, setPlate] = useState([]);
  const [evaluated, setEvaluated] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const toggleItem = (food) => {
    triggerSound('pop');
    setEvaluated(false);
    if (plate.find(item => item.id === food.id)) {
      setPlate(prev => prev.filter(item => item.id !== food.id));
    } else {
      if (plate.length >= 6) {
        alert(isTe ? 'ప్లేట్ నిండిపోయింది! గరిష్టంగా 6 వస్తువులు ఎంచుకోండి.' : 'Plate is full! Max 6 items allowed per meal.');
        return;
      }
      setPlate(prev => [...prev, food]);
    }
  };

  const evaluatePlate = () => {
    if (plate.length === 0) {
      alert(isTe ? 'దయచేసి మీ ప్లేట్ పై ఆహార పదార్థాలను జోడించండి!' : 'Please add some items to your plate first!');
      return;
    }

    const hasVeggies = plate.filter(i => i.category === 'veggies').length;
    const hasGrains = plate.filter(i => i.category === 'grains').length;
    const hasProtein = plate.filter(i => i.category === 'protein').length;
    const hasJunk = plate.filter(i => i.category === 'junk').length;

    let score = 0;
    let tips = [];

    // Veggies ratio check (Ideal: at least 2 portions)
    if (hasVeggies >= 2) {
      score += 40;
      tips.push(isTe ? '✓ 50% కూరగాయలు మరియు ఆకుకూరల సమతుల్యత అద్భుతం!' : '✓ Perfect 50% Vegetables & local greens balance!');
    } else if (hasVeggies === 1) {
      score += 20;
      tips.push(isTe ? '• మరిన్ని ఆకుకూరలు (పాలకూర/తోటకూర) లేదా పండ్లను చేర్చండి.' : '• Add another portion of fresh greens or seasonal fruit.');
    } else {
      tips.push(isTe ? '⚠ కూరగాయలు మరియు పండ్లు లేవు! ఇది విటమిన్ల లోపానికి దారితీస్తుంది.' : '⚠ Missing Vegetables & Fruits! Half of your plate should be colorful greens.');
    }

    // Millets / Grains check (Ideal: 1 portion)
    if (hasGrains === 1) {
      score += 30;
      tips.push(isTe ? '✓ చిరుధాన్యాలు (రాగి/జొన్నలు) సరైన నిష్పత్తిలో ఉన్నాయి.' : '✓ Optimal Whole Grains / Millets portion (25% of plate).');
    } else if (hasGrains > 1) {
      score += 15;
      tips.push(isTe ? '• బియ్యం లేదా ధాన్యాలు అధికంగా ఉన్నాయి, కాస్త తగ్గించండి.' : '• A bit high on carbohydrates. Millets are great, but keep to 25%.');
    } else {
      tips.push(isTe ? '• రోజంతా శక్తికి కొద్దిగా రాగి లేదా దంపుడు బియ్యం చేర్చండి.' : '• Add one portion of whole grains or millets for lasting energy.');
    }

    // Protein check (Ideal: 1 portion)
    if (hasProtein >= 1) {
      score += 30;
      tips.push(isTe ? '✓ పప్పులు లేదా మొలకలతో ప్రోటీన్ అవసరాలు సమకూరాయి.' : '✓ Protein goal satisfied with lentils, sprouts, or eggs.');
    } else {
      tips.push(isTe ? '⚠ ప్రోటీన్ లోపించింది! పప్పు లేదా మొలకలు తప్పనిసరి.' : '⚠ Missing lean protein (dals, sprouts, eggs). Essential for tissue health.');
    }

    // Junk penalty
    if (hasJunk > 0) {
      score = Math.max(0, score - (hasJunk * 30));
      tips.push(isTe ? '❌ వేయించిన లేదా తీపి జంక్ ఫుడ్ ఆరోగ్యాన్ని దెబ్బతీస్తుంది!' : '❌ Highly processed junk/soda penalized! Swap with water or coconut water.');
    }

    const totalIron = plate.reduce((sum, item) => sum + item.iron, 0);
    const totalCals = plate.reduce((sum, item) => sum + item.cal, 0);

    setEvaluated(true);
    setFeedback({
      score,
      tips,
      totalIron,
      totalCals,
      passed: score >= 70
    });

    if (score >= 70) {
      triggerSound('success');
      onSuccessPoints(50);
    } else {
      triggerSound('error');
    }
  };

  const clearPlate = () => {
    triggerSound('pop');
    setPlate([]);
    setEvaluated(false);
    setFeedback(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
            WHO Balanced Plate Rule
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {isTe ? 'న్యూట్రిషన్ ప్లేట్ మాస్టర్' : 'Healthy Plate Master'}
          </h2>
          <p className="text-xs text-slate-500">
            {isTe
              ? 'కింది ఆహార పదార్థాలను క్లిక్ చేసి ప్లేట్ లో ఉంచండి. సరైన సమతుల్యత సాధించి పాయింట్లు గెలవండి!'
              : 'Select foods to build an ideal plate: 50% Veggies & Fruits, 25% Whole Grains, 25% Lean Protein. Avoid junk!'}
          </p>
        </div>

        <button
          onClick={clearPlate}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isTe ? 'రీసెట్ ప్లేట్' : 'Clear Plate'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Visual Plate */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-slate-100 to-white border-8 border-emerald-600/20 shadow-inner flex items-center justify-center p-4">
            {/* Plate Zone Divider Crosshair lines */}
            <div className="absolute inset-x-4 top-1/2 h-[1px] bg-slate-200 border-dashed"></div>
            <div className="absolute inset-y-4 left-1/2 w-[1px] bg-slate-200 border-dashed"></div>

            {/* Zone Labels */}
            <span className="absolute top-6 text-[10px] font-bold text-emerald-600 tracking-wider uppercase">
              50% Veggies & Fruits
            </span>
            <span className="absolute bottom-6 left-6 text-[9px] font-bold text-amber-600 uppercase">
              25% Grains
            </span>
            <span className="absolute bottom-6 right-6 text-[9px] font-bold text-blue-600 uppercase">
              25% Protein
            </span>

            {/* Placed Food Icons on Plate */}
            {plate.length === 0 ? (
              <span className="text-xs text-slate-400 text-center font-medium px-4">
                {isTe ? 'ప్లేట్ ఖాళీగా ఉంది.\nపదార్థాలను ఎంచుకోండి!' : 'Plate is empty.\nClick food items to add!'}
              </span>
            ) : (
              <div className="grid grid-cols-3 gap-2 z-10">
                {plate.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item)}
                    className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-200/80 flex flex-col items-center justify-center hover:scale-105 transition hover:border-rose-400 group"
                    title={`Click to remove ${item.name_en}`}
                  >
                    <span className="text-xl group-hover:scale-110 transition">{item.icon}</span>
                    <span className="text-[9px] font-bold text-slate-600 truncate max-w-[48px]">{item.name_en.split('/')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full text-center">
            <button
              onClick={evaluatePlate}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition hover:scale-[1.02]"
            >
              {isTe ? '🔍 డాక్టర్ రేటింగ్ & స్కోర్ చూడండి' : '🔍 Evaluate My Plate with Dr. Pulse'}
            </button>
          </div>
        </div>

        {/* Right: Food Selector Trays */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
              <span>🥦 50% Vegetables & Fruits (Vitamins & Iron)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FOOD_DATABASE.filter(f => f.category === 'veggies').map(food => {
                const isSelected = plate.some(p => p.id === food.id);
                return (
                  <button
                    key={food.id}
                    onClick={() => toggleItem(food)}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 font-semibold'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{food.icon}</span>
                    <div className="text-[11px] leading-tight">
                      <strong className="block text-slate-800">{isTe ? food.name_te.split('(')[0] : food.name_en.split('/')[0]}</strong>
                      <span className="text-[10px] text-slate-400">+{food.iron}% Iron</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center space-x-1.5">
              <span>🌾 25% Whole Grains & Millets (Complex Carbs)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {FOOD_DATABASE.filter(f => f.category === 'grains').map(food => {
                const isSelected = plate.some(p => p.id === food.id);
                return (
                  <button
                    key={food.id}
                    onClick={() => toggleItem(food)}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/20 font-semibold'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{food.icon}</span>
                    <div className="text-[11px] leading-tight">
                      <strong className="block text-slate-800">{isTe ? food.name_te.split('/')[0] : food.name_en.split('/')[0]}</strong>
                      <span className="text-[10px] text-slate-400">{food.cal} kcal</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center space-x-1.5">
              <span>🥚 25% Lean Protein & Lentils (Body Building)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {FOOD_DATABASE.filter(f => f.category === 'protein').map(food => {
                const isSelected = plate.some(p => p.id === food.id);
                return (
                  <button
                    key={food.id}
                    onClick={() => toggleItem(food)}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-950 ring-2 ring-blue-500/20 font-semibold'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{food.icon}</span>
                    <div className="text-[11px] leading-tight">
                      <strong className="block text-slate-800">{isTe ? food.name_te.split('/')[0] : food.name_en.split('/')[0]}</strong>
                      <span className="text-[10px] text-slate-400">{food.prot}g Protein</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center space-x-1.5">
              <span>⚠ Processed Traps (Warning: Health Penalty!)</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {FOOD_DATABASE.filter(f => f.category === 'junk').map(food => {
                const isSelected = plate.some(p => p.id === food.id);
                return (
                  <button
                    key={food.id}
                    onClick={() => toggleItem(food)}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500/20 font-semibold'
                        : 'bg-white hover:bg-rose-50/50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{food.icon}</span>
                    <div className="text-[11px] leading-tight">
                      <strong className="block text-slate-800">{isTe ? food.name_te.split('/')[0] : food.name_en.split('/')[0]}</strong>
                      <span className="text-[10px] text-rose-600 font-bold">-30 pts penalty</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Evaluation Result */}
      {evaluated && feedback && (
        <div className={`p-6 rounded-2xl border transition animate-fade-in space-y-4 ${
          feedback.passed ? 'bg-emerald-50/70 border-emerald-300' : 'bg-amber-50/70 border-amber-300'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md ${
                feedback.passed ? 'bg-emerald-600' : 'bg-amber-600'
              }`}>
                {feedback.score}%
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  {feedback.passed
                    ? (isTe ? '🏆 అద్భుతమైన సమతుల్య భోజనం!' : '🏆 Outstanding Balanced Plate!')
                    : (isTe ? '💡 సమతుల్యతలో కొన్ని మార్పులు అవసరం' : '💡 Needs Nutrition Adjustments')}
                </h3>
                <span className="text-xs text-slate-600">
                  Total Calories: <strong>{feedback.totalCals} kcal</strong> • Iron Support: <strong>+{feedback.totalIron}%</strong>
                </span>
              </div>
            </div>

            {feedback.passed && (
              <span className="text-xs font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm">
                +50 Wellness Points Added!
              </span>
            )}
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-200/60">
            {feedback.tips.map((tip, idx) => (
              <p key={idx} className="font-medium">{tip}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   GAME 2: HYGIENE HERO - GERM BUSTER (Action Timing Game)
========================================================================= */
const THREAT_TYPES = [
  { id: 'mosquito', name_en: 'Dengue Mosquito Larvae', name_te: 'డెంగ్యూ దోమ లార్వా', icon: '🦟', tool: 'dryday', toolName: 'Friday Dry-Day Sponge', points: 20 },
  { id: 'germs', name_en: 'Unwashed Hand Bacteria', name_te: 'చేతులపై బ్యాక్టీరియా', icon: '🦠', tool: 'soap', toolName: 'WHO Soap & 20s Wash', points: 15 },
  { id: 'nails', name_en: 'Dirty Long Nails Dirt', name_te: 'గోళ్ల కింద మురికి', icon: '💅', tool: 'clipper', toolName: 'Nail Hygiene Clipper', points: 15 },
  { id: 'sneeze', name_en: 'Airborne Sneeze Droplets', name_te: 'తుమ్ములు & గాలి తుంపర్లు', icon: '🤧', tool: 'mask', toolName: 'Mask & Clean Towel', points: 20 }
];

function GermBusterGame({ isTe, onSuccessPoints, triggerSound }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [activeThreats, setActiveThreats] = useState([]);
  const [selectedTool, setSelectedTool] = useState('soap');
  const [gameOver, setGameOver] = useState(false);

  // Game timer loop
  useEffect(() => {
    let timer = null;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Threat spawner loop
  useEffect(() => {
    let spawner = null;
    if (isPlaying) {
      spawner = setInterval(() => {
        if (activeThreats.length < 6) {
          const randomType = THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)];
          const newThreat = {
            instanceId: Date.now() + Math.random(),
            ...randomType,
            x: Math.floor(Math.random() * 80) + 10,
            y: Math.floor(Math.random() * 70) + 15
          };
          setActiveThreats(prev => [...prev.slice(-5), newThreat]);
        }
      }, 900);
    }
    return () => clearInterval(spawner);
  }, [isPlaying, activeThreats]);

  const startGame = () => {
    triggerSound('pop');
    setScore(0);
    setTimeLeft(25);
    setActiveThreats([]);
    setGameOver(false);
    setIsPlaying(true);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (score >= 60) {
      triggerSound('success');
      onSuccessPoints(60);
    } else {
      triggerSound('error');
    }
  };

  const handleBustThreat = (threat) => {
    if (selectedTool === threat.tool) {
      triggerSound('zap');
      setScore(prev => prev + threat.points);
      setActiveThreats(prev => prev.filter(t => t.instanceId !== threat.instanceId));
    } else {
      triggerSound('error');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 uppercase tracking-wider">
            Preventive Hygiene Arcade
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {isTe ? 'జెర్మ్ బస్టర్ & వెక్టర్ డిఫెన్స్' : 'Hygiene Hero: Germ Buster'}
          </h2>
          <p className="text-xs text-slate-500">
            {isTe
              ? 'సరైన పరిశుభ్రత సాధనాన్ని ఎంచుకుని దోమలు మరియు క్రిములను తుడిచిపెట్టండి!'
              : 'Switch tools and tap matching health hazards (larvae, bacteria, unwashed hands) before time runs out!'}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center px-4 py-2 bg-slate-100 rounded-2xl">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Time Left</span>
            <span className={`text-xl font-black ${timeLeft <= 5 ? 'text-rose-600 animate-ping' : 'text-slate-800'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="text-center px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-200">
            <span className="text-[10px] text-emerald-700 block uppercase font-bold">Score</span>
            <span className="text-xl font-black text-emerald-800">{score}</span>
          </div>
        </div>
      </div>

      {/* Tool Selection Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
        <span className="text-xs font-bold text-slate-500 mr-2">{isTe ? 'మీ సాధనం:' : 'Active Tool:'}</span>
        {[
          { id: 'soap', label: isTe ? '🧼 సబ్బు (చేతులు)' : '🧼 Soap & 20s Wash', target: 'Bacteria' },
          { id: 'dryday', label: isTe ? '🧽 డ్రై-డే స్పాంజ్' : '🧽 Friday Dry-Day Sponge', target: 'Dengue Mosquito' },
          { id: 'clipper', label: isTe ? '✂️ నెయిల్ క్లిప్పర్' : '✂️ Nail Clipper', target: 'Nail Dirt' },
          { id: 'mask', label: isTe ? '😷 మాస్క్ & కర్చీఫ్' : '😷 Clean Mask', target: 'Sneeze Droplets' }
        ].map(tool => (
          <button
            key={tool.id}
            onClick={() => {
              triggerSound('click');
              setSelectedTool(tool.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
              selectedTool === tool.id
                ? 'bg-slate-900 text-white shadow-md scale-105'
                : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Game Stage Area */}
      <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-b from-teal-50/50 via-slate-50 to-emerald-50/30 border-2 border-dashed border-emerald-200 overflow-hidden shadow-inner flex items-center justify-center">
        {!isPlaying && !gameOver && (
          <div className="text-center space-y-3 z-20">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 text-2xl animate-bounce">
              🧼
            </div>
            <h3 className="text-xl font-black text-slate-800">
              {isTe ? 'క్రిములను అంతం చేయడానికి సిద్ధమా?' : 'Ready to Cleanse & Protect?'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isTe
                ? '25 సెకన్లలో వీలైనన్ని ఎక్కువ క్రిములను సరైన సాధనంతో శుభ్రం చేయండి.'
                : 'Bust 60+ points to earn 60 Wellness Points. Match the right hygiene tool to each threat!'}
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-md transition hover:scale-105"
            >
              {isTe ? 'ఆట ప్రారంభించండి' : 'Start Germ Buster Game'}
            </button>
          </div>
        )}

        {/* Live Active Germs & Threats */}
        {isPlaying && activeThreats.map(threat => (
          <button
            key={threat.instanceId}
            onClick={() => handleBustThreat(threat)}
            style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl bg-white/90 shadow-lg border border-slate-200 hover:scale-125 transition duration-150 animate-pulse flex flex-col items-center group cursor-crosshair"
          >
            <span className="text-3xl">{threat.icon}</span>
            <span className="text-[9px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded mt-0.5 whitespace-nowrap">
              {threat.toolName}
            </span>
          </button>
        ))}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="text-center space-y-4 z-20 bg-white/95 p-8 rounded-3xl shadow-xl border border-slate-200 max-w-md mx-4 animate-fade-in">
            <span className="text-4xl">{score >= 60 ? '🏆' : '💪'}</span>
            <h3 className="text-2xl font-black text-slate-900">
              {score >= 60
                ? (isTe ? 'అద్భుతమైన పరిశుభ్రత నైపుణ్యం!' : 'Hygiene Champion!')
                : (isTe ? 'మంచి ప్రయత్నం! మళ్ళీ ఆడండి' : 'Good Effort! Practice Makes Perfect')}
            </h3>
            <p className="text-xs text-slate-600">
              You scored <strong>{score} points</strong>.
              {score >= 60 && ' +60 Wellness Points credited!'}
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
              >
                {isTe ? 'మళ్ళీ ఆడండి' : 'Play Again'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   GAME 3: 24-HOUR DAILY LIFESTYLE QUEST (Habit Simulator)
========================================================================= */
const QUEST_SCENARIOS = [
  {
    time: '07:00 AM',
    title_en: 'Morning Kickstart: Hydration & Waking Up',
    title_te: 'ఉదయం లేవగానే: హైడ్రేషన్ & నడక',
    icon: Sun,
    choices: [
      { text_en: 'Drink 2 glasses of warm water & do 10-min light stretching', text_te: '2 గ్లాసుల గోరువెచ్చని నీరు తాగి తేలికపాటి వ్యాయామం చేయడం', vitality: +25, calm: +20, feedback: '✓ Flushes toxins and kickstarts metabolism!' },
      { text_en: 'Drink strong sugary tea on an empty stomach with sweet biscuits', text_te: 'పరగడుపున చక్కెర టీ మరియు బిస్కెట్లు తీసుకోవడం', vitality: +5, calm: -10, feedback: '⚠ Spikes blood sugar and irritates digestive lining.' },
      { text_en: 'Check phone notifications in bed for 45 minutes, skipping water', text_te: 'మంచంపైనే 45 నిమిషాలు మొబైల్ చూస్తూ నీరు తాగడం మర్చిపోవడం', vitality: -15, calm: -20, feedback: '❌ Promotes dehydration and early morning mental fatigue.' }
    ]
  },
  {
    time: '08:30 AM',
    title_en: 'Daily Commute & Physical Activity',
    title_te: 'ప్రయాణం & శారీరక శ్రమ',
    icon: Footprints,
    choices: [
      { text_en: 'Walk briskly for 30 minutes / cycle to nearby destinations', text_te: '30 నిమిషాలు వేగంగా నడవడం లేదా సైకిల్ తొక్కడం', vitality: +30, calm: +25, feedback: '✓ Builds cardiovascular stamina and regulates BP/Sugar!' },
      { text_en: 'Drive vehicle even for a 200m distance to avoid walking', text_te: 'చిన్న దూరానికి కూడా బైక్ వాడుతూ నడకను విస్మరించడం', vitality: -10, calm: -5, feedback: '⚠ Sedentary habit leads to stiffness and lethargy.' }
    ]
  },
  {
    time: '01:00 PM',
    title_en: 'Afternoon Lunch Decision',
    title_te: 'మధ్యాహ్న భోజనం ఎంపిక',
    icon: Coffee,
    choices: [
      { text_en: 'Balanced thali: Spinach dal, brown rice/ragi, cucumber curd salad', text_te: 'సమతుల్య భోజనం: పాలకూర పప్పు, రాగి అన్నం, దోసకాయ పెరుగు పచ్చడి', vitality: +30, calm: +20, feedback: '✓ Rich in iron, fiber, probiotics and sustained afternoon energy.' },
      { text_en: 'Fast food / extra oily biryani with carbonated soda bottle', text_te: 'నూనె అధికంగా ఉండే జంక్ ఫుడ్ మరియు కూల్ డ్రింక్', vitality: -20, calm: -15, feedback: '❌ Heavy fats cause afternoon brain fog and acidity.' }
    ]
  },
  {
    time: '05:30 PM',
    title_en: 'Evening Slump & Stress Relief',
    title_te: 'సాయంత్రం ఒత్తిడి నివారణ',
    icon: Heart,
    choices: [
      { text_en: 'Brisk evening walk in open air + handful of boiled sprouts or amla', text_te: 'స్వచ్ఛమైన గాలిలో నడక + ఉడకబెట్టిన మొలకలు / ఉసిరి', vitality: +25, calm: +30, feedback: '✓ Naturally reduces cortisol stress hormones and beats hunger.' },
      { text_en: 'Consume tobacco / gutkha or fried snacks to "relieve stress"', text_te: 'ఒత్తిడి పేరుతో పొగాకు, గుట్కా లేదా వేపుళ్ళు తినడం', vitality: -35, calm: -25, feedback: '❌ Extremely toxic! Damages heart, gums, and causes chronic BP.' }
    ]
  },
  {
    time: '10:00 PM',
    title_en: 'Night Rest & Sleep Hygiene',
    title_te: 'రాత్రి నిద్ర పరిశుభ్రత',
    icon: BedDouble,
    choices: [
      { text_en: 'Keep smartphone away 1 hour before sleep, sleep 7-8 hours soundly', text_te: 'పడుకునే గంట ముందే మొబైల్ పక్కన పెట్టి 7-8 గంటలు ప్రశాంతంగా నిద్రించడం', vitality: +30, calm: +35, feedback: '✓ Restores immune health, memory, and deep physical repair.' },
      { text_en: 'Scroll social media reels in dark room until 02:00 AM', text_te: 'చీకట్లో అర్ధరాత్రి 2 గంటల వరకు మొబైల్ స్క్రీన్ చూడటం', vitality: -30, calm: -35, feedback: '❌ Blue light disrupts melatonin, causing chronic insomnia and eye strain.' }
    ]
  }
];

function DailyQuestGame({ isTe, onSuccessPoints, triggerSound }) {
  const [step, setStep] = useState(0);
  const [vitality, setVitality] = useState(50);
  const [calm, setCalm] = useState(50);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleChoose = (choice) => {
    triggerSound('click');
    const newVitality = Math.min(100, Math.max(0, vitality + choice.vitality));
    const newCalm = Math.min(100, Math.max(0, calm + choice.calm));
    setVitality(newVitality);
    setCalm(newCalm);
    setSelectedChoices(prev => [...prev, choice]);

    if (step < QUEST_SCENARIOS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setFinished(true);
      triggerSound('success');
      onSuccessPoints(80);
    }
  };

  const resetQuest = () => {
    triggerSound('pop');
    setStep(0);
    setVitality(50);
    setCalm(50);
    setSelectedChoices([]);
    setFinished(false);
  };

  const currentScenario = QUEST_SCENARIOS[step];
  const ScenarioIcon = currentScenario?.icon;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            24-Hour Habit Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {isTe ? '24-గంటల లైఫ్‌స్టైల్ క్వెస్ట్' : '24-Hour Daily Lifestyle Quest'}
          </h2>
          <p className="text-xs text-slate-500">
            {isTe
              ? 'ప్రతి నిర్ణయం మీ శరీర బలాన్ని (Vitality) మరియు మానసిక ప్రశాంతతను (Calm) ప్రభావితం చేస్తుంది.'
              : 'Make smart choices from morning hydration to bedtime screen curfew. Balance your Energy & Mental Peace!'}
          </p>
        </div>

        {/* Meters */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs">
            <span className="text-[10px] text-amber-800 font-bold block uppercase flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Vitality HP</span>
            </span>
            <div className="w-24 bg-amber-200 h-2.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${vitality}%` }}></div>
            </div>
            <span className="text-[10px] font-bold text-amber-900 block text-right mt-0.5">{vitality}/100</span>
          </div>

          <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 text-xs">
            <span className="text-[10px] text-teal-800 font-bold block uppercase flex items-center space-x-1">
              <Heart className="w-3.5 h-3.5 text-teal-600" />
              <span>Mental Calm</span>
            </span>
            <div className="w-24 bg-teal-200 h-2.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-teal-500 h-full transition-all duration-300" style={{ width: `${calm}%` }}></div>
            </div>
            <span className="text-[10px] font-bold text-teal-900 block text-right mt-0.5">{calm}/100</span>
          </div>
        </div>
      </div>

      {!finished ? (
        <div className="space-y-6">
          {/* Step Header */}
          <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
              <ScenarioIcon className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 block">
                {currentScenario.time} • Scenario {step + 1} of {QUEST_SCENARIOS.length}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isTe ? currentScenario.title_te : currentScenario.title_en}
              </h3>
            </div>
          </div>

          {/* Choices */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isTe ? 'మీరు ఏమి ఎంచుకుంటారు?' : 'What action will you take?'}
            </p>
            {currentScenario.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoose(choice)}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition group flex items-start space-x-3 shadow-sm hover:shadow"
              >
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition">
                  {i + 1}
                </div>
                <div className="flex-1 text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-emerald-950 transition">
                  {isTe ? choice.text_te : choice.text_en}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results / Doctor Prescription */
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <span className="text-4xl">🌟</span>
            <h3 className="text-2xl font-black text-slate-900">
              {isTe ? '24-గంటల క్వెస్ట్ పూర్తయింది!' : '24-Hour Lifestyle Quest Completed!'}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              {isTe
                ? 'మీ రోజువారీ అలవాట్ల ఆధారంగా డాక్టర్ పల్స్ రూపొందించిన వ్యక్తిగత జీవనశైలి నివేదిక:'
                : 'Here is your personalized Lifestyle Routine Report from Dr. Pulse to make every day healthier and more productive:'}
            </p>
          </div>

          {/* Overall Score Badge */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-center">
            <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold block">Final Vitality</span>
              <span className="text-2xl font-black text-amber-600">{vitality}%</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold block">Mental Peace</span>
              <span className="text-2xl font-black text-teal-600">{calm}%</span>
            </div>
          </div>

          {/* Actionable Feedback from Choices */}
          <div className="space-y-2 max-w-xl mx-auto bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Dr. Pulse Daily Prescription Checklist:
            </h4>
            {selectedChoices.map((c, idx) => (
              <div key={idx} className="text-xs text-slate-700 flex items-start space-x-2">
                <span className="shrink-0">{c.vitality > 0 ? '✅' : '💡'}</span>
                <span>{c.feedback}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={resetQuest}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition"
            >
              {isTe ? 'క్వెస్ట్ ను మళ్ళీ ఆడండి' : 'Replay Daily Quest'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

