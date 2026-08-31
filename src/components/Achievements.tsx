import React, { useState } from 'react';
import { Award, ShieldAlert, Sparkles, Trophy, CheckSquare, ExternalLink, Eye, X } from 'lucide-react';
import { Achievement, ProfileInfo } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
  profile: ProfileInfo;
}

// Craig L Santos signature SVG for MathWorks
const CraigSantosSignature = () => (
  <svg viewBox="0 0 160 40" className="w-32 h-10 text-indigo-900/70 dark:text-indigo-800/80 mx-0 opacity-80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 15 30 C 5 28, 5 12, 18 10 C 25 10, 22 15, 18 20" />
    <path d="M 22 22 L 25 20 M 25 22 C 28 18, 30 24, 33 22 M 35 15 L 35 22 M 38 20 C 42 16, 43 24, 45 22 M 45 22 L 48 26 C 46 32, 42 32, 42 28" />
    <path d="M 58 10 L 58 24 L 65 24 M 68 23 L 69 23" />
    <path d="M 78 12 C 72 14, 75 18, 82 18 C 88 18, 86 24, 78 24" />
    <path d="M 85 22 C 88 18, 90 24, 93 22" />
    <path d="M 95 22 C 98 18, 100 24, 103 22" />
    <path d="M 105 14 L 105 24 M 102 18 L 108 18" />
    <path d="M 112 22 C 110 20, 110 24, 112 24 C 114 24, 116 20, 114 20" />
    <path d="M 120 18 C 118 16, 118 22, 120 22" />
  </svg>
);

