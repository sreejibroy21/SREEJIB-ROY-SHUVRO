import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Camera, 
  Calendar, 
  BookOpen, 
  Timer, 
  Mic, 
  Home,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import ChatView from './components/ChatView';
import CameraView from './components/CameraView';
import PlannerView from './components/PlannerView';
import NotesView from './components/NotesView';
import TimerView from './components/TimerView';
import DashboardView from './components/DashboardView';
import LoginView from './components/LoginView';

import AdminView from './components/AdminView';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'camera' | 'planner' | 'notes' | 'timer' | 'admin'>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  if (!isLoggedIn) {
    return <LoginView onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <DashboardView setActiveTab={setActiveTab} />;
      case 'chat': return <ChatView />;
      case 'camera': return <CameraView />;
      case 'planner': return <PlannerView />;
      case 'notes': return <NotesView />;
      case 'timer': return <TimerView />;
      case 'admin': return <AdminView />;
      default: return <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 font-sans",
      isDarkMode && "bg-slate-950 text-slate-100 dark"
    )}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div onClick={() => setActiveTab('admin')} className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <div onClick={() => setActiveTab('home')} className="cursor-pointer">
            <h1 className="font-bold text-lg leading-tight tracking-tight">Sreejib's</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">Study Helper</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-red-500"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24 max-w-lg mx-auto min-h-[calc(100vh-120px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe z-50">
        <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-around">
          <NavButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            icon={<Home className="w-5 h-5" />} 
            label="Home" 
          />
          <NavButton 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')} 
            icon={<MessageSquare className="w-5 h-5" />} 
            label="Chat" 
          />
          <NavButton 
            active={activeTab === 'camera'} 
            onClick={() => setActiveTab('camera')} 
            icon={<Camera className="w-5 h-5" />} 
            label="Scan" 
          />
          <NavButton 
            active={activeTab === 'planner'} 
            onClick={() => setActiveTab('planner')} 
            icon={<Calendar className="w-5 h-5" />} 
            label="Plan" 
          />
          <NavButton 
            active={activeTab === 'notes'} 
            onClick={() => setActiveTab('notes')} 
            icon={<BookOpen className="w-5 h-5" />} 
            label="Notes" 
          />
          <NavButton 
            active={activeTab === 'timer'} 
            onClick={() => setActiveTab('timer')} 
            icon={<Timer className="w-5 h-5" />} 
            label="Timer" 
          />
        </div>
      </nav>

      {/* Voice Floating Action Button */}
      {(activeTab === 'home' || activeTab === 'chat') && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            "fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all z-40 focus:outline-hidden",
            isVoiceActive ? "bg-red-500 scale-110 animate-pulse" : "bg-blue-600 hover:scale-105"
          )}
          onClick={() => {
            setIsVoiceActive(!isVoiceActive);
          }}
        >
          <Mic className="text-white w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
        active ? "text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
      )}
    >
      <div className={cn(
        "p-1.5 rounded-lg transition-colors",
        active && "bg-blue-50 dark:bg-blue-900/30"
      )}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
