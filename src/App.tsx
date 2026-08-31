import React, { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Chatbot from './components/Chatbot';
import { usePortfolio } from './store';
import { Mail, Github, Linkedin, Twitter, Facebook, Instagram, Heart, Terminal, Phone, Calendar, MapPin, ChevronDown, Camera, Shield, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TelegramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-2.31 1.49-3.26 2.1-.5.32-.96.48-1.38.47-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.45 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.34z"/>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('about');
  const [adminMode, setAdminMode] = useState<boolean>(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  const isLocked = adminMode && !isAdminAuthenticated;

  const {
    profile,
    skills,
    projects,
    achievements,
    experiences,
    education,
    blogs,
    messages,
    saveProfile,
    saveSkills,
    saveProjects,
    saveBlogs,
    addMessage,
    markMessageRead,
    deleteMessage,
    resetAllData
  } = usePortfolio();

  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) return;
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image file is too large. Please select an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          saveProfile({ ...profile, avatar: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderActiveSection = () => {
    if (adminMode) {
      return (
        <Admin
          profile={profile}
          skills={skills}
          projects={projects}
          blogs={blogs}
          messages={messages}
          saveProfile={saveProfile}
          saveSkills={saveSkills}
          saveProjects={saveProjects}
          saveBlogs={saveBlogs}
          markMessageRead={markMessageRead}
          deleteMessage={deleteMessage}
          resetAllData={resetAllData}
          isAuthenticated={isAdminAuthenticated}
          setIsAuthenticated={setIsAdminAuthenticated}
        />
      );
    }

    switch (activeTab) {
      case 'about':
        return (
          <About
            profile={profile}
          />
        );
      case 'resume':
        return (
          <Resume
            profile={profile}
            experiences={experiences}
            educations={education}
            skills={skills}
            achievements={achievements}
          />
        );
      case 'projects':
        return <Projects projects={projects} />;
      case 'contact':
        return (
          <Contact
            profile={profile}
            addMessage={addMessage}
          />
        );
      default:
        return (
          <About
            profile={profile}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#d6d6d6] flex flex-col justify-between selection:bg-[#ff8c00] selection:text-black font-sans antialiased pb-20 sm:pb-24 lg:pb-0 relative overflow-x-hidden cyber-bg-grid">
      
      {/* Background Ambient Glowing Reflections & Light Flares */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#ff8c00]/20 to-transparent rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-3d-orange" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-[#00f0ff]/20 to-transparent rounded-full blur-[160px] pointer-events-none z-0 animate-pulse-3d-cyan" />
      <div className="fixed top-[40%] right-[20%] w-[350px] h-[350px] bg-[#ffdb70]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating Particles Atmosphere Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-2 h-2 rounded-full bg-[#ff8c00] blur-[1px] opacity-60 animate-[floatParticle_7s_infinite_ease-in-out]" />
        <div className="absolute top-[35%] left-[80%] w-2.5 h-2.5 rounded-full bg-[#00f0ff] blur-[1px] opacity-70 animate-[floatParticle_9s_infinite_ease-in-out_1s]" />
        <div className="absolute top-[70%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#ffdb70] blur-[1px] opacity-50 animate-[floatParticle_6s_infinite_ease-in-out_2s]" />
        <div className="absolute top-[85%] left-[65%] w-3 h-3 rounded-full bg-[#ff8c00] blur-[2px] opacity-40 animate-[floatParticle_8s_infinite_ease-in-out_3s]" />
        <div className="absolute top-[50%] left-[45%] w-2 h-2 rounded-full bg-[#00f0ff] blur-[1px] opacity-60 animate-[floatParticle_10s_infinite_ease-in-out_1.5s]" />
      </div>

      {/* Main Structural Container */}
      <div className="max-w-[1250px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* Left Side: vCard Sidebar */}
        <aside className="lg:col-span-3 bg-[#141418]/95 backdrop-blur-2xl border border-[#ff8c00]/30 rounded-3xl p-5 sm:p-8 lg:p-6 text-center relative lg:sticky lg:top-8 shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(255,140,0,0.2)] space-y-6 transition-all duration-300">
          
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 sm:gap-6 lg:gap-4 text-left sm:text-left lg:text-center relative">
            
            {/* Hidden file input for photo upload */}
            <input 
              type="file" 
              ref={avatarInputRef} 
              accept="image/*" 
              onChange={handleAvatarUpload} 
              className="hidden" 
            />

            {/* Profile Avatar Box with Upload trigger */}
            <div className="relative group shrink-0">
              <div 
                onClick={() => avatarInputRef.current?.click()}
                className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br from-[#1e1e24] to-[#121216] flex flex-col items-center justify-center border-2 border-[#ff8c00]/50 group-hover:border-[#00f0ff] transition-all duration-300 cursor-pointer relative overflow-hidden cyber-portrait-glow"
                title="Click to upload your profile photo"
              >
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-black text-[#ff8c00] tracking-wider font-mono text-glow-orange">DB</span>
                    <span className="text-[9px] font-mono text-[#00f0ff] mt-1 uppercase font-semibold tracking-widest">&lt;dev/&gt;</span>
                  </div>
                )}

                {/* Hover overlay with Camera Upload prompt */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-[#ffdb70] gap-1 p-2 text-center">
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f0ff]" />
                  <span className="text-[9px] font-bold uppercase font-mono tracking-wider leading-tight text-[#ffdb70]">
                    {profile.avatar ? "Change Photo" : "Upload Photo"}
                  </span>
                </div>
              </div>

              {/* Small 3D Pulse Camera Badge Button */}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  avatarInputRef.current?.click();
                }}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-[#ff8c00] to-[#ffdb70] text-[#0a0a0c] rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(255,140,0,0.8)] border-2 border-[#0a0a0c] hover:scale-125 transition-transform cursor-pointer"
                title="Upload Photo"
              >
                <Camera className="w-4 h-4 font-bold" />
              </button>
            </div>
            
            <div className="space-y-2 flex-1">
              <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white leading-tight uppercase font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]" title={profile.name}>
                {profile.name}
              </h1>
              <p className="inline-block px-3 py-1 bg-gradient-to-r from-[#1e1e26] to-[#16161a] text-[#ffdb70] border border-[#ff8c00]/40 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(255,140,0,0.2)]">
                {profile.title}
              </p>
            </div>

            {/* Expand contacts button for mobile */}
            <button 
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="absolute top-0 right-0 sm:top-4 sm:right-0 lg:hidden flex items-center gap-1 bg-[#1e1e24] text-[#ffdb70] border border-[#383838] px-3 py-1.5 rounded-bl-xl rounded-tr-xl text-[10px] font-semibold transition-all hover:bg-[#282830] cursor-pointer"
            >
              <span>{isSidebarExpanded ? "Hide Contacts" : "Show Contacts"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isSidebarExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Separator - Hidden on mobile unless expanded */}
          <div className={`${isSidebarExpanded ? 'block' : 'hidden'} lg:block separator`} />

          {/* Expanded contact details */}
          <div className={`${isSidebarExpanded ? 'block animate-fade-in' : 'hidden'} lg:block space-y-5 text-left ${isLocked ? 'opacity-40 pointer-events-none select-none filter blur-[0.5px]' : ''}`}>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a20] border border-[#ff8c00]/30 group-hover:border-[#00f0ff] flex items-center justify-center text-[#ff8c00] group-hover:text-[#00f0ff] shrink-0 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] text-slate-400 uppercase font-bold font-mono tracking-wider">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-xs text-[#fafafa] hover:text-[#00f0ff] transition-colors truncate block" title="Click to open Gmail / mail client">
                    {profile.email}
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a20] border border-[#ff8c00]/30 group-hover:border-[#00f0ff] flex items-center justify-center text-[#ff8c00] group-hover:text-[#00f0ff] shrink-0 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] text-slate-400 uppercase font-bold font-mono tracking-wider">Phone</p>
                  <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="text-xs text-[#fafafa] hover:text-[#00f0ff] transition-colors truncate block" title="Click to open dial pad">
                    {profile.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a20] border border-[#ff8c00]/30 group-hover:border-[#00f0ff] flex items-center justify-center text-[#ff8c00] group-hover:text-[#00f0ff] shrink-0 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] text-slate-400 uppercase font-bold font-mono tracking-wider">Birthday</p>
                  <a 
                    href="https://calendar.google.com/calendar/u/0/r" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-[#fafafa] hover:text-[#00f0ff] transition-colors truncate block"
                    title="Click to open Google Calendar"
                  >
                    {profile.birthday || "14-June-2008"}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a20] border border-[#ff8c00]/30 group-hover:border-[#00f0ff] flex items-center justify-center text-[#ff8c00] group-hover:text-[#00f0ff] shrink-0 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)] mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] text-slate-400 uppercase font-bold font-mono tracking-wider">Location</p>
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Sri+Ramakrishna+Institute+of+Technology,+Coimbatore" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-[#fafafa] hover:text-[#00f0ff] transition-colors leading-tight block font-semibold"
                    title="Campus Location: SRIT Coimbatore"
                  >
                    🎓 {profile.location}
                  </a>
                </div>
              </li>
            </ul>

            <div className="separator" />

            {/* 3D Dynamic Social Network Icon Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 text-slate-400">
              <a 
                href={profile.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-[#1a1a20] border border-[#ff8c00]/30 hover:border-[#00f0ff] text-[#d6d6d6] hover:text-[#00f0ff] hover:scale-115 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer active:translate-y-0.5" 
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={profile.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-[#1a1a20] border border-[#ff8c00]/30 hover:border-[#00f0ff] text-[#d6d6d6] hover:text-[#00f0ff] hover:scale-115 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer active:translate-y-0.5" 
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={profile.facebook || "https://www.facebook.com/share/1FCuFmuQqA/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-[#1a1a20] border border-[#ff8c00]/30 hover:border-[#00f0ff] text-[#d6d6d6] hover:text-[#00f0ff] hover:scale-115 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer active:translate-y-0.5" 
                title="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={profile.instagram || "https://www.instagram.com/boopathi.__.08?igsh=MTA5ZTQ2a2k1dmZvZg=="} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-[#1a1a20] border border-[#ff8c00]/30 hover:border-[#00f0ff] text-[#d6d6d6] hover:text-[#00f0ff] hover:scale-115 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer active:translate-y-0.5" 
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={profile.telegram || "https://t.me/boopathi_008"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-[#1a1a20] border border-[#ff8c00]/30 hover:border-[#00f0ff] text-[#d6d6d6] hover:text-[#00f0ff] hover:scale-115 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer active:translate-y-0.5" 
                title="Telegram Direct"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
              <a 
                href={profile.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-[#1a1a20] border border-[#ff8c00]/30 hover:border-[#00f0ff] text-[#d6d6d6] hover:text-[#00f0ff] hover:scale-115 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer active:translate-y-0.5" 
                title="Twitter/X Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Front Page Admin Access Trigger */}
            <div className="pt-2 border-t border-[#383838]/50">
              <button
                onClick={() => !isLocked && setAdminMode(!adminMode)}
                disabled={isLocked}
                className={`w-full py-2.5 px-3 rounded-xl text-[11px] font-mono font-bold transition-all flex items-center justify-center space-x-2 border cursor-pointer active:translate-y-0.5 ${
                  isLocked
                    ? 'bg-[#121216] text-amber-500/70 border-amber-500/30 cursor-not-allowed opacity-60'
                    : adminMode 
                    ? 'btn-3d-orange text-black' 
                    : 'btn-3d-cyber text-[#ffdb70]'
                }`}
                title={isLocked ? "Complete Admin Gateway Login First" : "Front Page Admin Gateway"}
              >
                {isLocked ? (
                  <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-[#00f0ff]" />
                )}
                <span>{isLocked ? 'Gateway Access Locked' : adminMode ? 'Exit Cyber Gateway' : 'Admin Login Gateway'}</span>
              </button>
            </div>
          </div>

        </aside>

        {/* Right Side: Main Content Panel */}
        <div className="lg:col-span-9 bg-[#141418]/95 backdrop-blur-2xl border border-[#00f0ff]/30 rounded-3xl p-5 sm:p-10 relative shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.15)] min-h-[600px] flex flex-col justify-between overflow-hidden">
          
          {/* Luminous Top Right Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00f0ff]/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#ff8c00]/10 to-transparent rounded-tr-full pointer-events-none" />

          {/* Responsive Header Navigation Bar */}
          <Navbar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            adminMode={adminMode}
            setAdminMode={setAdminMode}
            isLocked={isLocked}
          />

          {/* Active section container */}
          <main className="flex-1 pb-4 relative z-10">
            {adminMode && isAdminAuthenticated && (
              <div className="mb-6 pb-3 border-b border-[#383838] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-[#ffdb70] font-bold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00f0ff]" /> Cyber Admin Studio Dashboard
                </span>
                <button
                  onClick={() => setAdminMode(false)}
                  className="px-3.5 py-1.5 btn-3d-cyber text-[#fafafa] rounded-xl font-mono text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#ff8c00]" />
                  <span>Return to Portfolio</span>
                </button>
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={adminMode ? 'admin' : activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </main>

        </div>

      </div>

      {/* Modern Centered Footer */}
      <footer className="bg-[#0a0a0d] border-t border-[#1e1e24] py-6 text-slate-400 font-mono text-xs print:hidden shadow-inner">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-300 font-semibold tracking-wide">
            © 2026 DHARMENTHIRA BOOPATHI S. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Dynamic Gemini-Powered Chatbot Assistant - Hidden while locked */}
      {!isLocked && (
        <Chatbot 
          portfolioData={{ profile, skills, projects, achievements, experiences, education, blogs }} 
          isOpen={isChatbotOpen} 
          setIsOpen={setIsChatbotOpen} 
        />
      )}

    </div>
  );
}
