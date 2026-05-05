import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Calendar as CalendarIcon,
  ChevronRight,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  time?: string;
  category: string;
}

export default function PlannerView() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Math practice chapter 4', completed: false, time: '10:00 AM', category: 'Math' },
    { id: '2', title: 'Biology notes revision', completed: true, time: '11:30 AM', category: 'Biology' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      category: 'General'
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setShowAdd(false);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight">Study Planner</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Keep track of your goals.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Today's Progress</p>
            <p className="text-3xl font-black">{completionRate}% Done</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle 
                cx="32" cy="32" r="28" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                className="text-blue-600"
                strokeDasharray="175.9"
                strokeDashoffset={175.9 - (175.9 * completionRate) / 100}
                strokeLinecap="round"
              />
            </svg>
            <CheckCircle2 className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          To-do List
        </h3>
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              key={task.id}
              className={cn(
                "group flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all",
                task.completed && "opacity-60 grayscale-[0.5]"
              )}
            >
              <div className="flex items-center gap-3 flex-1" onClick={() => toggleTask(task.id)}>
                <button className="text-blue-600 shrink-0">
                  {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </button>
                <div className="flex flex-col">
                  <span className={cn("font-bold text-sm", task.completed && "line-through")}>{task.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-black text-slate-500 uppercase tracking-tighter">
                      {task.category}
                    </span>
                    {task.time && <span className="text-[10px] text-slate-400 font-medium">{task.time}</span>}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="p-2 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end p-4">
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            className="w-full bg-white dark:bg-slate-900 rounded-t-3xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Add New Task</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 p-1">Close</button>
            </div>
            <input 
              autoFocus
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="What do you need to study?"
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            />
            <button 
              onClick={addTask}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg"
            >
              Save Task
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
