"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import NavHeader from '@/components/NavHeader';
import { Send, Skull, Terminal, Sparkles, Wallet, Play, Shield, Activity, Cpu, Zap, Wifi, Database, ChevronUp, ChevronDown, CheckCheck } from 'lucide-react';
import FallingAnimations from '@/components/FallingAnimations';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ThemeType } from '@/constants/themes';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const RED_HACKER_RESPONSES = [
    "System override confirmed. What's our next target?",
    "Data encryption protocol initiated. Stay secure.",
    "Bypassing mainframe... I'm in. Ask away.",
    "Kernel access granted. Ready for high-level commands.",
    "Analyzing packet headers... No threats detected.",
    "Executing silent subroutine. Efficiency is key.",
    "Connection optimized. Let's start the hunt.",
];

const GREEN_HACKER_RESPONSES = [
    "Processing query... Access granted. 🖥️",
    "Analyzing data streams... Interesting pattern detected.",
    "Firewall bypassed. Information retrieved successfully.",
    "Running decryption algorithm... Message decoded.",
    "Scanning network nodes... Connection established.",
    "Executing subroutine... Task completed efficiently.",
    "Data packet received. Initiating response protocol.",
];

export default function ChatScreen() {
    const { theme, themeName } = useTheme();
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [showScrollUp, setShowScrollUp] = useState(false);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/');
        }
    }, [isAuthenticated, router]);

    // Load messages from localStorage on mount or when user changes
    useEffect(() => {
        if (!user?.teamName) return;

        const storageKey = `chat_messages_${user.teamName}`;
        const storedMessages = localStorage.getItem(storageKey);

        if (storedMessages) {
            try {
                const parsed = JSON.parse(storedMessages);
                const hydratedMessages = parsed.map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
                setMessages(hydratedMessages);
            } catch (err) {
                console.error("Failed to parse stored messages:", err);
            }
        } else {
            setMessages([]); // Clear messages if none found for this user
        }
        setIsInitialized(true);
    }, [user?.teamName]);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (isInitialized && user?.teamName && messages.length > 0) {
            const storageKey = `chat_messages_${user.teamName}`;
            localStorage.setItem(storageKey, JSON.stringify(messages));
        }
    }, [messages, isInitialized, user?.teamName]);

    // Add welcome message if session is empty and just initialized
    useEffect(() => {
        if (isInitialized && messages.length === 0) {
            const welcomeMessage: Message = {
                id: '1',
                text:
                    themeName === 'hacker'
                        ? `Welcome to the Red Node, ${user?.teamName || 'operative'}. Terminal ready for override.`
                        : `Welcome to the Green Node, ${user?.teamName || 'operative'}. Secure link established. Ready to process.`,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages([welcomeMessage]);
        }
    }, [isInitialized, themeName, user?.teamName]);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        setShowScrollUp(scrollTop > 100);
        setShowScrollDown(distanceFromBottom > 50);
    };

    const scrollToTop = () => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);


    const sendMessage = () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 500);

        setTimeout(() => {
            const responses =
                themeName === 'hacker' ? RED_HACKER_RESPONSES : GREEN_HACKER_RESPONSES;
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                isUser: false,
                timestamp: new Date(),
            };

            setIsTyping(false);
            setMessages((prev) => [...prev, botMessage]);
        }, 1500);
    };

    return (
        <AnimatedBackground>
            <FallingAnimations trigger={showAnimation} color={theme.primary} />
            <NavHeader showAuthButtons={false} />

            <div className="flex-1 flex flex-col overflow-hidden w-full relative">
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto custom-scrollbar relative"
                    style={{ paddingBottom: '70px' }}
                >
                    {/* Sticky Header Portion */}
                    <div
                        className="sticky top-0 z-30 flex-shrink-0 backdrop-blur-xl border-b"
                        style={{ backgroundColor: `${theme.background}D0`, borderColor: theme.surfaceLight }}
                    >
                        {/* Hero Stats Area */}
                        <div className="px-4 pt-2 pb-3">
                            {/* Glow Circle */}
                            <div
                                className="absolute top-[-80px] left-[-40px] w-[260px] h-[260px] rounded-full opacity-25 pointer-events-none"
                                style={{ backgroundColor: theme.glow }}
                            />

                            <div className="flex flex-row justify-between items-center mb-2">
                                <div
                                    className="flex flex-row items-center px-3 py-2 rounded-2xl border bg-opacity-50 backdrop-blur-sm"
                                    style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                                >
                                    <div className="w-7 h-7 rounded-full flex justify-center items-center mr-2" >
                                        <Wallet color={theme.primary} size={16} />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-semibold tracking-wider block" style={{ color: theme.textSecondary }}>
                                            {themeName === 'hacker' ? 'TOTAL BYTES' : 'CREDITS'}
                                        </span>
                                        <span className="text-base font-extrabold" style={{ color: theme.primary }}>
                                            1,250,500
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-1.5">
                                    <div
                                        className="w-8 h-8 rounded-full border flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
                                        style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                                    >
                                        <Play color={theme.primary} size={14} />
                                    </div>
                                    <div
                                        className="w-8 h-8 rounded-full border flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
                                        style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                                    >
                                        <Terminal color={theme.primary} size={14} />
                                    </div>
                                    <div
                                        className="w-8 h-8 rounded-full border flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
                                        style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                                    >
                                        <Activity color={theme.primary} size={14} />
                                    </div>
                                    <div
                                        className="w-8 h-8 rounded-full border flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
                                        style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                                    >
                                        <Database color={theme.primary} size={14} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Message List Area */}
                    <div className="px-3 py-3 flex flex-col pb-4">
                        {messages.map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                isUser={msg.isUser}
                                theme={theme}
                            />
                        ))}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-4 px-4 py-2 rounded-xl self-start inline-block"
                                style={{ backgroundColor: theme.surface }}
                            >
                                <span className="text-xs italic" style={{ color: theme.textSecondary }}>
                                    {themeName === 'hacker' ? '🔴 Hacker is typing...' : '🟢 Hacker is processing...'}
                                </span>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Fixed Input Area - WhatsApp-inspired design */}
                <div
                    className="fixed bottom-0 left-0 right-0 px-3 py-2 backdrop-blur-xl z-40 shadow-lg"
                    style={{
                        backgroundColor: `${theme.background}FA`,
                        borderTop: `1px solid ${theme.surfaceLight}40`
                    }}
                >
                    <div className="flex flex-row items-end gap-2 max-w-4xl mx-auto">
                        <div className="flex-1 relative">
                            <textarea
                                value={inputText}
                                onFocus={() => {
                                    // Scroll to bottom when input is focused
                                    setTimeout(() => {
                                        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                onChange={(e) => {
                                    setInputText(e.target.value);
                                    // Auto-resize textarea
                                    e.target.style.height = 'auto';
                                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                        // Reset height after sending
                                        e.currentTarget.style.height = '42px';
                                    }
                                }}
                                placeholder={themeName === 'hacker' ? 'Type a message...' : 'Message...'}
                                className="w-full px-4 py-2.5 rounded-3xl outline-none text-[15px] resize-none overflow-y-auto leading-[1.4] transition-all"
                                style={{
                                    backgroundColor: theme.surface,
                                    color: theme.text,
                                    border: 'none',
                                    minHeight: '42px',
                                    maxHeight: '120px',
                                    height: '42px',
                                    boxShadow: `0 1px 2px ${theme.primary}08`
                                }}
                                rows={1}
                            />
                        </div>
                        <button
                            onClick={() => {
                                sendMessage();
                                // Reset textarea height
                                const textarea = document.querySelector('textarea');
                                if (textarea) textarea.style.height = '42px';
                            }}
                            disabled={!inputText.trim()}
                            className="w-[42px] h-[42px] rounded-full flex justify-center items-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 mb-0.5"
                            style={{
                                backgroundColor: inputText.trim() ? theme.primary : theme.surfaceLight,
                                boxShadow: inputText.trim() ? `0 2px 8px ${theme.primary}30` : 'none'
                            }}
                        >
                            <Send color={inputText.trim() ? theme.buttonText : theme.textSecondary} size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </AnimatedBackground>
    );
}

function MessageBubble({
    message,
    isUser,
    theme,
}: {
    message: Message;
    isUser: boolean;
    theme: ThemeType;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: isUser ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={clsx(
                "max-w-[85%] w-fit px-3 pt-2 pb-1.5 rounded-2xl my-1 relative backdrop-blur-md border border-opacity-30",
                isUser ? "self-end rounded-tr-none ml-auto" : "self-start rounded-tl-none mr-auto"
            )}
            style={{
                backgroundColor: isUser ? theme.chatBubbleUser : theme.chatBubbleBot,
                borderColor: theme.primary,
                boxShadow: isUser ? `0 0 15px ${theme.primary}20` : 'none'
            }}
        >
            {/* WhatsApp Tone Tail */}
            <div
                className={clsx(
                    "absolute top-0 w-0 h-0 border-t-[10px] border-t-transparent",
                    isUser
                        ? "right-[-8px] border-l-[10px]"
                        : "left-[-8px] border-r-[10px]"
                )}
                style={{
                    borderLeftColor: isUser ? theme.chatBubbleUser : 'transparent',
                    borderRightColor: !isUser ? theme.chatBubbleBot : 'transparent',
                    opacity: 0.8
                }}
            />

            <div className="flex flex-col min-w-[50px]">
                <p className="text-[14px] leading-[20px] font-medium pr-10" style={{ color: theme.text }}>
                    {message.text}
                </p>

                <div className="flex flex-row items-center justify-end gap-1 mt-0.5 self-end">
                    <span
                        className="text-[10px] opacity-70"
                        style={{ color: theme.text }}
                    >
                        {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        }).toLowerCase()}
                    </span>
                    {isUser && (
                        <CheckCheck size={14} className="opacity-80" style={{ color: theme.primary }} />
                    )}
                </div>
            </div>
        </motion.div>
    );
}
