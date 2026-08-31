import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot, CornerDownLeft } from 'lucide-react';
import { PortfolioData } from '../store';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

interface ChatbotProps {
  portfolioData: PortfolioData;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Chatbot({ portfolioData, isOpen, setIsOpen }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am BOOPATHI, Dharmenthira Boopathi's AI portfolio assistant. Ask me about my 1 year of experience in computer science, my 5 MathWorks training credentials, or our featured Noval Reading web system!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionPills = [
    { label: "What are your core skills?", query: "Could you list and describe your primary technical programming skills and proficiency levels?" },
    { label: "Tell me about Noval Reading", query: "Can you tell me about the Noval Reading portal? What is the live URL and core features?" },
    { label: "View MathWorks Certificates", query: "Show me a detailed breakdown of your MathWorks coursework achievements!" },
    { label: "Current experience level?", query: "Tell me about your current location and engineering experience duration." }
  ];

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          portfolioData: portfolioData
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          id: 'reply-' + Date.now(),
          sender: 'assistant',
          text: data.reply
        }]);
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrorMsg(errData.error || "Failed to retrieve a reply from the assistant.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Connection error. Ensure your server is running and GEMINI_API_KEY is configured.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        id="floating-assistant-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-1 bg-[#ffdb70] hover:bg-[#ffd350] hover:scale-105 text-[#121212] rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer border-2 border-[#ffdb70] group"
        title="Open AI Portfolio Assistant"
      >
        {isOpen ? (
          <div className="w-12 h-12 rounded-full bg-[#1e1e1f] flex items-center justify-center text-[#ffdb70]">
            <X className="w-6 h-6" />
          </div>
        ) : (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#ff8c00] bg-[#121216] flex items-center justify-center text-[#ff8c00] shadow-[0_0_15px_rgba(255,140,0,0.4)]">
            <Bot className="w-6 h-6 text-[#ff8c00]" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121212]" />
          </div>
        )}
      </button>

      {/* Slide-out Converse Panel Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm sm:max-w-md bg-[#1e1e1f] border border-[#383838] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[540px] max-h-[82vh] animate-fade-in">
          
          {/* Header with Profile View and Credentials Attachment in Side Corner */}
          <div className="bg-[#121212] px-4 py-3 flex items-center justify-between border-b border-[#383838] shrink-0">
            <div className="flex items-center space-x-2.5">
              {/* Profile View in Side Corner */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-[#ffdb70] bg-[#2b2b2c] flex items-center justify-center text-[#ffdb70] shadow-md">
                  <Bot className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#121212] animate-ping" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#121212]" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-[#fafafa] flex items-center gap-1.5">
                  BOOPATHI
                  <span className="px-1.5 py-0.5 bg-[#2b2b2c] text-[#ffdb70] border border-[#383838] font-mono text-[8px] font-bold uppercase rounded">AI Agent</span>
                </h4>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Dharmenthira's Assistant</span>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              {/* Collapsible certificates attachment toggle button */}
              <button
                id="chatbot-attachments-toggle-btn"
                onClick={() => setShowAttachments(!showAttachments)}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-lg border font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                  showAttachments 
                    ? 'bg-[#ffdb70] border-[#ffd350] text-[#121212] shadow-md shadow-[#ffdb70]/10' 
                    : 'bg-[#2b2b2c] border-[#383838] text-[#d6d6d6] hover:border-[#ffdb70]/20'
                }`}
                title="View Attachments & Credentials"
              >
                <span>📎</span>
                <span className="hidden sm:inline">Credentials</span>
                <span className="font-bold">({portfolioData.achievements.length})</span>
              </button>

              <button
                id="close-chatbot-btn"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-[#2b2b2c]"
              >
                <X className="w-5 h-5 text-[#ffdb70]" />
              </button>
            </div>
          </div>

          {/* Collapsible Attachments Drawer Overlay (Slide-over inside chat) */}
          {showAttachments && (
            <div className="absolute inset-x-0 top-[61px] bottom-0 bg-[#121212]/95 z-30 flex flex-col animate-fade-in">
              <div className="p-4 border-b border-[#383838] flex items-center justify-between bg-[#1e1e1f]">
                <span className="text-xs font-bold font-mono uppercase text-[#ffdb70] flex items-center">
                  📂 Attached Training Credentials
                </span>
                <button
                  onClick={() => setShowAttachments(false)}
                  className="text-xs font-mono text-red-400 hover:underline cursor-pointer"
                >
                  Close [x]
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <p className="text-[11px] text-[#d6d6d6] leading-relaxed font-sans mb-1 bg-[#2b2b2c]/40 border border-[#383838] p-2.5 rounded-lg text-left">
                  Below are the <strong>5 MathWorks Course Completion Certificates</strong> and awards successfully cataloged to Dharmenthira's portfolio credentials profile:
                </p>

                {portfolioData.achievements.map((ach) => (
                  <div key={ach.id} className="p-3 bg-[#1e1e1f] border border-[#383838] rounded-xl space-y-1.5 hover:border-[#ffdb70]/30 transition-all text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-base">{ach.badgeUrl}</span>
                      <span className="text-[9px] font-mono text-slate-500">{ach.date}</span>
                    </div>
                    <h5 className="font-bold text-xs text-[#fafafa]">{ach.title}</h5>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-mono">{ach.organization}</p>
                    <p className="text-[10.5px] text-[#d6d6d6] leading-relaxed">{ach.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conversation History Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#121212]/40 leading-relaxed text-slate-200">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#ffdb70] text-[#121212] rounded-tr-none font-medium'
                      : 'bg-[#121212] border border-[#383838] rounded-tl-none text-[#d6d6d6]'
                  }`}
                >
                  {/* Clean formatting for chat message (simple inline lists) */}
                  <div className="whitespace-pre-line prose prose-xs prose-invert text-left">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Thinking Loader */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#121212] border border-[#383838] rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-400 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-[#ffdb70] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#ffdb70] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#ffdb70] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Synthesizing...</span>
                </div>
              </div>
            )}

            {/* Error notifications */}
            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-900/40 rounded-xl flex items-start space-x-2 text-xs text-red-400 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt suggestions row (shown only when idle) */}
          {!loading && (
            <div className="px-4 py-2 bg-[#121212] border-t border-[#383838] shrink-0 text-left">
              <span className="text-[9px] font-mono text-slate-500 block uppercase mb-1 tracking-wider">Suggested Queries:</span>
              <div className="flex space-x-1.5 overflow-x-auto pb-1.5 scrollbar-none select-none">
                {suggestionPills.map((pill, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(pill.query)}
                    className="shrink-0 px-2.5 py-1 bg-[#1e1e1f] hover:bg-[#2b2b2c] border border-[#383838] rounded-full text-[10px] text-[#ffdb70] hover:text-[#ffd350] font-semibold transition-colors cursor-pointer"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form input footer bar */}
          <form onSubmit={handleSubmit} className="p-3 bg-[#121212] border-t border-[#383838] flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Ask me a question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={loading}
              className="flex-1 bg-[#1e1e1f] border border-[#383838] focus:border-[#ffdb70]/50 rounded-xl px-4 py-2 text-xs sm:text-sm text-[#fafafa] focus:outline-none placeholder-slate-600 disabled:opacity-50 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-2.5 bg-[#2b2b2c] hover:bg-[#323233] disabled:bg-[#121212] disabled:text-slate-600 text-[#ffdb70] border border-[#383838] hover:border-[#ffdb70]/30 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
