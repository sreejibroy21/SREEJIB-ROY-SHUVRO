import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee, 
  Timer as TimerIcon,
  Bell,
  Settings as SettingsIcon,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function TimerView() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeElapsed(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black">Study Stopwatch</h2>
        <p className="text-slate-500 font-medium tracking-tight">সময় আপনার বন্ধু, একে কাজে লাগান।</p>
      </div>

      {/* Timer Circle */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle 
            cx="144" cy="144" r="130" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8" 
            className="text-slate-200 dark:text-slate-800"
          />
          <motion.circle 
            cx="144" cy="144" r="130" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeDasharray={2 * Math.PI * 130}
            animate={{ strokeDashoffset: (2 * Math.PI * 130) * (1 - (timeElapsed % 60) / 60) }}
            className="text-blue-600"
            strokeLinecap="round"
          />
        </svg>

        <div className="text-center z-10 flex flex-col items-center px-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl mb-2 flex items-center justify-center">
            <TimerIcon className="w-6 h-6" />
          </div>
          <span className="text-5xl font-black tracking-tighter tabular-nums">{formatTime(timeElapsed)}</span>
          <span className="text-xs font-black uppercase tracking-widest mt-2 text-blue-600">
            {isActive ? 'Session Active' : 'Ready to Start'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button 
          onClick={resetTimer}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-500 hover:text-blue-600 shadow-sm transition-all active:scale-95"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <button 
          onClick={toggleTimer}
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all active:scale-95",
            isActive ? "bg-red-500 ring-8 ring-red-50 dark:ring-red-900/10" : "bg-blue-600 ring-8 ring-blue-50 dark:ring-blue-900/20"
          )}
        >
          {isActive ? <Pause className="w-10 h-10" fill="currentColor" /> : <Play className="w-10 h-10 ml-1" fill="currentColor" />}
        </button>
        <button 
          onClick={() => setShowSettings(true)}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-500 hover:text-blue-600 shadow-sm transition-all active:scale-95"
        >
          <SettingsIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Motivation Tip */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 w-full"
      >
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shrink-0">
          <Bell className="text-white w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold uppercase text-blue-700 dark:text-blue-400">Study Goal</h4>
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 leading-tight">শ্রীজীব বলছে: মনোযোগ দিয়ে পড়লে ফল অবশই পাবে!</p>
        </div>
      </motion.div>

      {/* Settings Modal (Simplified) */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSettings(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[40px] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Timer Settings</h3>
                <button onClick={() => setShowSettings(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Focus Duration</span>
                  <span className="text-blue-600 font-bold">25 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Break Duration</span>
                  <span className="text-emerald-500 font-bold">5 min</span>
                </div>
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold mt-4">Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