export default function Achievements({ achievements, profile }: AchievementsProps) {
  const [viewingCertificate, setViewingCertificate] = useState<Achievement | null>(null);
  const [certificateTheme, setCertificateTheme] = useState<'realistic' | 'digital'>('realistic');

  const getIcon = (type: string) => {
    switch (type) {
      case 'hackathon': return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'certification': return <Award className="w-5 h-5 text-indigo-400" />;
      case 'award': return <Sparkles className="w-5 h-5 text-emerald-400" />;
      default: return <CheckSquare className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100 font-sans">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Awards & <span className="text-indigo-400">Industry Recognition</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          A visual log of career milestones, technical credentials, and competitive achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Badge Showcase */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center">
              <Trophy className="w-5 h-5 text-amber-400 mr-2" />
              Credentials & Badges
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  onClick={() => setViewingCertificate(ach)}
                  className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 p-4 rounded-xl text-center space-y-3 cursor-pointer group transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-900 mx-auto flex items-center justify-center text-2xl border border-slate-800 group-hover:scale-110 group-hover:border-indigo-500/30 transition-transform duration-200">
                    {ach.badgeUrl || '🏅'}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-100 line-clamp-1">{ach.title}</h4>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase mt-1">{ach.organization}</span>
                  </div>
                  <button
                    id={`view-cert-badge-${ach.id}`}
                    className="text-[10px] font-mono text-indigo-400 group-hover:text-indigo-300 inline-flex items-center"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Verify
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950 border border-indigo-900/30 rounded-2xl p-6 text-slate-300 text-sm leading-relaxed space-y-3">
            <h4 className="font-bold text-white flex items-center text-sm uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-indigo-400 mr-2" />
              Continuing Professional Development
            </h4>
            <p>
              We firmly believe in continuous skill refinement. In addition to formal academic education, we actively complete deep-dive workshops, security audits, and compete in global hackathons to master frontier technologies and stay ahead of industrial standard curves.
            </p>
          </div>
        </div>

        {/* Right column: Timeline Log */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xl font-bold flex items-center text-white">
            <Award className="w-5 h-5 text-indigo-400 mr-2" />
            Milestone Timeline
          </h3>

          <div className="relative border-l border-slate-800 pl-6 ml-3 space-y-8">
            {achievements.map((ach) => (
              <div key={ach.id} className="relative group">
                {/* Timeline Indicator Node */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-800 group-hover:border-indigo-500 transition-colors duration-200" />
                
                {/* Timeline content Card */}
                <div className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 rounded-xl p-5 space-y-3 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded bg-slate-950 border border-slate-800">
                        {getIcon(ach.type)}
                      </div>
                      <h4 className="font-bold text-base text-white">{ach.title}</h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 shrink-0 font-semibold">{ach.date}</span>
                  </div>

                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wide font-mono">
                    {ach.organization}
                  </p>
                  
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {ach.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                    <button
                      id={`view-cert-timeline-${ach.id}`}
                      onClick={() => setViewingCertificate(ach)}
                      className="inline-flex items-center text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      View Certificate
                    </button>

                    {ach.credentialUrl && (
                      <a
                        href={ach.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white inline-flex items-center transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Verify Credential
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Viewer Modal Overlay */}
      {viewingCertificate && (() => {
        const isMathworks = viewingCertificate.organization.toLowerCase().includes('mathworks');
        
        return (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div
              className={`bg-slate-900 border border-slate-800 rounded-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 ${
                isMathworks ? 'max-w-4xl' : 'max-w-xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top controls header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60 shrink-0">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setCertificateTheme('realistic')}
                    className={`px-3 py-1 text-[11px] font-mono rounded-md font-bold transition-all cursor-pointer ${
                      certificateTheme === 'realistic'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    Realistic Replica
                  </button>
                  <button
                    onClick={() => setCertificateTheme('digital')}
                    className={`px-3 py-1 text-[11px] font-mono rounded-md font-bold transition-all cursor-pointer ${
                      certificateTheme === 'digital'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    Premium Dark
                  </button>
                </div>

                {/* Close Trigger */}
                <button
                  id="close-cert-btn"
                  onClick={() => setViewingCertificate(null)}
                  className="p-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Theme 1: REALISTIC MATHEMATICAL REPLICA (matching the PDF screenshots) */}
              {certificateTheme === 'realistic' ? (
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg relative overflow-hidden select-none text-slate-900 p-6 sm:p-10 md:p-12 flex flex-col justify-between min-h-[360px] md:min-h-[440px] transition-all">
                  
                  {/* Sweeping background wave in teal & navy, matching the PDF */}
                  <div className="absolute right-0 top-0 bottom-0 w-[42%] overflow-hidden pointer-events-none rounded-r-xl hidden sm:block">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full scale-y-[1.01] scale-x-[1.01] origin-right">
                      <path d="M 15,0 C 28,15 10,45 32,70 C 45,85 30,95 50,100 L 100,100 L 100,0 Z" fill="url(#mathworksTealGradient)" />
                      <path d="M 0,0 C 15,10 5,35 25,60 C 38,75 25,90 45,100 L 100,100 L 100,0 Z" fill="rgba(20, 150, 180, 0.15)" />
                      
                      <path d="M 12,0 C 26,12 8,42 30,68 C 43,83 28,93 48,100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                      <path d="M 22,0 C 33,18 20,48 38,72 C 49,85 38,94 56,100" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" />
                      <path d="M 30,0 C 40,20 32,52 48,76 C 58,88 48,96 64,100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" strokeDasharray="1,1" />

                      <circle cx="90" cy="15" r="22" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
                      <circle cx="90" cy="15" r="16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
                      
                      <path d="M 10,0 Q 40,30 90,15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
                      <path d="M 20,25 Q 50,55 90,15" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.2" />
                      
                      <defs>
                        <linearGradient id="mathworksTealGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#1ba0be" />
                          <stop offset="35%" stopColor="#0d7b97" />
                          <stop offset="70%" stopColor="#034e68" />
                          <stop offset="100%" stopColor="#013143" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* MathWorks Branded Header */}
                  <div className="flex justify-between items-start z-10">
                    <div className="flex items-center">
                      <svg className="w-8 h-8 mr-2.5 shrink-0" viewBox="0 0 40 40" fill="none">
                        <path d="M20 2L4 12l16 10V2z" fill="#E05B20" />
                        <path d="M20 2l16 10-16 10V2z" fill="#F07C3D" />
                        <path d="M4 12l16 10 16-10-16-7L4 12z" fill="#B34212" opacity="0.8" />
                        <path d="M20 22l16-10v16l-16 10V22z" fill="#8C300B" />
                        <path d="M20 22L4 12v16l16 10V22z" fill="#A83C10" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-[#034f75] font-sans font-black text-xs sm:text-base tracking-tight leading-none">
                          {isMathworks ? 'MathWorks®' : viewingCertificate.organization}
                        </span>
                        {isMathworks && (
                          <span className="font-serif italic text-slate-500 text-[9px] sm:text-[10px] leading-tight">
                            Training Services
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-[9px] font-mono text-slate-400 font-bold tracking-wider uppercase hidden sm:block">
                      100% Coursework Accomplished
                    </div>
                  </div>

                  {/* Dynamic Certificate Text Layout */}
                  <div className="space-y-4 sm:space-y-6 md:space-y-8 z-10 text-left my-4 sm:my-6 sm:max-w-[58%]">
                    <div className="space-y-1">
                      <h3 className="text-slate-800 text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
                        Course Completion Certificate
                      </h3>
                      <div className="w-16 h-0.5 bg-[#1ba0be]" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-sans text-lg sm:text-xl md:text-2xl text-slate-950 font-bold tracking-tight">
                        {isMathworks ? 'dharmenthira boopathi S' : profile.name}
                      </h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
                        has successfully completed <strong className="text-slate-800 font-bold">100%</strong> of the self-paced training course
                      </p>
                    </div>

                    <div className="py-2 px-3 bg-slate-50 border-l-4 border-[#1ba0be] rounded-r-lg shadow-sm">
                      <span className="text-slate-900 text-xs sm:text-sm md:text-base font-black tracking-tight block leading-tight">
                        {viewingCertificate.title}
                      </span>
                    </div>
                  </div>

                  {/* Signatures Footer Row */}
                  <div className="flex justify-between items-end border-t border-slate-100 pt-4 z-10 sm:max-w-[58%] text-left">
                    <div className="space-y-1">
                      {/* Interactive Sign */}
                      <div className="h-8 flex items-end">
                        <CraigSantosSignature />
                      </div>
                      <div className="w-32 h-[1px] bg-slate-200" />
                      <span className="text-[8px] font-mono text-slate-400 block font-bold mt-1">
                        DIRECTOR, TRAINING SERVICES
                      </span>
                    </div>

                    <div className="text-right space-y-0.5">
                      <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold tracking-wider">
                        DATE OF ISSUE
                      </span>
                      <span className="text-slate-800 font-sans text-[11px] sm:text-xs font-bold block">
                        {viewingCertificate.date}
                      </span>
                    </div>
                  </div>

                </div>
              ) : (
                /* Theme 2: PREMIUM DIGITAL DARK (Modern Ambient HUD Layout) */
                <div className="border-4 border-double border-indigo-500/20 bg-slate-950 p-6 sm:p-8 rounded-lg text-center space-y-6 relative overflow-hidden select-none min-h-[360px] flex flex-col justify-between transition-all">
                  
                  {/* Decorative mesh background watermark */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rotate-45 transform translate-x-12 -translate-y-12 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rotate-45 transform -translate-x-12 translate-y-12 pointer-events-none" />

                  <div className="space-y-2">
                    <div className="text-[9px] font-mono tracking-[0.25em] text-indigo-400 uppercase font-bold">CERTIFICATE OF TRAINING ACHIEVEMENT</div>
                    <div className="w-8 h-1 bg-indigo-500/30 mx-auto rounded" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-sans text-xl sm:text-3xl text-white font-extrabold tracking-tight">
                      {isMathworks ? 'Dharmenthira Boopathi S' : profile.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                      Is hereby accredited with high technical distinction for outstanding completion of the verified curriculum <span className="font-semibold text-white">{viewingCertificate.title}</span> awarded under structural standards of <span className="font-semibold text-indigo-300">{viewingCertificate.organization}</span>.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-between items-end text-[10px] font-mono text-slate-500 uppercase border-t border-slate-900">
                    <div className="text-left space-y-1">
                      <div>COMPLETED DATE:</div>
                      <div className="text-slate-300 font-bold">{viewingCertificate.date}</div>
                    </div>

                    <div className="relative w-10 h-10 flex items-center justify-center text-2xl shrink-0">
                      {viewingCertificate.badgeUrl || '🏅'}
                    </div>

                    <div className="text-right space-y-1">
                      <div>VERIFIED CREDENTIAL:</div>
                      <div className="text-indigo-400 font-bold">DB-{viewingCertificate.id.toUpperCase()}</div>
                    </div>
                  </div>

                </div>
              )}

              {/* Action buttons footer */}
              <div className="mt-5 flex justify-between items-center text-xs pt-1">
                <button
                  id="close-cert-bottom-btn"
                  onClick={() => setViewingCertificate(null)}
                  className="text-slate-500 hover:text-slate-300 uppercase tracking-wider font-mono cursor-pointer"
                >
                  Close View
                </button>

                <button
                  id="print-cert-btn"
                  onClick={() => window.print()}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Print / Save PDF
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
