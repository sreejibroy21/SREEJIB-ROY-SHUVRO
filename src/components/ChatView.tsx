import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { chatWithGemini } from '../services/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "হ্যালো! Hi! আমি শ্রীজীবের স্টাডি হেল্পার। আমি আপনাকে আজ কীভাবে সাহায্য করতে পারি? (I'm Sreejib's Study Helper. How can I help you today?)" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user' as any,
        parts: [{ text: msg.content }]
      }));
      
      const response = await chatWithGemini(userMessage, history);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন। (Sorry, something went wrong. Please try again.)" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Default, but can be switched
    recognition.onstart = () => setIsVoiceActive(true);
    recognition.onend = () => setIsVoiceActive(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  const [isVoiceActive, setIsVoiceActive] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 px-2 pb-4 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={i}
              className={cn(
                "flex w-full group",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm relative",
                msg.role === 'user' 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-none"
              )}>
                <div className="flex items-center gap-1.5 mb-1 opacity-50">
                  {msg.role === 'user' ? (
                    <>
                      <span className="text-[10px] font-bold uppercase tracking-wider">You</span>
                      <User className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      <Bot className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Sreejib Bot</span>
                    </>
                  )}
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:my-1 prose-pre:bg-slate-800 prose-pre:text-blue-300">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-xs font-medium text-slate-500">Sreejib is thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-4 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 shadow-sm">
        <button 
          onClick={handleVoiceInput}
          className={cn(
            "p-2 transition-colors rounded-lg",
            isVoiceActive ? "text-red-500 bg-red-50 animate-pulse" : "text-slate-400 hover:text-blue-600"
          )}
        >
          <Mic className="w-5 h-5" />
        </button>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything (Bengali or English)..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-2 px-1"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
