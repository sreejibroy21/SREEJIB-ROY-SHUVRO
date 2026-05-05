import { motion } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  MessageSquare, 
  AlertTriangle,
  Settings,
  ChevronRight,
  Database
} from 'lucide-react';

export default function AdminView() {
  const stats = [
    { label: 'Total Users', value: '1,280', icon: <Users className="w-5 h-5 text-blue-600" /> },
    { label: 'AI Queries', value: '15.4k', icon: <MessageSquare className="w-5 h-5 text-indigo-600" /> },
    { label: 'Server Load', value: '12%', icon: <Database className="w-5 h-5 text-emerald-600" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-red-500" />
          <h2 className="text-2xl font-black tracking-tight">Admin Control</h2>
        </div>
        <p className="text-slate-500 font-medium">Manage শ্রীজীব Study Helper platform.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase">{stat.label}</p>
                <p className="text-2xl font-black">{stat.value}</p>
              </div>
            </div>
            <BarChart3 className="w-5 h-5 text-slate-200" />
          </motion.div>
        ))}
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-6 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold">System Alerts</h3>
        </div>
        <p className="text-sm text-red-800 dark:text-red-200 font-medium">
          Note: This is the foundation for your Admin panel. You can connect this to Firebase to manage users and study materials later.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold">Quick Management</h3>
        {['User Reports', 'Review AI Logs', 'Subject Categories'].map((item) => (
          <button key={item} className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 transition-colors">
            <span className="font-medium">{item}</span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
