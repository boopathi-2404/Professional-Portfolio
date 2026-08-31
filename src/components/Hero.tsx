import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, Github, Linkedin, Twitter, Sparkles, Send } from 'lucide-react';
import { ProfileInfo } from '../types';

interface HeroProps {
  profile: ProfileInfo;
  setActiveTab: (tab: string) => void;
}

export default function Hero({ profile, setActiveTab }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full-Stack Web Architect",
    "Autonomous AI Integrator",
    "Cloud DevOps Specialist",
    "Problem Solver & Tech Artisan"
  ];

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Wait before deleting
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 500;
    }

    const timer = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentRole.substring(0, charIndex - 1)
          : currentRole.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => (prev + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 flex items-center min-h-[calc(100vh-4rem)]">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-left duration-700">
            {/* Tag badge */}
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-950 border border-indigo-800 rounded-full text-indigo-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Available for Selective Client Work</span>
            </div>

            {/* Typography paired display headings */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">{profile.name}</span>
              </h1>
              
              <div className="h-10 text-xl sm:text-2xl font-mono text-indigo-300 flex items-center">
                <span>{typedText}</span>
                <span className="w-2 h-6 bg-indigo-400 ml-1 animate-ping" />
              </div>
            </div>

            {/* Biography */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-sans">
              {profile.bio}
            </p>

            {/* CTA controls */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-cta-projects"
                onClick={() => setActiveTab('projects')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/20 active:translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              
              <button
                id="hero-cta-contact"
                onClick={() => setActiveTab('contact')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-medium hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                Let's Connect
              </button>
            </div>

            {/* Social profiles */}
            <div className="flex items-center space-x-6 pt-6 border-t border-slate-800">
              <span className="text-xs font-mono tracking-wider text-slate-500 uppercase">PROFILES:</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" title="GitHub">
                <Github className="w-6 h-6" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" title="Twitter/X">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Profile Photo display with glowing ambient effect */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-in fade-in slide-in-from-right duration-700 delay-200">
            <div className="relative group">
              {/* Outer decorative glowing elements matching the aesthetic */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-xl group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-2xl">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-xl object-cover border border-slate-700 shadow-inner"
                  />
                ) : (
                  <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 rounded-xl bg-gradient-to-br from-[#18181e] via-[#101014] to-[#0a0a0c] border border-[#ff8c00]/40 flex flex-col items-center justify-center p-6 text-center shadow-inner relative overflow-hidden">
                    <div className="w-20 h-20 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff] flex items-center justify-center text-[#00f0ff] mb-4 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                      <span className="text-3xl font-black font-mono">DB</span>
                    </div>
                    <h3 className="text-lg font-black text-white font-mono uppercase tracking-wider">{profile.name}</h3>
                    <p className="text-xs text-[#ff8c00] font-mono mt-1 font-bold">{profile.title}</p>
                    <div className="mt-4 pt-3 border-t border-[#383838]/60 w-full flex items-center justify-center gap-2 text-[10px] font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SYSTEM OPERATIONAL</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
