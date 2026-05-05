import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function chatWithGemini(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  
  // Directly use generateContent for chat-like behavior if maintaining history manually
  // or use the contents array
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
    config: {
      systemInstruction: "You are 'Sreejib's Study Helper', a friendly and smart study assistant. You help students with their questions in both Bengali and English. Give accurate, concise, and helpful explanations. Do not mention you are a Google AI or use 'AI' in your name unless asked. Your name is Sreejib (শ্রীজীব)."
    }
  });

  return response.text || "Sorry, I couldn't generate a response.";
}

export async function solveWithCamera(imageBase64: string, mimeType: string, questionPrompt: string = "Solve this problem and explain it step by step.") {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType
            }
          },
          { text: questionPrompt }
        ]
      }
    ]
  });
  
  return response.text || "Sorry, I couldn't analyze the image.";
}
