import React, { useState } from 'react';
import { Award, CheckCircle2, Star, Sparkles, Filter } from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Stack' },
    { id: 'programming', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Databases' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'devops', label: 'DevOps' },
    { id: 'ai', label: 'AI & ML' }
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  const overallAverage = skills.length > 0
    ? Math.round(skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length)
    : 0;

  const currentAverage = filteredSkills.length > 0
    ? Math.round(filteredSkills.reduce((acc, curr) => acc + curr.level, 0) / filteredSkills.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100 font-sans">
      
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Technical <span className="text-indigo-400">Skill Inventory</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          A breakdown of languages, frameworks, developer tools, and operational competencies.
        </p>
      </div>

      {/* Category Pills Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            id={`skill-filter-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/15'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Dynamic Performance Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold tracking-wider">Overall Average Performance</span>
            <span className="text-2xl font-extrabold text-indigo-400 font-mono mt-1 block">{overallAverage}%</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-950/40 border border-indigo-900/50 flex items-center justify-center text-indigo-400 font-bold font-mono">
            Σ
          </div>
        </div>

        <div className="bg-slate-900/50 border border-indigo-500/20 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold tracking-wider">Current Category Average</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono mt-1 block">{currentAverage}%</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-950/40 border border-emerald-900/50 flex items-center justify-center text-emerald-400 font-bold font-mono">
            μ
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold tracking-wider">Active Inventory Count</span>
            <span className="text-2xl font-extrabold text-purple-400 font-mono mt-1 block">{filteredSkills.length} Techs</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-900/50 flex items-center justify-center text-purple-400 font-bold font-mono">
            #
          </div>
        </div>
      </div>

      {/* Grid of Skill Cards & Progress Lines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map(skill => {
          // Circular progress dimensions
          const radius = 28;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (skill.level / 100) * circumference;

          return (
            <div
              key={skill.id}
              className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 hover:translate-y-[-2px] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-slate-100 group-hover:text-indigo-400 transition-colors">
                    {skill.name}
                  </h4>
                  <div className="flex items-center text-[11px] text-slate-400 font-mono uppercase">
                    <span className="px-1.5 py-0.5 bg-slate-950 border border-slate-800/60 rounded">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Circular Chart Representation */}
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Circle Background */}
                    <circle
                      cx="32"
                      cy="32"
                      r={radius}
                      className="stroke-slate-800"
                      strokeWidth="4"
                      fill="transparent"
                    />
                    {/* Circle Foreground */}
                    <circle
                      cx="32"
                      cy="32"
                      r={radius}
                      className="stroke-indigo-500 group-hover:stroke-indigo-400 transition-colors"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-mono font-bold text-slate-300 group-hover:text-white transition-colors">
                    {skill.level}%
                  </span>
                </div>
              </div>

              {/* Progress Line Bar */}
              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-slate-300">{skill.level}/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 group-hover:from-indigo-400 group-hover:to-purple-400 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Years Experience Metric */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Experience Duration</span>
                <span className="text-slate-200 font-semibold">{skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'Year' : 'Years'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra Skill Summary Stats Badge Footer */}
      <div className="mt-12 p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-indigo-400 font-mono">{skills.length}</div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Competencies</div>
        </div>
        <div className="space-y-1 sm:border-x sm:border-slate-800">
          <div className="text-2xl font-extrabold text-indigo-400 font-mono">
            {skills.filter(s => s.level >= 90).length}
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Expertise Levels (90%+)</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-indigo-400 font-mono">
            {Math.round(skills.reduce((acc, curr) => acc + curr.yearsOfExperience, 0) / skills.length || 0)} Yrs
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Average Exp Per Skill</div>
        </div>
      </div>

    </div>
  );
}
