"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import NavHeader from '@/components/NavHeader';
import { Send, Skull, Terminal, Sparkles, Wallet, Play, Shield, Activity, Cpu, Zap, Wifi, Database } from 'lucide-react';
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

const DEADPOOL_RESPONSES = [
    "Maximum effort! 💪 What else you got?",
    "Chimichangas! Now that's what I call a question!",
    "You're making the voices in my head very happy right now.",
    "Fourth wall? What fourth wall? I'm just talking to my buddy here!",
    "I'd tell you a joke but my therapist says I need to work on my delivery.",
    "Francis! Oh wait, wrong person. What were we talking about?",
    "This is exactly what I'd expect from someone with excellent taste!",
];

const HACKER_RESPONSES = [
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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        const welcomeMessage: Message = {
            id: '1',
            text:
                themeName === 'deadpool'
                    ? `Hey there, ${user?.teamName || 'friend'}! Ready for some maximum effort conversations? 🎭`
                    : `Welcome, ${user?.teamName || 'user'}. Terminal initialized. Ready to process your queries. 💻`,
            isUser: false,
            timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
    }, [themeName, user?.teamName]);

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
                themeName === 'deadpool' ? DEADPOOL_RESPONSES : HACKER_RESPONSES;
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

            <div className="flex-1 overflow-y-auto custom-scrollbar h-[calc(100vh-64px)] relative">
                {/* Sticky Header Portion */}
                <div
                    className="sticky top-0 z-30 flex-shrink-0 backdrop-blur-xl border-b"
                    style={{ backgroundColor: `${theme.background}D0`, borderColor: theme.surfaceLight }}
                >
                    {/* Hero Stats Area */}
                    <div className="px-5 pt-2 pb-4">
                        {/* Glow Circle */}
                        <div
                            className="absolute top-[-80px] left-[-40px] w-[260px] h-[260px] rounded-full opacity-25 pointer-events-none"
                            style={{ backgroundColor: theme.glow }}
                        />

                        <div className="flex flex-row justify-between items-center mb-3">
                            <div
                                className="flex flex-row items-center px-4 py-2.5 rounded-2xl border bg-opacity-50 backdrop-blur-sm"
                                style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                            >
                                <div className="w-8 h-8 rounded-full flex justify-center items-center mr-2.5" >
                                    <Wallet color={theme.primary} size={18} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-semibold tracking-wider block" style={{ color: theme.textSecondary }}>
                                        {themeName === 'deadpool' ? 'MAXIMUM BALANCE' : 'CREDITS'}
                                    </span>
                                    <span className="text-lg font-extrabold" style={{ color: theme.primary }}>
                                        $1,250,500
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-row gap-2">
                                <div
                                    className="w-9 h-9 rounded-full border flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                                >
                                    <Play color={theme.primary} size={16} />
                                </div>
                                <div
                                    className="w-9 h-9 rounded-full border flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                                >
                                    <Terminal color={theme.primary} size={16} />
                                </div>
                                <div
                                    className="w-9 h-9 rounded-full border flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                                >
                                    <Activity color={theme.primary} size={16} />
                                </div>
                                <div
                                    className="w-9 h-9 rounded-full border flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                                >
                                    <Database color={theme.primary} size={16} />
                                </div>
                            </div>
                        </div>

                        <div
                            className="mt-1 px-4 py-3 rounded-2xl border"
                            style={{ backgroundColor: theme.surface, borderColor: theme.surfaceLight }}
                        >
                            <div className="flex flex-row justify-between items-center mb-1.5">
                                <span className="text-sm font-bold" style={{ color: theme.text }}>
                                    {themeName === 'deadpool' ? 'Deadpool AI' : 'Hacker Bot'}
                                </span>
                                <span className="text-[11px] font-semibold" style={{ color: theme.primary }}>
                                    {isTyping ? 'Typing…' : 'Online'}
                                </span>
                            </div>
                            <p className="text-[13px] leading-[18px]" style={{ color: theme.text }}>
                                {themeName === 'deadpool'
                                    ? `Welcome, ${user?.teamName || 'friend'}. Time for maximum effort.`
                                    : `Welcome, ${user?.teamName || 'user'}. Terminal initialized. Ready to process your queries. 🖥️`}
                            </p>
                        </div>
                    </div>

                    {/* Chat Area Header */}
                    <div className="flex flex-row justify-between items-center px-5 py-3 border-b" style={{ borderColor: theme.surfaceLight }}>
                        <div className="flex flex-row items-center gap-3">
                            {themeName === 'deadpool' ? (
                                <Skull color={theme.primary} size={24} />
                            ) : (
                                <Terminal color={theme.primary} size={24} />
                            )}
                            <div>
                                <div className="text-base font-bold" style={{ color: theme.text }}>
                                    {themeName === 'deadpool' ? 'Deadpool AI' : 'Hacker Bot'}
                                </div>
                                <div className="text-xs font-medium" style={{ color: theme.primary }}>
                                    {isTyping ? 'Typing...' : 'Online'}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Sparkles color={theme.primary} size={20} />
                            <Zap color={theme.primary} size={18} />
                            <Wifi color={theme.primary} size={18} />
                        </div>
                    </div>
                </div>

                {/* Message List Area */}
                <div className="px-4 py-4 min-h-[50vh]">
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
                                {themeName === 'deadpool' ? '🎭 Deadpool is typing...' : '💻 Processing...'}
                            </span>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Sticky Input Area */}
                <div
                    className="sticky bottom-0 px-4 py-3 border-t gap-3 flex flex-row items-end backdrop-blur-xl z-30"
                    style={{ backgroundColor: `${theme.surface}F0`, borderTopColor: theme.surfaceLight }}
                >
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        placeholder={themeName === 'deadpool' ? 'Say something witty...' : 'Enter command...'}
                        className="flex-1 min-h-[44px] max-h-[100px] px-3 py-2.5 rounded-[22px] outline-none text-[14px] resize-none overflow-hidden"
                        style={{ backgroundColor: theme.inputBg, color: theme.text }}
                        rows={1}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!inputText.trim()}
                        className="w-[44px] h-[44px] rounded-full flex justify-center items-center transition-opacity hover:opacity-80 disabled:opacity-50"
                        style={{ backgroundColor: inputText.trim() ? theme.primary : theme.surfaceLight }}
                    >
                        <Send color={inputText.trim() ? theme.buttonText : theme.textSecondary} size={20} />
                    </button>
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
                "max-w-[70%] px-3 py-2 rounded-xl my-1 relative",
                isUser ? "self-end rounded-br-sm ml-auto" : "self-start rounded-bl-sm mr-auto"
            )}
            style={{ backgroundColor: isUser ? theme.chatBubbleUser : theme.chatBubbleBot }}
        >
            <p className="text-[14px] leading-[20px]" style={{ color: isUser ? theme.buttonText : theme.text }}>
                {message.text}
            </p>
            <div
                className="text-[10px] mt-1 text-right"
                style={{ color: isUser ? 'rgba(255,255,255,0.7)' : theme.textSecondary }}
            >
                {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </div>
        </motion.div>
    );
}
