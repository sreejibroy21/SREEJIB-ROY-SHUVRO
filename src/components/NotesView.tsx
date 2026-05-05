import { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Trash2, 
  Folder, 
  ChevronRight,
  Clock,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  date: string;
}

export default function NotesView() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Calculus Derivatives', content: 'D(sin x) = cos x...', subject: 'Math', date: '2024-05-20' },
    { id: '2', title: 'Animal Kingdom', content: 'Classification of species...', subject: 'Biology', date: '2024-05-18' },
    { id: '3', title: 'Periodic Table', content: 'Groups and periods...', subject: 'Chemistry', date: '2024-05-15' },
  ]);
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const subjects = Array.from(new Set(notes.map(n => n.subject)));

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight">My Notes</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Quick reference for study.</p>
        </div>
        <button className="p-2 bg-blue-600 text-white rounded-full shadow-lg">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 flex items-center shadow-sm">
        <div className="p-2 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input 
          placeholder="Search notes or subjects..."
          className="bg-transparent border-none focus:ring-0 flex-1 text-sm font-medium py-2 px-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Subjects Horizontal List */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setSearch('')}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
            search === '' ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500"
          )}
        >
          All
        </button>
        {subjects.map(sub => (
          <button 
            key={sub}
            onClick={() => setSearch(sub)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
              search === sub ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500"
            )}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <motion.div 
            layoutId={note.id}
            onClick={() => setSelectedNote(note)}
            key={note.id} 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest px-2 py-0.5 rounded">
                {note.subject}
              </span>
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {note.date}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{note.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{note.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Note Detail Modal */}
      <AnimatePresence>
        {selectedNote && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNote(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            />
            <motion.div 
              layoutId={selectedNote.id}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden flex flex-col max-h-[80vh] shadow-2xl"
            >
              <div className="p-8 space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {selectedNote.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-full"><Trash2 className="w-5 h-5 text-red-500" /></button>
                    <button onClick={() => setSelectedNote(null)} className="p-2 hover:bg-slate-100 rounded-full">Close</button>
                  </div>
                </div>
                <h2 className="text-3xl font-black">{selectedNote.title}</h2>
                <div className="prose prose-sm dark:prose-invert">
                  {selectedNote.content}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
