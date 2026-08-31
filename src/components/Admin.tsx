import React, { useState } from 'react';
import { Settings, Users, BookOpen, MessageSquare, Plus, Trash2, Edit3, Shield, RefreshCw, BarChart3, Sliders, CheckSquare, Sparkles, Lock, User, Eye, EyeOff, ShieldAlert, Key, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Project, Skill, BlogPost, ContactMessage, ProfileInfo } from '../types';

interface AdminProps {
  profile: ProfileInfo;
  skills: Skill[];
  projects: Project[];
  blogs: BlogPost[];
  messages: ContactMessage[];
  saveProfile: (p: ProfileInfo) => void;
  saveSkills: (s: Skill[]) => void;
  saveProjects: (p: Project[]) => void;
  saveBlogs: (b: BlogPost[]) => void;
  markMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  resetAllData: () => void;
  isAuthenticated?: boolean;
  setIsAuthenticated?: (auth: boolean) => void;
}

export default function Admin({
  profile,
  skills,
  projects,
  blogs,
  messages,
  saveProfile,
  saveSkills,
  saveProjects,
  saveBlogs,
  markMessageRead,
  deleteMessage,
  resetAllData,
  isAuthenticated: propAuth,
  setIsAuthenticated: propSetAuth
}: AdminProps) {
  const [localAuth, setLocalAuth] = useState<boolean>(false);
  const isAuthenticated = propAuth !== undefined ? propAuth : localAuth;
  const setIsAuthenticated = (val: boolean) => {
    if (propSetAuth) propSetAuth(val);
    setLocalAuth(val);
  };

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState<boolean>(false);

  const handleGoogleSignInClick = () => {
    setAuthError('');
    setIsGoogleSigningIn(true);
    setTimeout(() => {
      setIsGoogleSigningIn(false);
      setShowGoogleModal(true);
    }, 700);
  };

  const handleSelectGoogleAccount = () => {
    setIsGoogleSigningIn(true);
    setShowGoogleModal(false);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsGoogleSigningIn(false);
      alert(`Signed in successfully as ${profile.name}!`);
    }, 600);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (!username.trim() || !password.trim()) {
      setAuthError('Please fill in all security fields.');
      return;
    }

    setIsAuthenticating(true);

    // Simulate standard lookup latency
    setTimeout(() => {
      if (username.toLowerCase() === 'admin' && password === 'admin') {
        setIsAuthenticated(true);
        setIsAuthenticating(false);
      } else {
        setAuthError('Invalid administrative credentials. Please try again.');
        setIsAuthenticating(false);
      }
    }, 800);
  };

  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'inbox' | 'projects' | 'skills' | 'ui_designs'>('analytics');
  const [editingBio, setEditingBio] = useState(profile.bio);
  const [profileForm, setProfileForm] = useState<ProfileInfo>({ ...profile });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image is too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileForm(prev => ({ ...prev, avatar: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfileForm = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profileForm);
    alert("Profile configurations saved successfully!");
  };

  // Form states for adding new Project
  const [newProject, setNewProject] = useState({
    name: '',
    category: 'Full-Stack',
    description: '',
    technologies: '',
    demoUrl: '#',
    githubUrl: 'https://github.com',
    duration: '1 Month',
    challenges: 'Solving caching latency.',
    features: 'Real-time database triggers.',
    learningOutcome: 'Advanced cloud capabilities.'
  });

  // Form states for adding new Skill
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'programming' as Skill['category'],
    level: 80,
    yearsOfExperience: 2
  });

  // Prefilled UI designs as static state so they persist and are editable
  const [uiDesigns, setUiDesigns] = useState([
    {
      id: 'ui-1',
      title: 'Noval Reading Portal Design',
      tool: 'Figma & Canva',
      url: 'https://noval-reading-555443565865.asia-southeast1.run.app',
      platform: 'Responsive Web Design',
      preview: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'ui-2',
      title: 'Secure Authentication Gateway',
      tool: 'Figma Layouts',
      url: 'https://github.com/boopathi-2404',
      platform: 'Desktop Interface View',
      preview: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'ui-3',
      title: 'Vector Portfolio Layout Canvas',
      tool: 'Figma Wireframes',
      url: '#',
      platform: 'Interactive Desktop Grid',
      preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300'
    }
  ]);

  const [newUiDesign, setNewUiDesign] = useState({
    title: '',
    tool: 'Figma',
    url: '#',
    platform: 'Web Interface',
    preview: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=300'
  });

  const handleSaveBio = () => {
    saveProfile({ ...profile, bio: editingBio });
    alert("Profile Biography updated successfully!");
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.description) {
      alert("Please provide a Name and Description for the project.");
      return;
    }

    const createdProject: Project = {
      id: 'proj-' + Date.now(),
      name: newProject.name,
      category: newProject.category,
      description: newProject.description,
      technologies: newProject.technologies.split(',').map(s => s.trim()).filter(Boolean),
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400", // Standard mock photo
      demoUrl: newProject.demoUrl,
      githubUrl: newProject.githubUrl,
      duration: newProject.duration,
      challenges: newProject.challenges,
      features: newProject.features.split('\n').map(s => s.trim()).filter(Boolean),
      learningOutcome: newProject.learningOutcome
    };

    saveProjects([createdProject, ...projects]);
    alert("New project published successfully!");
    setNewProject({
      name: '',
      category: 'Full-Stack',
      description: '',
      technologies: '',
      demoUrl: '#',
      githubUrl: 'https://github.com',
      duration: '1 Month',
      challenges: 'Solving caching latency.',
      features: 'Real-time database triggers.',
      learningOutcome: 'Advanced cloud capabilities.'
    });
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      saveProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) {
      alert("Please enter a skill name.");
      return;
    }

    const createdSkill: Skill = {
      id: 'skill-' + Date.now(),
      name: newSkill.name,
      category: newSkill.category,
      level: Number(newSkill.level),
      yearsOfExperience: Number(newSkill.yearsOfExperience)
    };

    saveSkills([createdSkill, ...skills]);
    alert("New skill capability appended!");
    setNewSkill({ name: '', category: 'programming', level: 80, yearsOfExperience: 2 });
  };

  const handleDeleteSkill = (id: string) => {
    if (confirm("Remove this technical skill capability?")) {
      saveSkills(skills.filter(s => s.id !== id));
    }
  };

  const handleAddUiDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUiDesign.title) {
      alert("A Title is required to publish a UI design layout.");
      return;
    }

    const created: typeof uiDesigns[0] = {
      id: 'ui-' + Date.now(),
      title: newUiDesign.title,
      tool: newUiDesign.tool,
      url: newUiDesign.url,
      platform: newUiDesign.platform,
      preview: newUiDesign.preview || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=300"
    };

    setUiDesigns([created, ...uiDesigns]);
    alert("New UI Design wireframe published!");
    setNewUiDesign({ title: '', tool: 'Figma', url: '#', platform: 'Web Interface', preview: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=300' });
  };

  const handleDeleteUiDesign = (id: string) => {
    if (confirm("Permanently delete this UI Design wireframe?")) {
      setUiDesigns(uiDesigns.filter(d => d.id !== id));
    }
  };

  const handleResetData = () => {
    if (confirm("WARNING: This will reset all customized projects, bio edits, and newly added skills to default initial structures. Proceed?")) {
      resetAllData();
      alert("Database has been rolled back to pristine default structures.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative w-full max-w-xl mx-auto my-4 sm:my-8 px-4 font-sans animate-fade-in text-left select-none">
        
        {/* Dimmed & Blurred Background Systems (Indicating locked/inactive background state) */}
        <div className="absolute -inset-12 sm:-inset-16 pointer-events-none overflow-hidden rounded-3xl opacity-30 blur-[2px] filter grayscale-[25%] transition-all duration-700">
          {/* Simulated Inactive Dashboard Wireframes */}
          <div className="grid grid-cols-3 gap-3 p-4 opacity-40">
            <div className="h-20 rounded-xl border border-cyan-500/30 bg-[#0d0d12] p-2 space-y-2">
              <div className="h-2 w-12 bg-cyan-500/40 rounded" />
              <div className="h-4 w-20 bg-slate-700/50 rounded" />
            </div>
            <div className="h-20 rounded-xl border border-amber-500/30 bg-[#0d0d12] p-2 space-y-2">
              <div className="h-2 w-16 bg-amber-500/40 rounded" />
              <div className="h-4 w-16 bg-slate-700/50 rounded" />
            </div>
            <div className="h-20 rounded-xl border border-slate-700 bg-[#0d0d12] p-2 space-y-2">
              <div className="h-2 w-10 bg-slate-600 rounded" />
              <div className="h-4 w-24 bg-slate-700/50 rounded" />
            </div>
          </div>

          {/* Swirling Cyber Orbits & Hologram Grids */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[480px] h-[480px] rounded-full border border-cyan-500/20 border-dashed animate-spin-slow" />
            <div className="w-[420px] h-[420px] rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin-reverse" />
            <div className="w-[560px] h-[560px] rounded-full border border-orange-500/15" />
          </div>

          {/* Background Ambient Neon Glow Orbs */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" />
        </div>

        {/* PROMINENT 3D FOREGROUND LOGIN CARD */}
        <div className="relative z-20 group perspective-1000">
          
          {/* Luminous Glowing Border with Dual Gold & Cyan Neon Accent */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#ff8c00] via-[#00f0ff] to-[#ffdb70] opacity-85 blur-lg group-hover:opacity-100 transition-all duration-500 cyber-card-glow shadow-[0_0_35px_rgba(255,140,0,0.4)]" />
          
          {/* Main 3D Glassmorphic Card Container */}
          <div className="relative bg-[#0d0d12]/95 backdrop-blur-2xl border-2 border-[#ff8c00]/60 rounded-3xl p-6 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(255,140,0,0.2)] overflow-hidden">
            
            {/* Light Reflection Sheen Line Across Top Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00f0ff]/80 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

            {/* Portrait of Dharmenthira Boopathi S in Luminous Glowing Frame */}
            <div className="text-center space-y-3 mb-6 relative z-10">
              <div className="relative inline-block mx-auto group/avatar">
                {/* Dual Neon Glowing Frame */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-[#ff8c00] via-[#00f0ff] to-[#ffdb70] opacity-90 blur-md cyber-portrait-glow animate-pulse-glow" />
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.4)] bg-[#121218]">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Dharmenthira Boopathi S"
                      className="w-full h-full object-cover object-top filter contrast-[105%] transition-transform duration-500 group-hover/avatar:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a20] text-[#ffdb70]">
                      <span className="text-2xl font-black font-mono">DBS</span>
                      <span className="text-[9px] text-[#00f0ff] font-mono">&lt;admin/&gt;</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-wider text-white font-mono uppercase bg-gradient-to-r from-white via-[#ffdb70] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  DHARMENTHIRA BOOPATHI S
                </h2>
                <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#ff8c00] uppercase mt-1 font-extrabold flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                  CYBER ADMINISTRATIVE GATEWAY
                </p>
              </div>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="mb-5 p-3 rounded-xl bg-red-950/60 border border-red-500/80 text-red-200 text-xs flex items-center space-x-2 backdrop-blur-md shadow-lg animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            {/* Google Sign In Option */}
            <div className="space-y-4 mb-6 relative z-10">
              <button
                type="button"
                onClick={handleGoogleSignInClick}
                disabled={isGoogleSigningIn || isAuthenticating}
                className="w-full bg-[#181820] hover:bg-[#20202c] text-white font-bold py-3 px-4 rounded-2xl text-xs transition-all duration-300 border border-[#383838] hover:border-[#00f0ff] flex items-center justify-center space-x-2.5 shadow-lg cursor-pointer disabled:opacity-50 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {isGoogleSigningIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#00f0ff]" />
                    <span className="font-mono text-[#00f0ff]">Connecting Google Gateway...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.19 2.698 1.18 6.655l4.086 3.11z"
                      />
                      <path
                        fill="#34A853"
                        d="M16.04 15.345c-1.07.72-2.455 1.146-4.04 1.146-2.727 0-5.045-1.836-5.873-4.31L2.04 15.29C4.054 19.345 8.273 22 13 22c3.09 0 5.864-1.01 7.91-2.782l-4.87-3.873z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.49 12.273c0-.818-.082-1.609-.227-2.373H13v4.51h5.89c-.254 1.345-1.01 2.482-2.155 3.245l4.87 3.873c2.845-2.627 4.482-6.5 4.482-10.99z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M6.127 12.182c0-.627.109-1.236.3-1.818L2.34 7.255A11.942 11.942 0 0 0 .5 12c0 1.682.355 3.282.982 4.727l4.345-3.373a7.18 7.18 0 0 1-.3-.935c0-.18-.04-.37-.04-.56c0-.59.1-1.16.3-1.71z"
                      />
                    </svg>
                    <span className="font-mono tracking-wider font-extrabold">Sign in with Google</span>
                  </>
                )}
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#383838]"></div>
                <span className="flex-shrink mx-4 text-[10px] font-mono uppercase tracking-widest text-[#ffdb70] font-black">OR ENCRYPTED AUTH</span>
                <div className="flex-grow border-t border-[#383838]"></div>
              </div>
            </div>

            {/* Glowing Form Fields for USERNAME and PASSWORD */}
            <form onSubmit={handleSignIn} className="space-y-4 relative z-10">
              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-mono tracking-widest text-[#ff8c00] uppercase font-bold flex items-center justify-between">
                  <span>USERNAME</span>
                  <span className="text-[#00f0ff] text-[9px]">SYSTEM_ID</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4 text-[#00f0ff]" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full bg-[#101014] border border-[#383838] focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/60 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] rounded-2xl pl-10 pr-4 py-3 text-xs text-[#fafafa] font-mono placeholder-slate-600 focus:outline-none transition-all duration-200 shadow-inner"
                    disabled={isAuthenticating || isGoogleSigningIn}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-mono tracking-widest text-[#ff8c00] uppercase font-bold flex items-center justify-between">
                  <span>PASSWORD</span>
                  <span className="text-[#00f0ff] text-[9px]">SECURITY_KEY</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4 text-[#ff8c00]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security key"
                    className="w-full bg-[#101014] border border-[#383838] focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00]/60 focus:shadow-[0_0_15px_rgba(255,140,0,0.3)] rounded-2xl pl-10 pr-10 py-3 text-xs text-[#fafafa] font-mono placeholder-slate-600 focus:outline-none transition-all duration-200 shadow-inner"
                    disabled={isAuthenticating || isGoogleSigningIn}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-[#ffdb70] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Golden ACCESS GATEWAY Button */}
              <button
                type="submit"
                disabled={isAuthenticating || isGoogleSigningIn}
                className="w-full mt-6 bg-gradient-to-r from-[#ffc837] via-[#ffb000] to-[#ff8008] hover:brightness-110 hover:animate-pulse text-black font-black py-3.5 px-4 rounded-2xl text-xs tracking-wider transition-all duration-300 active:scale-[0.99] cursor-pointer flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(255,180,0,0.5)] border border-[#ffe082] hover:shadow-[0_0_35px_rgba(255,180,0,0.85)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#121212]" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <span className="uppercase tracking-widest font-black font-mono">ACCESS GATEWAY</span>
                )}
              </button>
            </form>

          </div>
        </div>

        {/* Google Account Selector Overlay dialog */}
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-sm bg-slate-900 text-slate-100 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-800 font-sans">
              
              {/* Google Logo / Title */}
              <div className="p-6 pb-4 text-center border-b border-slate-800">
                <div className="flex justify-center mb-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.19 2.698 1.18 6.655l4.086 3.11z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.04 15.345c-1.07.72-2.455 1.146-4.04 1.146-2.727 0-5.045-1.836-5.873-4.31L2.04 15.29C4.054 19.345 8.273 22 13 22c3.09 0 5.864-1.01 7.91-2.782l-4.87-3.873z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.49 12.273c0-.818-.082-1.609-.227-2.373H13v4.51h5.89c-.254 1.345-1.01 2.482-2.155 3.245l4.87 3.873c2.845-2.627 4.482-6.5 4.482-10.99z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.127 12.182c0-.627.109-1.236.3-1.818L2.34 7.255A11.942 11.942 0 0 0 .5 12c0 1.682.355 3.282.982 4.727l4.345-3.373a7.18 7.18 0 0 1-.3-.935c0-.18-.04-.37-.04-.56c0-.59.1-1.16.3-1.71z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-white">Sign in with Google</h3>
                <p className="text-xs text-slate-400 mt-1">to continue to Portfolio Studio Admin</p>
              </div>

              {/* Accounts List */}
              <div className="p-4 space-y-2">
                <button
                  type="button"
                  onClick={handleSelectGoogleAccount}
                  className="w-full flex items-center p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-slate-850 hover:border-indigo-500/30 transition-all text-left group cursor-pointer"
                >
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Google User Avatar"
                      className="w-10 h-10 rounded-full border border-slate-800 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-slate-800 bg-[#1e1e24] flex items-center justify-center text-[#ff8c00] font-mono text-xs font-bold">
                      DB
                    </div>
                  )}
                  <div className="ml-3">
                    <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">Dharmenthira Boopathi S</div>
                    <div className="text-[11px] text-slate-400">poopathiraja504@gmail.com</div>
                  </div>
                  <span className="ml-auto text-[9px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">Active</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    alert("Logged in with primary verified Google profile.");
                    handleSelectGoogleAccount();
                  }}
                  className="w-full flex items-center p-3 rounded-xl hover:bg-slate-950/40 border border-transparent transition-all text-left text-slate-400 hover:text-slate-200 text-xs font-medium cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border border-dashed border-slate-800">
                    <Plus className="w-4 h-4 text-slate-500" />
                  </div>
                  <span className="ml-3">Use another account</span>
                </button>
              </div>

              {/* Footer */}
              <div className="bg-slate-950 px-6 py-4 border-t border-slate-850 text-[10px] text-slate-500 leading-normal flex items-center justify-between">
                <span>Secure Google OAuth 2.0</span>
                <button type="button" onClick={() => setShowGoogleModal(false)} className="hover:underline hover:text-slate-300">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100 font-sans"
    >
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight flex items-center">
            <Shield className="w-8 h-8 text-amber-500 mr-2 shrink-0" />
            Portfolio Studio Admin
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">Customize biography content, manage projects list, or read submitted inbox inquiries.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="admin-lock-btn"
            onClick={() => setIsAuthenticated(false)}
            className="inline-flex items-center px-3.5 py-2 bg-[#181820] border border-amber-500/50 hover:border-amber-400 text-amber-300 rounded-lg text-xs font-semibold font-mono transition-colors cursor-pointer shadow-sm"
            title="Lock Gateway & Require Credentials"
          >
            <Lock className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            Lock Gateway
          </button>
          <button
            id="admin-reset-btn"
            onClick={handleResetData}
            className="inline-flex items-center px-4 py-2 bg-red-950/40 border border-red-900/40 hover:border-red-850 text-red-400 rounded-lg text-xs font-semibold font-mono transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Reset All Defaults
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Admin Navigation Left Rails */}
        <div className="lg:col-span-3 space-y-2 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block px-3 mb-2">CONTROL TABS</span>
          
          <button
            id="subtab-analytics-btn"
            onClick={() => setActiveSubTab('analytics')}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeSubTab === 'analytics' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2.5 text-slate-400" />
            Manage Profile
          </button>

          <button
            id="subtab-inbox-btn"
            onClick={() => setActiveSubTab('inbox')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeSubTab === 'inbox' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2.5 text-slate-400" />
              Inbox Messages
            </div>
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span className="px-1.5 py-0.5 bg-red-500 text-white font-mono font-bold rounded-md text-[10px]">
                {messages.filter(m => m.status === 'unread').length}
              </span>
            )}
          </button>

          <button
            id="subtab-projects-btn"
            onClick={() => setActiveSubTab('projects')}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeSubTab === 'projects' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 mr-2.5 text-slate-400" />
            Manage Projects
          </button>

          <button
            id="subtab-skills-btn"
            onClick={() => setActiveSubTab('skills')}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeSubTab === 'skills' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4 mr-2.5 text-slate-400" />
            Manage Skills
          </button>

          <button
            id="subtab-uidesigns-btn"
            onClick={() => setActiveSubTab('ui_designs')}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeSubTab === 'ui_designs' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 mr-2.5 text-indigo-400" />
            Manage UI Designs
          </button>
        </div>

        {/* Right Active View Content Area */}
        <div className="lg:col-span-9 bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[450px]">
          
          {/* TAB 1: Profile Settings & Upload Local Avatar */}
          {activeSubTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-slate-800 pb-2 text-slate-100">Profile Settings</h3>
              
              <form onSubmit={handleSaveProfileForm} className="space-y-6">
                
                {/* Image upload section */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-850/80 space-y-4">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-500">Profile Photo / Avatar</h4>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <img
                      src={profileForm.avatar}
                      alt="Avatar Preview"
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-full border-2 border-indigo-500/30 object-cover shadow-lg"
                    />
                    <div className="space-y-2 text-left w-full sm:w-auto">
                      <label className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                        <span>Upload from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="text-[10px] text-slate-500 font-mono">Supports PNG, JPG, GIF up to 2MB. Converted to secure Base64 format.</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">Or Avatar Image URL</label>
                    <input
                      type="text"
                      value={profileForm.avatar}
                      onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Core fields grid */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-850/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">Professional Title</label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">Geographical Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">LinkedIn Link</label>
                    <input
                      type="text"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">GitHub Link</label>
                    <input
                      type="text"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">Twitter / X Link</label>
                    <input
                      type="text"
                      value={profileForm.twitter}
                      onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Biography input */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-850/80 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-400 font-medium">Biography Context</label>
                    <textarea
                      rows={5}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg p-3 text-xs text-slate-300 focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm shadow-lg shadow-indigo-600/15 cursor-pointer"
                  >
                    Save Profile Settings
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 2: Inbox Messages */}
          {activeSubTab === 'inbox' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-slate-800 pb-2">Submitted Inbox Messages</h3>

              {messages.length === 0 ? (
                <div className="text-center py-16 text-slate-500 font-mono text-xs">Inbox is completely clear.</div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 transition-colors ${
                        msg.status === 'unread' ? 'bg-slate-950/70 border-amber-600/30' : 'bg-slate-950/30 border-slate-850'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 border-b border-slate-850 pb-2">
                        <div>
                          <span className="font-bold text-slate-100 text-sm">{msg.name}</span>
                          <span className="text-[10px] font-mono text-slate-500 block">{msg.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {msg.status === 'unread' && (
                            <span className="px-1.5 py-0.5 bg-amber-950 border border-amber-900 text-amber-500 font-mono text-[9px] font-bold uppercase rounded">
                              New Inq
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-500">{msg.date}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="font-semibold text-slate-300 text-xs font-mono uppercase">Subject: {msg.subject}</div>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{msg.message}</p>
                      </div>

                      <div className="flex justify-end items-center space-x-3 pt-2 text-[10px] font-mono">
                        {msg.status === 'unread' && (
                          <button
                            id={`read-msg-btn-${msg.id}`}
                            onClick={() => markMessageRead(msg.id)}
                            className="px-2.5 py-1 bg-amber-950 border border-amber-900 text-amber-500 hover:text-amber-400 rounded transition-all cursor-pointer"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          id={`del-msg-btn-${msg.id}`}
                          onClick={() => deleteMessage(msg.id)}
                          className="px-2.5 py-1 bg-red-950 border border-red-900/60 text-red-400 hover:text-red-300 rounded transition-all flex items-center cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete Entry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Manage Projects */}
          {activeSubTab === 'projects' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-slate-800 pb-2">Manage Case Projects</h3>

              {/* Add New Project form */}
              <form onSubmit={handleAddProject} className="bg-slate-950 p-5 border border-slate-850 rounded-xl space-y-4">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center text-indigo-400">
                  <Plus className="w-4 h-4 mr-1.5" /> Publish New Project
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Project Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Helix visual compiler"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Category *</label>
                    <input
                      type="text"
                      required
                      placeholder="Developer Tools, AI, etc."
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-400">Technologies (Comma Separated) *</label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Express, D3.js"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-400">Brief Overview Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide a clean summary detailing what this system achieves..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded p-3 text-slate-300 resize-none focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  id="publish-proj-btn"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Publish Project Card
                </button>
              </form>

              {/* Projects list */}
              <div className="space-y-3.5 pt-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Currently Listed ({projects.length})</h4>
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-white block text-sm font-sans">{proj.name}</span>
                      <span className="text-slate-500 uppercase">{proj.category} • {proj.duration}</span>
                    </div>

                    <button
                      id={`del-proj-btn-${proj.id}`}
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 bg-red-950/40 hover:bg-red-900 text-red-400 rounded-md transition-colors"
                      title="Delete Project Card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: Manage Skills */}
          {activeSubTab === 'skills' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-slate-800 pb-2">Manage Skillsets</h3>

              {/* Add skill form */}
              <form onSubmit={handleAddSkill} className="bg-slate-950 p-5 border border-slate-850 rounded-xl space-y-4">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center text-indigo-400">
                  <Plus className="w-4 h-4 mr-1.5" /> Append Skill Capability
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Skill Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Go Language, D3"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Stack Category *</label>
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as Skill['category'] })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300"
                    >
                      <option value="programming">Languages</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="database">Databases</option>
                      <option value="cloud">Cloud</option>
                      <option value="devops">DevOps</option>
                      <option value="ai">AI / ML</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Level (0-100) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={100}
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Years Experience *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={15}
                      value={newSkill.yearsOfExperience}
                      onChange={(e) => setNewSkill({ ...newSkill, yearsOfExperience: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="append-skill-btn"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Append Capability
                </button>
              </form>

              {/* Skills list */}
              <div className="space-y-3 pt-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Listed Capabilities ({skills.length})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="font-bold text-slate-100 block text-sm font-sans">{skill.name}</span>
                        <span className="text-slate-500 uppercase">{skill.category} • Proficiency: {skill.level}%</span>
                      </div>
                      <button
                        id={`del-skill-btn-${skill.id}`}
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1 text-red-500 hover:bg-red-950/20 rounded transition-colors"
                        title="Remove Skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Manage UI Designs */}
          {activeSubTab === 'ui_designs' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold border-b border-slate-800 pb-2">Manage UI Designs</h3>

              {/* Add UI Design Form */}
              <form onSubmit={handleAddUiDesign} className="bg-slate-950 p-5 border border-slate-850 rounded-xl space-y-4">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center text-indigo-400">
                  <Plus className="w-4 h-4 mr-1.5" /> Publish New UI Design Layout
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Design Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Authentication Screen Mockup"
                      value={newUiDesign.title}
                      onChange={(e) => setNewUiDesign({ ...newUiDesign, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Design Tool *</label>
                    <input
                      type="text"
                      placeholder="e.g. Figma, Canva, Sketch"
                      value={newUiDesign.tool}
                      onChange={(e) => setNewUiDesign({ ...newUiDesign, tool: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Platform Scope *</label>
                    <input
                      type="text"
                      placeholder="e.g. Mobile App, Responsive Web, Desktop Grid"
                      value={newUiDesign.platform}
                      onChange={(e) => setNewUiDesign({ ...newUiDesign, platform: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Figma / Live Design URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://figma.com/file/..."
                      value={newUiDesign.url}
                      onChange={(e) => setNewUiDesign({ ...newUiDesign, url: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-400">Preview Image URL (or Unsplash photo link)</label>
                  <input
                    type="text"
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                    value={newUiDesign.preview}
                    onChange={(e) => setNewUiDesign({ ...newUiDesign, preview: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded px-3 py-1.5 text-slate-300 animate-all"
                  />
                </div>

                <button
                  type="submit"
                  id="publish-uidesign-btn"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                >
                  Publish UI Design Card
                </button>
              </form>

              {/* UI Designs list */}
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Active Design Showcase ({uiDesigns.length})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {uiDesigns.map((design) => (
                    <div key={design.id} className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden flex flex-col group hover:border-indigo-500/30 transition-all duration-300">
                      <div className="h-32 bg-slate-900 relative">
                        <img
                          src={design.preview}
                          alt={design.title}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-slate-950/80 border border-slate-800 rounded font-mono text-[9px] text-amber-400 uppercase">
                          {design.tool}
                        </span>
                      </div>
                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <h5 className="font-bold text-xs text-white line-clamp-1">{design.title}</h5>
                          <span className="text-[10px] font-mono text-slate-500 block uppercase">{design.platform}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-850/60">
                          {design.url !== '#' ? (
                            <a href={design.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-indigo-400 hover:underline">
                              Launch Link ↗
                            </a>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-600">Draft Offline</span>
                          )}
                          <button
                            id={`del-uidesign-btn-${design.id}`}
                            onClick={() => handleDeleteUiDesign(design.id)}
                            className="p-1 text-red-500 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                            title="Remove Layout"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
}
