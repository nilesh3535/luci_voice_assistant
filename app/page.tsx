"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Instagram,
  Chrome,
  Code2,
  Volume2,
  Zap,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const AnimatedOrb = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-64 h-64 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan/30 bg-gradient-radial from-cyan/20 to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-4 rounded-full border border-violet/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-8 rounded-full border border-cyan/40"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core orb */}
      <motion.div
        className="relative w-40 h-40 rounded-full bg-gradient-to-br from-cyan via-violet to-cyan shadow-glow-cyan"
        animate={{
          boxShadow: [
            "0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)",
            "0 0 40px rgba(0, 217, 255, 0.8), 0 0 60px rgba(157, 0, 255, 0.5)",
            "0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner light */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20 flex items-center justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Sound wave visualization */}
          <div className="w-24 h-24 flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-gradient-to-t from-cyan to-cyan-light rounded-full"
                initial={{ height: 20 }}
                animate={{ height: [20, 60, 20] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-cyan rounded-full"
            animate={{
              x: Math.cos((i / 6) * Math.PI * 2) * 80,
              y: Math.sin((i / 6) * Math.PI * 2) * 80,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: (i / 6) * 1,
            }}
            style={{
              originX: "50%",
              originY: "50%",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const TerminalAnimation = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Open notepad and write what I am saying";
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <motion.div
      className="glass rounded-xl overflow-hidden max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-charcoal/50 px-6 py-4 border-b border-cyan/20 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-xs text-cyan ml-4">luci.terminal</span>
      </div>
      <div className="px-6 py-6 font-mono text-sm text-cyan-light">
        <div className="mb-2 text-cyan/60">$ luci note</div>
        <div className="flex items-center gap-2">
          <span className="text-cyan">&gt;</span>
          <span>{displayText}</span>
          {isTyping && (
            <motion.span
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              |
            </motion.span>
          )}
        </div>
        {!isTyping && (
          <motion.div
            className="mt-4 text-cyan/60 text-xs space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div>✓ Opening Notepad...</div>
            <div>✓ Listening to your voice...</div>
            <div className="text-cyan">🎤 Writing in real-time</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    className="glass rounded-xl p-6 hover:glass-hover group cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
  >
    <motion.div
      className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan/20 to-violet/20 flex items-center justify-center mb-4 group-hover:shadow-glow-cyan transition-all"
      whileHover={{ scale: 1.1 }}
    >
      <Icon className="w-6 h-6 text-cyan" />
    </motion.div>
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="blur-element blur-cyan w-96 h-96 top-20 -left-48 animate-float" />
        <div
          className="blur-element blur-violet w-96 h-96 bottom-20 -right-48"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan/10 glass-hover">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 relative rounded-full border-2 border-cyan/40 shadow-glow-cyan flex items-center justify-center bg-charcoal/50 overflow-hidden">
              <Image
                src="/luci.png"
                alt="Luci Logo"
                width={60}
                height={60}
                className="w-16 h-16 object-contain rounded-full"
                priority
              />
            </div>
            <span className="text-xl font-bold gradient-text">Luci</span>
          </motion.div>

          <motion.a
            href="https://www.instagram.com/luci_voice_assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">
              @luci_voice_assistant
            </span>
          </motion.a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center relative">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Animated tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Hey Luci,
              </motion.span>
              <br />
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                bolo aur kaam ho jaaye
              </motion.span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              The AI voice assistant built for Windows. Native support for
              Hindi, English & Hinglish. Your voice, your command, your way.
            </motion.p>
          </motion.div>

          {/* Animated Orb */}
          <motion.div
            className="flex justify-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <AnimatedOrb />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  document.getElementById('waitlist-section')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }, 100);
              }}
              className="btn-primary group"
              type="button"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 inline-block ml-2 transition-transform" />
            </button>
            <a
              href="https://www.instagram.com/luci_voice_assistant"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Follow on Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need for voice-powered productivity on Windows
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Volume2}
              title="Multilingual Voice"
              description="Native support for Hindi, English, and Hinglish. Switch languages naturally, mid-sentence."
              delay={0.1}
            />
            <FeatureCard
              icon={Chrome}
              title="Built for Windows"
              description="Deep Windows integration. Control your desktop, launch apps, and automate workflows with voice."
              delay={0.2}
            />
            <FeatureCard
              icon={Code2}
              title="Developer Friendly"
              description="Launch dev servers, run commands, and manage your workflow. Perfect for developers who type."
              delay={0.3}
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Local processing for instant response times. Your privacy matters—no data leaves your machine."
              delay={0.4}
            />
            <FeatureCard
              icon={Mail}
              title="Context Aware"
              description="Luci understands context and learns your patterns. Smarter responses with every command."
              delay={0.5}
            />
            <FeatureCard
              icon={ArrowRight}
              title="Always Ready"
              description="Always-on listening. Just say the wake word and Luci is ready to help, anytime, anywhere."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Terminal Demo Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Voice Commands in Action</span>
            </h2>
            <p className="text-gray-400">
              See how Luci understands and executes your voice commands
              instantly
            </p>
          </motion.div>

          <TerminalAnimation />

          <motion.div
            className="grid md:grid-cols-3 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              { emoji: "🎤", text: "Voice Control" },
              { emoji: "⚡", text: "Instant Execution" },
              { emoji: "🔒", text: "Private & Secure" },
            ].map((item, i) => (
              <div key={i} className="glass rounded-lg p-4">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <p className="text-sm text-cyan">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-20 px-4 relative" id="waitlist-section">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="glass rounded-2xl p-8 md:p-12 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="gradient-text">Coming Soon</span>
              </h2>
              <p className="text-gray-400">
                Be the first to know when Luci launches. Join our exclusive
                waitlist.
              </p>
            </div>

            <iframe
              aria-label="Luci Waitlist"
              frameBorder="0"
              style={{
                height: "500px",
                width: "100%",
                border: "none",
                borderRadius: "8px",
              }}
              src="https://forms.zohopublic.in/lucivoiceassistantzoho1/form/LuciWaitlist/formperma/gQNWEDK2jwrxGYR7gYapS-SQNTSF4roqWUvWTHrWDUI"
            />

            <div className="pt-6 border-t border-cyan/10 flex flex-col sm:flex-row gap-4 items-center justify-center text-sm">
              <span className="text-gray-400">Connect with us:</span>
              <a
                href="https://www.instagram.com/luci_voice_assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors group"
              >
                <Instagram className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                @luci_voice_assistant
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-cyan/10">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Founder Info */}
          <motion.div
            className="text-center space-y-3 pb-6 border-b border-cyan/10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-lg font-semibold text-cyan mb-2">Nilesh Kumbhar</h3>
              <p className="text-sm text-gray-400">Founder & Creator</p>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>📚 M.Sc. Computer Science</p>
              <p>💻 3+ Years Software Engineering Experience</p>
              <p>🤖 2+ Years AI Automation</p>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            © 2026 Luci. Hey Luci, bolo aur kaam ho jaaye.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
