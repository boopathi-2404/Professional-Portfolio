import React from 'react';
import { User, FileText, Code, Mail, Shield, Sparkles, Terminal, Lock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  adminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  isLocked?: boolean;
}

export default function Navbar({ activeTab, setActiveTab, adminMode, setAdminMode, isLocked = false }: NavbarProps) {
  const navItems = [
    { id: 'about', label: 'About Me', icon: User, isSpecial: false },
    { id: 'resume', label: 'Skills & Resume', icon: FileText, isSpecial: false },
    { id: 'projects', label: 'Projects', icon: Code, isSpecial: false },
    { id: 'contact', label: 'Contact', icon: Mail, isSpecial: true }
  ];

  const handleNavClick = (id: string) => {
    if (isLocked) return;
    setAdminMode(false);
    setActiveTab(id);
  };

  return (
    <header className="w-full mb-6 sm:mb-8 select-none print:hidden relative z-30">
      {/* Modern Black Background Container with Glowing Neon Accents */}
      <div className="bg-[#0a0a0d]/95 backdrop-blur-2xl border border-[#383838]/80 hover:border-[#ff8c00]/50 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(255,140,0,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-3.5 transition-all duration-300">
        
        {/* Brand Title: DHARMENTHIRA BOOPATHI */}
        <div className="flex items-center justify-between sm:justify-start gap-3 px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#ff8c00] via-[#ffdb70] to-[#00f0ff] p-0.5 shadow-[0_0_15px_rgba(255,140,0,0.5)] shrink-0">
              <div className="w-full h-full bg-[#0a0a0d] rounded-[10px] flex items-center justify-center text-[#00f0ff]">
                <Terminal className="w-4 h-4 text-[#00f0ff]" />
              </div>
            </div>
            <div>
              <h1 className="text-xs sm:text-sm md:text-base font-black tracking-wider text-white font-mono uppercase bg-gradient-to-r from-white via-[#ffdb70] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                DHARMENTHIRA BOOPATHI
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                {isLocked ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/60 text-[9px] font-mono text-[#ffdb70] font-bold tracking-wider animate-pulse">
                    <Lock className="w-2.5 h-2.5 text-[#ff8c00]" />
                    GATEWAY LOCKED
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#ff8c00] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PORTFOLIO v2026</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Admin Gateway Toggle */}
          <button
            onClick={() => !isLocked && setAdminMode(!adminMode)}
            disabled={isLocked}
            className={`md:hidden px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 border transition-all ${
              isLocked
                ? 'bg-[#121216] text-slate-500 border-slate-800 cursor-not-allowed opacity-50'
                : adminMode
                ? 'bg-[#00f0ff] text-black border-white shadow-[0_0_10px_#00f0ff] cursor-pointer'
                : 'bg-[#18181f] text-[#ffdb70] border-[#383838] hover:border-[#00f0ff] cursor-pointer'
            }`}
            title={isLocked ? "System Locked: Complete Gateway Login" : "Toggle Admin Gateway"}
          >
            <Shield className="w-3 h-3 text-[#00f0ff]" />
            <span>{adminMode ? 'Exit' : 'Admin'}</span>
          </button>
        </div>

        {/* Adaptive Navigation Buttons Row */}
        <nav className="w-full md:w-auto">
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:flex items-center gap-2 sm:gap-2.5 font-sans">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id && !adminMode;
              const isContact = item.isSpecial;

              return (
                <li key={item.id} className="relative group w-full md:w-auto">
                  <button
                    id={`nav-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    disabled={isLocked}
                    className={`w-full md:w-auto relative flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2.5 sm:px-4 rounded-xl text-xs font-bold font-mono transition-all duration-300 select-none ${
                      isLocked
                        ? 'bg-[#101014] text-slate-500 border border-slate-800 opacity-35 cursor-not-allowed pointer-events-none'
                        : isContact
                        ? isActive
                          ? 'bg-gradient-to-r from-[#ff8c00] via-[#ff5500] to-[#00f0ff] text-black shadow-[0_0_25px_rgba(255,140,0,0.8),0_4px_15px_rgba(0,240,255,0.5)] border-2 border-white scale-[1.03] translate-y-[-2px] cursor-pointer'
                          : 'bg-gradient-to-r from-[#ff8c00]/20 via-[#181820] to-[#00f0ff]/20 text-white border-2 border-[#ff8c00] hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(255,140,0,0.6)] hover:-translate-y-1 active:translate-y-0.5 cursor-pointer'
                        : isActive
                        ? 'bg-gradient-to-r from-[#ff8c00] to-[#00f0ff] text-black font-extrabold shadow-[0_0_20px_rgba(255,140,0,0.7)] border border-white scale-[1.02] translate-y-[-2px] cursor-pointer'
                        : 'bg-[#141418] text-[#d6d6d6] hover:text-white border border-[#2a2a35] hover:border-[#ff8c00]/60 hover:bg-[#1f1f26] hover:shadow-[0_6px_20px_rgba(0,0,0,0.8),0_0_12px_rgba(255,140,0,0.3)] hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer'
                    }`}
                    title={isLocked ? "Access Locked: Complete Login First" : item.label}
                  >
                    {isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-amber-500/60 shrink-0" />
                    ) : (
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive 
                          ? 'text-black' 
                          : isContact 
                          ? 'text-[#ff8c00] group-hover:text-[#00f0ff]' 
                          : 'text-[#ffdb70]'
                      }`} />
                    )}
                    <span className="whitespace-nowrap tracking-tight">{item.label}</span>

                    {/* Active Sparkle Glow */}
                    {isActive && !isLocked && (
                      <Sparkles className="w-3 h-3 text-black animate-spin-slow shrink-0 hidden sm:inline-block" />
                    )}
                  </button>
                </li>
              );
            })}

            {/* Desktop Admin Gateway Toggle */}
            <li className="hidden md:block relative group ml-1">
              <button
                id="nav-btn-admin-desktop"
                onClick={() => !isLocked && setAdminMode(!adminMode)}
                disabled={isLocked}
                className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold font-mono transition-all duration-300 ${
                  isLocked
                    ? 'bg-[#101014] text-slate-500 border border-slate-800 opacity-40 cursor-not-allowed pointer-events-none'
                    : adminMode
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#ff8c00] text-black shadow-[0_0_20px_rgba(0,240,255,0.8)] border border-white cursor-pointer'
                    : 'bg-[#18181f] text-[#ffdb70] border border-[#383838] hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:-translate-y-0.5 cursor-pointer'
                }`}
                title={isLocked ? "System Locked: Complete Gateway Login" : "Toggle Cyber Admin Gateway"}
              >
                {isLocked ? (
                  <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                )}
                <span>Admin</span>
              </button>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}
