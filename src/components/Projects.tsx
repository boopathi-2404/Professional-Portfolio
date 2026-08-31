import React, { useState } from 'react';
import { Search, ExternalLink, Github, BookOpen, Clock, Layers, Sparkles, X, Globe, Shield, Smartphone, FolderGit2 } from 'lucide-react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Derive categories dynamically from project list
  const rawCategories = Array.from(new Set(projects.map(p => p.category.trim().toLowerCase())));
  const categories = ['all', ...rawCategories];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web':
        return <Globe className="w-3.5 h-3.5" />;
      case 'mobile':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'ai':
        return <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#ff8c00]" />;
      case 'security':
        return <Shield className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  const getProjectCount = (category: string) => {
    if (category === 'all') return projects.length;
    return projects.filter(p => p.category.trim().toLowerCase() === category).length;
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' ||
      project.category.trim().toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="font-sans text-[#d6d6d6] animate-fade-in space-y-12">
      
      {/* Title block with Cyber Outlines */}
      <header className="mb-8 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff8c00] to-[#00f0ff] p-0.5 shadow-[0_0_15px_rgba(255,140,0,0.5)]">
            <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center text-[#ffdb70]">
              <FolderGit2 className="w-5 h-5 text-[#00f0ff]" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] via-[#ffdb70] to-[#00f0ff]">Portfolio</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c00] to-[#00f0ff] rounded-full mt-1.5 shadow-[0_0_10px_#ff8c00]" />
          </div>
        </div>
      </header>

      {/* Filter and Search Bar with 3D Pulsing Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-6 border-b border-[#383838]">
        
        {/* Category selection list */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-medium">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = getProjectCount(cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-xl capitalize transition-all duration-300 flex items-center gap-2 font-bold cursor-pointer select-none ${
                  isActive
                    ? 'btn-3d-orange text-black shadow-[0_0_15px_rgba(255,140,0,0.5)]'
                    : 'bg-[#18181e] border border-[#383838] text-slate-300 hover:border-[#00f0ff] hover:text-[#00f0ff]'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat === 'all' ? 'All Systems' : cat}</span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono leading-none font-black transition-colors ${
                  isActive 
                    ? 'bg-black text-[#ff8c00]' 
                    : 'bg-[#101014] text-[#00f0ff]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00f0ff]" />
          <input
            type="text"
            placeholder="Search projects or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#101014] border border-[#ff8c00]/40 focus:border-[#00f0ff] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none placeholder-slate-500 transition-all shadow-[0_0_10px_rgba(0,0,0,0.8)]"
          />
        </div>

      </div>

      {/* Projects Cards Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isFeatured = project.id === 'proj1' || project.name.toLowerCase().includes('noval reading') || project.demoUrl.includes('kaviyam-reading');
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`bg-gradient-to-br from-[#18181e] to-[#121216] border rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] group cursor-pointer hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between min-h-[380px] relative ${
                  isFeatured 
                    ? 'border-[#ff8c00] ring-1 ring-[#ff8c00]/50 shadow-[0_0_25px_rgba(255,140,0,0.3)]' 
                    : 'border-[#383838] hover:border-[#00f0ff]'
                }`}
              >
                
                {/* Card Header */}
                <div className="p-5 pb-3 border-b border-[#383838] flex items-center justify-between bg-[#101014]/80">
                  <div className="w-10 h-10 rounded-xl bg-[#1e1e26] border border-[#ff8c00]/40 group-hover:border-[#00f0ff] text-[#00f0ff] flex items-center justify-center shrink-0 shadow-md">
                    {getCategoryIcon(project.category)}
                  </div>

                  <div className="flex items-center gap-2">
                    {isFeatured && (
                      <span className="px-2.5 py-0.5 bg-gradient-to-r from-[#ff8c00] to-[#ffdb70] text-black font-sans text-[9px] font-black uppercase rounded-lg shadow-[0_0_10px_rgba(255,140,0,0.5)] flex items-center gap-1">
                        <span>★</span> <span>Featured</span>
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 bg-[#0a0a0c] border border-[#383838] text-[#00f0ff] font-mono text-[9px] uppercase font-bold rounded-lg flex items-center gap-1">
                      {getCategoryIcon(project.category)}
                      <span>{project.category}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-white group-hover:text-[#ffdb70] transition-colors leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies List */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-[#101014] border border-[#383838] rounded-md font-mono text-[9px] text-[#00f0ff] font-bold">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 bg-[#101014] border border-[#383838] rounded-md font-mono text-[9px] text-[#ff8c00] font-bold">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links row */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#383838] text-[11px] font-semibold text-slate-300 font-mono">
                    <span className="text-[#00f0ff] group-hover:underline flex items-center gap-1 font-bold">
                      <BookOpen className="w-3.5 h-3.5 text-[#ff8c00]" />
                      View Case Study
                    </span>

                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff8c00] transition-colors" title="Codebase">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#00f0ff] transition-colors" title="Launch live app">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-[#101014] border border-dashed border-[#ff8c00]/40 rounded-2xl space-y-2">
          <p className="text-slate-400 font-mono text-xs">No matching cyber project modules found.</p>
          <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="text-xs font-mono text-[#00f0ff] font-bold hover:underline cursor-pointer">
            Reset Filters
          </button>
        </div>
      )}

      {/* Project Case Study Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div
            className="bg-[#141418] border-2 border-[#00f0ff] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,240,255,0.4)] relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close button top right */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-[#1e1e26] border border-[#00f0ff] p-2 rounded-xl text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all cursor-pointer shadow-md"
            >
              <X className="w-4 h-4 font-bold" />
            </button>

            {/* Modal Hero Banner */}
            <div className="p-6 pb-4 border-b border-[#383838] bg-[#0a0a0c] pt-8">
              <span className="px-2.5 py-0.5 bg-[#00f0ff] text-black font-mono text-[9px] uppercase font-bold rounded-lg inline-flex items-center gap-1 shadow-[0_0_10px_#00f0ff]">
                {getCategoryIcon(selectedProject.category)}
                <span>{selectedProject.category}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2 uppercase tracking-wide">{selectedProject.name}</h3>
            </div>

            {/* Modal Body text */}
            <div className="p-6 space-y-6 text-xs sm:text-sm text-[#d6d6d6]">
              
              {/* Metadata block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0a0a0c] border border-[#383838] p-4 rounded-xl font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ff8c00]" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">DURATION</span>
                    <span className="text-white font-bold">{selectedProject.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00f0ff]" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">CATEGORY</span>
                    <span className="text-white font-bold uppercase">{selectedProject.category}</span>
                  </div>
                </div>
              </div>

              {/* Summary paragraph */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">Description & Architecture</h4>
                <p className="leading-relaxed text-[#c8c8c8]">{selectedProject.description}</p>
              </div>

              {/* Technologies List */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#00f0ff] font-mono text-[10px] uppercase tracking-wider">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-[#0a0a0c] border border-[#ff8c00]/40 rounded-lg font-mono text-xs text-white font-bold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Key Engineering Features</h4>
                <ul className="list-disc list-inside space-y-1 text-[#c8c8c8] leading-relaxed pl-1">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Direct Link 3D actions */}
              <div className="pt-4 border-t border-[#383838] flex flex-col sm:flex-row items-center sm:justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d-cyber inline-flex items-center px-4 py-2.5 text-white rounded-xl font-bold cursor-pointer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d-orange inline-flex items-center px-4 py-2.5 text-black rounded-xl font-bold cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 text-black" />
                    Live Demo
                  </a>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-white uppercase font-bold tracking-wider cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

