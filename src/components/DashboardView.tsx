import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Camera, 
  Calendar, 
  BookOpen, 
  Timer, 
  TrendingUp,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

interface DashboardViewProps {
  setActiveTab: (tab: any) => void;
}

export default function DashboardView({ setActiveTab }: DashboardViewProps) {
  const stats = [
    { label: 'Time Studied', value: '2.5h', icon: <Timer className="w-4 h-4" /> },
    { label: 'Notes Saved', value: '12', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Tasks Done', value: '4/6', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const quickLinks = [
    { id: 'chat', label: 'Ask Sreejib', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-blue-500' },
    { id: 'camera', label: 'Scan Problem', icon: <Camera className="w-6 h-6" />, color: 'bg-indigo-500' },
    { id: 'planner', label: 'Study Plan', icon: <Calendar className="w-6 h-6" />, color: 'bg-emerald-500' },
    { id: 'timer', label: 'Pomodoro', icon: <Timer className="w-6 h-6" />, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h2 className="text-2xl font-black tracking-tight">শ্রীজীবের শুভেচ্ছা! Good Day!</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Ready to conquer your studies today?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center gap-1 shadow-sm"
          >
            <div className="text-blue-600 dark:text-blue-400">{stat.icon}</div>
            <span className="text-lg font-bold">{stat.value}</span>
            <span className="text-[10px] text-slate-400 uppercase font-black">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {quickLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className="flex flex-col p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left relative overflow-hidden group"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-3", link.color)}>
              {link.icon}
            </div>
            <span className="font-bold text-lg">{link.label}</span>
            <span className="text-xs text-slate-400 font-medium">Click to open</span>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>
        ))}
      </div>

      {/* Motivation Section */}
      <div className="bg-blue-600 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100">Daily Motivation</span>
          </div>
          <p className="text-xl font-medium leading-tight">
            "The secret of getting ahead is getting started."
          </p>
          <p className="text-sm text-blue-200">— Mark Twain</p>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10 blur-xl w-32 h-32 bg-white rounded-full" />
      </div>

      {/* Recent Notes Shortcut */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Recent Notes</h3>
          <button onClick={() => setActiveTab('notes')} className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">See All</button>
        </div>
        <div className="space-y-2">
          {['Physics Chapter 4', 'Biology - Cell Division'].map((note) => (
            <div key={note} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 group cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="font-medium">{note}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
