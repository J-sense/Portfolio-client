"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Mic,
  MicOff,
  Volume2,
  Rocket,
  Zap,
  Briefcase,
  Mail,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { icon: Rocket, label: "Top Projects", query: "What are Jishan's key projects?" },
  { icon: Zap, label: "Tech Stack", query: "What technical skills does Jishan have?" },
  { icon: Briefcase, label: "Experience", query: "Tell me about Jishan's background and experience." },
  { icon: Mail, label: "Contact Info", query: "How can I get in touch with Jishan?" },
];

const INITIAL_WELCOME: Message = {
  id: "welcome-0",
  role: "assistant",
  content:
    "Hi there! 👋 I'm **JishAI**. Ask me anything about Jishan's projects, technical skills, or experience!",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Clean up voice synthesis
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text to Speech
  const toggleSpeech = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking && activeSpeechId === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`~]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpeechId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveSpeechId(null);
    };

    setIsSpeaking(true);
    setActiveSpeechId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Voice Input (Speech to text)
  const toggleVoiceInput = () => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Send message to API
  const handleSendMessage = async (customQuery?: string) => {
    const query = (customQuery || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed response from server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: accumulatedText } : msg
          )
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        console.log("Stream stopped");
      } else {
        console.error("AI Error:", err);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  content: "Sorry, I couldn't reach the server. Please try again.",
                }
              : msg
          )
        );
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const stopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleClearChat = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    stopGenerating();
    setMessages([INITIAL_WELCOME]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Elegant Formatted Markdown helper
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-bold text-[#38bdf8]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1">
            <span className="text-[#38bdf8] font-bold">•</span>
            <span>{renderedParts}</span>
          </div>
        );
      }

      return (
        <React.Fragment key={lineIdx}>
          {renderedParts}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          />

          {/* Elegant Floating Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            className="fixed z-50 bottom-4 right-4 left-4 md:left-auto md:right-8 md:bottom-24 w-auto md:w-[400px] h-[580px] max-h-[85vh] bg-[#0c0e17]/95 border border-[#233147]/80 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#e2e8f0]"
          >
            {/* --- HEADER --- */}
            <div className="p-4 border-b border-[#1e293b]/70 bg-[#101422]/80 flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                {/* Modern AI Icon Badge */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#0284c7] p-0.5 flex items-center justify-center shadow-lg shadow-[#38bdf8]/20">
                  <div className="w-full h-full bg-[#0c0e17] rounded-full flex items-center justify-center">
                    <Sparkles size={18} className="text-[#38bdf8]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    JishAI
                  </h3>
                  <p className="text-[10px] text-[#94a3b8]">
                    Portfolio Copilot
                  </p>
                </div>
              </div>

              {/* Minimal Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-2 rounded-xl text-[#94a3b8] hover:text-[#ef4444] hover:bg-white/5 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={onClose}
                  title="Close chat"
                  className="p-2 rounded-xl text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* --- MESSAGES STREAM AREA --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => {
                const isUser = msg.role === "user";

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-[#101422] border border-[#38bdf8]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles size={12} className="text-[#38bdf8]" />
                      </div>
                    )}

                    <div
                      className={`relative max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                        isUser
                          ? "bg-[#38bdf8] text-[#05060a] font-semibold rounded-tr-none shadow-md"
                          : "bg-[#141927] border border-[#233147]/80 text-[#e2e8f0] rounded-tl-none shadow-sm"
                      }`}
                    >
                      {/* Message Content */}
                      <div className="whitespace-pre-wrap break-words">
                        {msg.content ? (
                          renderFormattedText(msg.content)
                        ) : (
                          <div className="flex items-center gap-2 text-[#94a3b8]">
                            <RefreshCw size={13} className="animate-spin text-[#38bdf8]" />
                            <span>Thinking...</span>
                          </div>
                        )}
                      </div>

                      {/* Footer Toolbar */}
                      <div
                        className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t ${
                          isUser
                            ? "border-black/10 text-black/60 text-[9px]"
                            : "border-[#1e293b] text-[#64748b] text-[9px]"
                        }`}
                      >
                        <span>{msg.timestamp}</span>

                        {!isUser && msg.content && (
                          <div className="flex items-center gap-2">
                            {/* Read Aloud */}
                            <button
                              onClick={() => toggleSpeech(msg.id, msg.content)}
                              className="hover:text-[#38bdf8] transition-colors flex items-center gap-1"
                              title="Listen"
                            >
                              <Volume2 size={11} className={isSpeaking && activeSpeechId === msg.id ? "text-[#38bdf8]" : ""} />
                              <span>{isSpeaking && activeSpeechId === msg.id ? "Speaking..." : "Listen"}</span>
                            </button>

                            {/* Copy */}
                            <button
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="hover:text-white transition-colors flex items-center gap-1"
                              title="Copy"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check size={11} className="text-[#22c55e]" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={11} /> Copy
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* --- ELEGANT SUGGESTED PROMPTS --- */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-4 pb-2 select-none">
                <div className="flex gap-1.5 overflow-x-auto py-1">
                  {QUICK_PROMPTS.map((p) => {
                    const IconComponent = p.icon;
                    return (
                      <button
                        key={p.label}
                        onClick={() => handleSendMessage(p.query)}
                        className="shrink-0 text-[11px] font-medium bg-[#141927] hover:bg-[#38bdf8]/15 border border-[#233147] hover:border-[#38bdf8]/60 text-[#cbd5e1] hover:text-[#38bdf8] px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5"
                      >
                        <IconComponent size={13} className="text-[#38bdf8]" />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --- MINIMALIST INPUT BAR --- */}
            <div className="p-3 border-t border-[#1e293b] bg-[#0c0e17]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 relative"
              >
                {/* Voice Input Mic */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  title="Voice input"
                  className={`p-2 rounded-full transition-colors ${
                    isListening
                      ? "text-[#ef4444] bg-[#ef4444]/10"
                      : "text-[#94a3b8] hover:text-[#38bdf8]"
                  }`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>

                {/* Text Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask JishAI anything..."
                  disabled={isLoading}
                  className="flex-1 bg-[#141927] border border-[#233147] focus:border-[#38bdf8] rounded-full py-2.5 pl-4 pr-10 text-xs text-white placeholder-[#64748b] focus:outline-none transition-all disabled:opacity-50"
                />

                {/* Send / Stop Button */}
                {isLoading ? (
                  <button
                    type="button"
                    onClick={stopGenerating}
                    className="absolute right-2 p-1.5 rounded-full bg-[#ef4444] text-white hover:bg-[#dc2626] transition-colors"
                    title="Stop generation"
                  >
                    <div className="w-2 h-2 bg-white rounded-sm" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-2 p-1.5 rounded-full bg-[#38bdf8] hover:bg-[#0284c7] text-[#05060a] disabled:opacity-30 transition-all"
                  >
                    <Send size={13} />
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
