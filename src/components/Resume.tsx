import React, { useState } from 'react';
import { BookOpen, Briefcase, Award, Printer, Download, Star, Sparkles, Cpu, Layers } from 'lucide-react';
import { ProfileInfo, Experience, Education, Skill, Achievement } from '../types';

interface ResumeProps {
  profile: ProfileInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  achievements: Achievement[];
}

export default function Resume({ profile, experiences, educations, skills, achievements }: ResumeProps) {
  const [showPrintView, setShowPrintView] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const programmingSkills = skills.filter(s => s.category === 'programming').map(s => s.name).join(', ');
  const frontendSkills = skills.filter(s => s.category === 'frontend').map(s => s.name).join(', ');
  const backendSkills = skills.filter(s => s.category === 'backend').map(s => s.name).join(', ');
  const aiSkills = skills.filter(s => s.category === 'ai').map(s => s.name).join(', ');
  const devopsSkills = skills.filter(s => s.category === 'devops' || s.category === 'cloud').map(s => s.name).join(', ');

  return (
    <div className="font-sans text-[#d6d6d6] animate-fade-in space-y-10">
      
      {/* Title block */}
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#ff8c00] p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center text-[#ffdb70]">
              <Layers className="w-5 h-5 text-[#ff8c00]" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ffdb70] to-[#ff8c00]">Resume</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff8c00] rounded-full mt-1.5 shadow-[0_0_10px_#00f0ff]" />
          </div>
        </div>

        {/* Action bar for Quick Download */}
        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={() => {
              if (!showPrintView) setShowPrintView(true);
              setTimeout(() => handlePrint(), 200);
            }}
            className="btn-3d-orange flex items-center gap-2 text-black font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer uppercase tracking-wider"
            title="Download PDF Resume"
          >
            <Download className="w-4 h-4 text-black font-black" />
            <span>DOWNLOAD</span>
          </button>
        </div>
      </header>

      {/* Moved DOWNLOAD button bar below header as requested */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#18181e] via-[#14141a] to-[#18181e] border border-[#ff8c00]/40 rounded-2xl p-4 shadow-[0_8px_25px_rgba(0,0,0,0.8)] print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1e1e26] border border-[#ff8c00]/60 flex items-center justify-center text-[#ff8c00] shrink-0">
            <Sparkles className="w-4 h-4 text-[#ff8c00]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Curriculum Vitae & Print Export</h4>
            <p className="text-[11px] text-slate-400 font-mono">Download clean printable PDF with candidate photo & verified credentials</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPrintView(!showPrintView)}
            className="btn-3d-cyber flex items-center gap-2 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#00f0ff]" />
            <span>{showPrintView ? "Hide Preview" : "View Printable Sheet"}</span>
          </button>

          <button
            onClick={() => {
              setShowPrintView(true);
              setTimeout(() => handlePrint(), 200);
            }}
            className="btn-3d-orange flex items-center gap-2 text-black font-extrabold text-xs px-6 py-2.5 rounded-xl cursor-pointer uppercase tracking-wider shadow-[0_0_15px_rgba(255,140,0,0.4)]"
          >
            <Download className="w-4 h-4 text-black" />
            <span>DOWNLOAD</span>
          </button>
        </div>
      </div>

      {showPrintView ? (
        /* Printable sheet with Photo & Cyber Frames */
        <div id="printable-resume-sheet" className="space-y-6 print:block bg-[#141418] border-2 border-[#ff8c00] rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(255,140,0,0.3)] relative overflow-hidden">
          
          {/* Header Card with Photo & Contact details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-[#383838]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* My Photo in Printable Resume */}
              {profile.avatar && (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-[#ff8c00] overflow-hidden shrink-0 shadow-[0_0_20px_rgba(255,140,0,0.4)] bg-[#0a0a0c]">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">{profile.name}</h1>
                <p className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest font-bold">{profile.title}</p>
                
                <div className="pt-2 text-xs text-slate-300 space-y-1 font-mono">
                  <p>📧 {profile.email} | 📞 {profile.phone}</p>
                  <p>📍 {profile.location} | 🎂 {profile.birthday || "14-June-2008"}</p>
                  <p>🔗 {profile.github}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 print:hidden">
              <button
                onClick={handlePrint}
                className="btn-3d-cyber inline-flex items-center px-4 py-2.5 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                <Printer className="w-4 h-4 mr-2 text-[#00f0ff]" />
                Print Resume
              </button>
              <button
                onClick={handlePrint}
                className="btn-3d-orange inline-flex items-center px-5 py-2.5 text-black rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(255,140,0,0.5)]"
              >
                <Download className="w-4 h-4 mr-2 text-black" />
                DOWNLOAD PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-8 space-y-6 text-xs sm:text-sm">
              <div className="space-y-4">
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-[#383838] pb-1.5 flex items-center text-[#ff8c00]">
                  <Briefcase className="w-4 h-4 text-[#00f0ff] mr-2" />
                  Experience
                </h2>
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-2 bg-[#1a1a20] p-4 rounded-xl border border-[#383838]">
                    <div className="flex justify-between font-bold text-white">
                      <span>{exp.position}</span>
                      <span className="text-[#00f0ff] font-mono text-xs">{exp.duration}</span>
                    </div>
                    <div className="text-[#ffdb70] text-xs font-mono font-bold">{exp.company}</div>
                    
                    <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-1 leading-relaxed text-xs pt-1">
                      {exp.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>

                    {/* Skill Tags */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.technologies.map((tech, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#121216] border border-[#ff8c00]/40 text-[#ffdb70] rounded font-mono text-[10px] font-bold uppercase">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-[#383838] pb-1.5 flex items-center text-[#00f0ff]">
                  <BookOpen className="w-4 h-4 text-[#ff8c00] mr-2" />
                  Education
                </h2>
                {educations.map((edu) => (
                  <div key={edu.id} className="space-y-1 bg-[#1a1a20] p-4 rounded-xl border border-[#383838]">
                    <div className="flex justify-between font-bold text-white">
                      <span>{edu.degree}</span>
                      <span className="text-[#ff8c00] font-mono text-xs">{edu.graduationYear}</span>
                    </div>
                    <div className="text-slate-300 text-xs">{edu.university}</div>
                    <div className="text-xs text-slate-400 font-mono">Status: <span className="text-[#00f0ff] font-bold">{edu.cgpa}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 space-y-6 text-xs">
              <div className="space-y-2 bg-[#1a1a20] p-4 rounded-xl border border-[#383838]">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#383838] pb-1 text-[#00f0ff]">Summary</h2>
                <p className="leading-relaxed text-slate-300">{profile.bio}</p>
              </div>

              <div className="space-y-3 bg-[#1a1a20] p-4 rounded-xl border border-[#383838]">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#383838] pb-1 text-[#ff8c00]">Specializations & Tech</h2>
                <div className="space-y-2">
                  {programmingSkills && (
                    <div>
                      <span className="font-bold text-[#00f0ff] block">Languages:</span>
                      <span className="text-slate-300">{programmingSkills}</span>
                    </div>
                  )}
                  {frontendSkills && (
                    <div>
                      <span className="font-bold text-[#ff8c00] block">Frontend & Full Stack:</span>
                      <span className="text-slate-300">{frontendSkills}</span>
                    </div>
                  )}
                  {backendSkills && (
                    <div>
                      <span className="font-bold text-[#ffdb70] block">Backend Developer:</span>
                      <span className="text-slate-300">{backendSkills}</span>
                    </div>
                  )}
                  {aiSkills && (
                    <div>
                      <span className="font-bold text-[#00f0ff] block">AI & Investing:</span>
                      <span className="text-slate-300">{aiSkills}</span>
                    </div>
                  )}
                  {devopsSkills && (
                    <div>
                      <span className="font-bold text-[#ff8c00] block">Security & Systems:</span>
                      <span className="text-slate-300">{devopsSkills}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Cyber Layout: Timelines & Glowing 3D Skill Bars */
        <div className="space-y-12">
          
          {/* Skills Section with Glowing Progress Bars */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff8c00]/20 to-[#00f0ff]/20 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-white uppercase font-sans tracking-wide">Development & Expertise</h3>
            </div>

            <div className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#00f0ff]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-2 group">
                  <div className="flex items-center justify-between text-xs font-semibold font-sans">
                    <h5 className="text-white font-bold text-sm group-hover:text-[#00f0ff] transition-colors flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#ff8c00]" />
                      <span>{skill.name}</span>
                    </h5>
                    <span className="text-[#ffdb70] font-mono font-bold">{skill.level}%</span>
                  </div>
                  
                  {/* Outer container */}
                  <div className="w-full h-2.5 bg-[#121216] border border-[#383838] rounded-full overflow-hidden p-0.5 shadow-inner">
                    {/* Inner progress fill bar with glow */}
                    <div 
                      className="h-full bg-gradient-to-r from-[#ff8c00] via-[#ffdb70] to-[#00f0ff] rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff8c00]/20 to-[#00f0ff]/20 border border-[#ff8c00]/40 flex items-center justify-center text-[#ff8c00] shrink-0 shadow-[0_0_15px_rgba(255,140,0,0.3)]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-white uppercase font-sans tracking-wide">Work Experience</h3>
            </div>

            <ol className="relative border-l-2 border-[#ff8c00]/40 ml-5.5 pl-6 space-y-8 text-left">
              {experiences.map((exp) => (
                <li key={exp.id} className="relative group">
                  {/* Timeline bullet laser dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#00f0ff] border-2 border-[#0a0a0c] shadow-[0_0_12px_#00f0ff] group-hover:scale-125 transition-transform" />
                  
                  <div className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#383838] group-hover:border-[#00f0ff] rounded-2xl p-6 shadow-[0_8px_25px_rgba(0,0,0,0.7)] space-y-3 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-extrabold text-base text-white group-hover:text-[#00f0ff] transition-colors">{exp.position}</h4>
                      <span className="px-3 py-1 bg-[#1e1e26] text-[#ff8c00] border border-[#ff8c00]/30 rounded-full text-xs font-bold font-mono shadow-[0_0_10px_rgba(255,140,0,0.2)]">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-xs text-[#ffdb70] font-mono font-bold">{exp.company}</p>
                    
                    <ul className="list-disc list-inside space-y-2 pl-1 text-xs text-[#c8c8c8] leading-relaxed pt-2">
                      {exp.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>

                    {/* All 9 requested Specializations Tags */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="pt-3 border-t border-[#383838]/60 flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-1 bg-[#121216] border border-[#ff8c00]/50 hover:border-[#00f0ff] text-[#00f0ff] rounded-lg font-mono text-[10px] font-black uppercase tracking-wider shadow-[0_0_8px_rgba(0,240,255,0.2)] transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Education Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00f0ff]/20 to-[#ff8c00]/20 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-white uppercase font-sans tracking-wide">Education</h3>
            </div>

            <ol className="relative border-l-2 border-[#00f0ff]/40 ml-5.5 pl-6 space-y-8 text-left">
              {educations.map((edu) => (
                <li key={edu.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#ff8c00] border-2 border-[#0a0a0c] shadow-[0_0_12px_#ff8c00] group-hover:scale-125 transition-transform" />
                  
                  <div className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#383838] group-hover:border-[#ff8c00] rounded-2xl p-6 shadow-[0_8px_25px_rgba(0,0,0,0.7)] space-y-2 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-extrabold text-base text-white group-hover:text-[#ff8c00] transition-colors">{edu.degree}</h4>
                      <span className="px-3 py-1 bg-[#1e1e26] text-[#00f0ff] border border-[#00f0ff]/30 rounded-full text-xs font-bold font-mono shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                        {edu.graduationYear}
                      </span>
                    </div>
                    <p className="text-xs text-[#d6d6d6] font-medium">{edu.university}</p>
                    {edu.cgpa && (
                      <p className="text-xs text-[#00f0ff] font-mono leading-relaxed pt-1 font-bold">
                        Academic Standing: <span className="text-[#ffdb70]">{edu.cgpa}</span>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Achievements Milestones */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff8c00]/20 to-[#ffdb70]/20 border border-[#ffdb70]/40 flex items-center justify-center text-[#ffdb70] shrink-0 shadow-[0_0_15px_rgba(255,219,112,0.3)]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-white uppercase font-sans tracking-wide">Milestones & Certifications</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              {achievements.map((ach) => (
                <div 
                  key={ach.id} 
                  className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#383838] hover:border-[#00f0ff] rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 flex gap-4 items-start shadow-[0_8px_25px_rgba(0,0,0,0.7)] group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1e1e26] border border-[#ff8c00]/40 group-hover:border-[#00f0ff] flex items-center justify-center text-2xl select-none shrink-0 shadow-md">
                    {ach.badgeUrl || "🏆"}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] text-[#00f0ff] font-bold tracking-wider font-mono uppercase">{ach.date}</span>
                    <h4 className="font-extrabold text-white text-sm truncate leading-snug group-hover:text-[#ffdb70] transition-colors">{ach.title}</h4>
                    <p className="text-xs text-[#ff8c00] font-mono font-bold truncate">{ach.organization}</p>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed pt-1.5 line-clamp-2">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prominent Bottom DOWNLOAD Action Button */}
          <div className="pt-6 border-t border-[#383838] flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-br from-[#18181e] to-[#121216] p-6 rounded-3xl border border-[#ff8c00]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="text-center sm:text-left space-y-1">
              <h4 className="text-base font-extrabold text-white uppercase font-sans">Ready for full resume export?</h4>
              <p className="text-xs text-slate-400 font-mono">Generates a high-definition PDF printable document with contact links & avatar image.</p>
            </div>
            
            <button
              onClick={() => {
                setShowPrintView(true);
                setTimeout(() => handlePrint(), 200);
              }}
              className="btn-3d-orange inline-flex items-center gap-2 px-8 py-3.5 text-black rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer shadow-[0_0_20px_rgba(255,140,0,0.6)] hover:scale-105 transition-all"
            >
              <Download className="w-5 h-5 text-black" />
              <span>DOWNLOAD</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

