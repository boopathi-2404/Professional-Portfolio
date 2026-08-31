import React from 'react';
import { Layout, Globe, Smartphone, Camera, Sparkles, Cpu } from 'lucide-react';
import { ProfileInfo } from '../types';
import { motion } from 'motion/react';

interface AboutProps {
  profile: ProfileInfo;
}

export default function About({ profile }: AboutProps) {
  const services = [
    {
      icon: Layout,
      title: "Web Design & UI/UX",
      desc: "Pixel-perfect, modern interfaces engineered with cyber aesthetic precision and cinematic design layouts.",
      color: "from-[#ff8c00] to-[#ffdb70]"
    },
    {
      icon: Globe,
      title: "Web Development",
      desc: "High-performance full-stack web applications built with TypeScript, React, Vite, and Cloud backend infrastructure.",
      color: "from-[#00f0ff] to-[#3b82f6]"
    },
    {
      icon: Smartphone,
      title: "Mobile Architecture",
      desc: "Cross-platform mobile application layouts and interactive designs optimized for iOS and Android experience.",
      color: "from-[#3b82f6] to-[#00f0ff]"
    },
    {
      icon: Camera,
      title: "Media & Digital Content",
      desc: "Creative visual asset design, high-resolution media editing, and brand storytelling strategies.",
      color: "from-[#ffdb70] to-[#ff8c00]"
    }
  ];

  return (
    <div className="font-sans text-[#d6d6d6] animate-fade-in space-y-12">
      
      {/* Title block with Luminous Cyber Outlines */}
      <header className="mb-8 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff8c00] to-[#00f0ff] p-0.5 shadow-[0_0_15px_rgba(255,140,0,0.5)]">
            <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center text-[#ffdb70]">
              <Cpu className="w-5 h-5 text-[#00f0ff] animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] via-[#ffdb70] to-[#00f0ff]">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c00] to-[#00f0ff] rounded-full mt-1.5 shadow-[0_0_10px_#ff8c00]" />
          </div>
        </div>
      </header>

      {/* Biography Card with Luminous Frame */}
      <section className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#ff8c00]/30 rounded-2xl p-6 sm:p-8 relative shadow-[0_10px_30px_rgba(0,0,0,0.7)] space-y-4">
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#d6d6d6] font-sans">
          {profile.bio.split('\n\n').map((paragraph, index) => (
            <p key={index} className="relative z-10">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* What I'm Doing Section with 3D Pulse Cards */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00f0ff] animate-spin-slow" />
          <h3 className="text-xl font-extrabold text-white uppercase font-sans tracking-wide">What I'm Doing</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-gradient-to-br from-[#1a1a20] to-[#121216] border border-[#ff8c00]/30 hover:border-[#00f0ff] rounded-2xl p-6 flex gap-4 shadow-[0_8px_25px_rgba(0,0,0,0.6)] items-start group transition-all duration-300 relative overflow-hidden"
              >
                {/* Floating particle light in background */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#00f0ff]/10 rounded-full blur-xl group-hover:bg-[#ff8c00]/20 transition-colors" />

                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#22222a] to-[#16161c] border border-[#ff8c00]/40 group-hover:border-[#00f0ff] text-[#ffdb70] group-hover:text-[#00f0ff] flex items-center justify-center shrink-0 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] group-hover:scale-110">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 relative z-10">
                  <h4 className="font-bold text-white text-base group-hover:text-[#ffdb70] transition-colors">{service.title}</h4>
                  <p className="text-xs text-[#b8b8b8] leading-relaxed font-sans">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

