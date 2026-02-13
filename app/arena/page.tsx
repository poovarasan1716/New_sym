"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import NavHeader from '@/components/NavHeader';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArenaPage() {
    const { theme } = useTheme();
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [terminalLines, setTerminalLines] = useState<string[]>([]);
    const [showButton, setShowButton] = useState(false);
    const [mounted, setMounted] = useState(false);

    const fullText1 = "INTELLICONZ";
    const fullText2 = "PROMPT WARS";

    const logLines = [
        "Connecting to secure game server...",
        "Establishing encrypted link...",
        "Team Wallet Loaded: ₹1000",
        "Game Mode: ACTIVE",
        "Aura Level: MAXIMUM",
        "Ready for commands."
    ];

    useEffect(() => {
        setMounted(true);

        // Redirect to login if not authenticated
        if (!isLoading && !isAuthenticated) {
            router.replace('/login');
        }

        // Reset animation state when theme changes
        setText1("");
        setText2("");
        setTerminalLines([]);
        setShowButton(false);

        let currentStage = 1;
        let charIndex = 0;
        let lineIndex = 0;
        let interval: ReturnType<typeof setInterval>;

        const runAnimation = () => {
            interval = setInterval(() => {
                if (currentStage === 1) {
                    if (charIndex < fullText1.length) {
                        setText1(fullText1.slice(0, charIndex + 1));
                        charIndex++;
                    } else {
                        currentStage = 2;
                        charIndex = 0;
                    }
                }
                else if (currentStage === 2) {
                    if (charIndex < fullText2.length) {
                        setText2(fullText2.slice(0, charIndex + 1));
                        charIndex++;
                    } else {
                        currentStage = 3;
                    }
                }
                else if (currentStage === 3) {
                    if (lineIndex < logLines.length) {
                        setTerminalLines(prev => [...prev, logLines[lineIndex]]);
                        lineIndex++;
                    } else {
                        clearInterval(interval);
                        setTimeout(() => setShowButton(true), 800);
                    }
                }
            }, 50);
        };

        runAnimation();

        return () => {
            if (interval) clearInterval(interval);
        };

    }, [theme, isAuthenticated, isLoading, router]);

    if (isLoading || !mounted) {
        return (
            <div
                className="flex flex-1 min-h-screen"
                style={{ backgroundColor: theme.background }}
            />
        );
    }

    return (
        <AnimatedBackground>
            <NavHeader showAuthButtons={false} />

            <div className="flex-1 flex flex-col items-center justify-center w-full px-6 py-12 md:py-20">
                <motion.div
                    key={theme.name}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-3xl px-8 py-10 md:px-12 md:py-14 rounded-[2rem] border bg-[#010409]/85 backdrop-blur-xl overflow-hidden"
                    style={{ borderColor: `${theme.primary}15` }}
                >
                    {/* Header Section */}
                    <div className="w-full mb-10 text-center md:text-left">
                        <h1 className="text-2xl italic font-black leading-tight tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            {text1}
                        </h1>

                        <h2
                            className="flex items-center justify-center mt-2 text-base italic font-bold tracking-wide md:justify-start sm:text-lg md:text-2xl"
                            style={{ color: `${theme.primary}B3` }}
                        >
                            {text2}
                            <span className="inline-block w-1 h-5 ml-3 bg-white md:h-7 animate-pulse" />
                        </h2>
                    </div>

                    {/* Terminal Section */}
                    <div className="font-mono text-[10px] sm:text-xs md:text-sm space-y-3 min-h-[180px] border-l border-white/5 pl-5 md:pl-6">
                        {terminalLines.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ color: theme.primary }}
                                className="flex items-start tracking-tight opacity-80"
                            >
                                <span className="mr-3 font-bold opacity-20">
                                    [{i + 1}]
                                </span>
                                <span className="uppercase break-words">
                                    {line}
                                </span>
                            </motion.p>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center mt-10 h-14 md:mt-12">
                        <AnimatePresence>
                            {showButton && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => router.push('/chat')}
                                    style={{
                                        backgroundColor: theme.buttonBg,
                                        borderColor: `${theme.accent}40`,
                                        color: theme.buttonText,
                                    }}
                                    className="w-full md:w-auto px-16 py-3 rounded-xl font-bold uppercase tracking-[0.2em] border text-xs transition-all"
                                >
                                    ENTER ARENA
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.5em] text-white/20 text-center">
                    SYMPOSIUM :: CHENNAI_NODE
                </p>
            </div>
        </AnimatedBackground>
    );
}
