import { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { solveWithCamera } from '../services/gemini';

export default function CameraView() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = async () => {
    if (!image) return;
    setIsLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];
      const response = await solveWithCamera(base64Data, mimeType);
      setResult(response);
    } catch (error) {
      console.error(error);
      setResult("দুঃখিত, ছবিটি বিশ্লেষণ করতে সমস্যা হয়েছে। (Sorry, failed to analyze the image.)");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col min-h-screen">
      <div className="space-y-1">
        <h2 className="text-2xl font-black tracking-tight">Camera Solver</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Take a photo of a problem to solve it.</p>
      </div>

      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <Camera className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="font-bold">Capture or Upload</p>
            <p className="text-xs text-slate-400">Click to select a photo</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-auto max-h-80 w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <img src={image} alt="Target" className="w-full h-full object-contain bg-black/5" />
            <button 
              onClick={() => { setImage(null); setResult(null); }}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {!result && !isLoading && (
            <button 
              onClick={handleSolve}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Solve with Sreejib
            </button>
          )}

          {isLoading && (
            <div className="w-full py-8 text-center flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-sm font-medium text-slate-500">Sreejib is analyzing the image...</p>
            </div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Explanation</span>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
