import { useState } from 'react';
import { BookOpen, Mail, Lock, LogIn, UserPlus, Fingerprint } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginViewProps {
  onLogin: () => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-blue-500/20">
            <BookOpen className="text-white w-10 h-10" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight">Sreejib's</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Study Helper</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-center">
              {isLogin ? 'স্বাগতম! Welcome Back' : 'নতুন একাউন্ট খুলুন (Signup)'}
            </h2>
            <p className="text-xs text-slate-400 text-center font-medium">Continue your learning journey</p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest px-1">Full Name</label>
                <div className="relative">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Sreejib Roy"
                    className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest px-1 text-slate-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="name@university.com"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest px-1 text-slate-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <button 
              onClick={onLogin}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {isLogin ? 'Login Now' : 'Create Account'}
            </button>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
