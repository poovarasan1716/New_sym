"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import NavHeader from '@/components/NavHeader';
import HeroSection from '@/components/HeroSection';
import AnimatedButton from '@/components/AnimatedButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
    const { theme } = useTheme();
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!isLoading && isAuthenticated) {
            router.replace('/chat');
        }
    }, [isAuthenticated, isLoading, router]);

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
            <NavHeader showAuthButtons={true} />

            <main className="flex-1 flex flex-col items-center justify-start md:justify-center w-full px-6 pt-4 pb-10 md:py-6">
                {/* Main Content Animation (Fade-in & Slide-up on mount) */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center w-full max-w-4xl"
                >
                    <HeroSection />

                    {/* CTA Section */}
                    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm mt-6">
                        <AnimatedButton
                            title="ENTER NODE"
                            variant="primary"
                            className="w-full py-4 text-base font-black tracking-widest"
                            onClick={() => router.push('/login')}
                        />
                        {/* <button
                            onClick={() => router.push('/login')}
                            className="w-full py-4 rounded-xl border-2 font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-white/5 active:scale-95"
                            style={{
                                borderColor: theme.primary,
                                color: theme.primary
                            }}
                        >
                            I HAVE AN ACCOUNT
                        </button> */}
                    </div>

                    {/* Footer Branding */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="mt-10 font-mono text-[10px] uppercase tracking-[0.5em] text-white text-center"
                    >
                        SYMPOSIUM :: CHENNAI_NODE
                    </motion.p>
                </motion.div>
            </main>
        </AnimatedBackground>
    );
}
