import React, { useState } from 'react';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Eye, X } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogProps {
  blogs: BlogPost[];
  authorName: string;
}

export default function Blog({ blogs, authorName }: BlogProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const rawCategories = Array.from(new Set(blogs.map(b => b.category.trim().toLowerCase())));
  const categories = ['all', ...rawCategories];

  const filteredBlogs = selectedCategory === 'all'
    ? blogs
    : blogs.filter(blog => blog.category.trim().toLowerCase() === selectedCategory);

  // Custom Sadee-style Markdown renderer with golden highlights and elegant code frames
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeContent: string[] = [];
    const elements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      // Code block delimiter
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="bg-[#121212] border border-[#383838] p-4 rounded-xl font-mono text-xs overflow-x-auto text-[#ffdb70]/90 my-4 leading-relaxed">
              <code>{codeContent.join('\n')}</code>
            </pre>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Headings
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={index} className="text-lg sm:text-xl font-bold text-[#fafafa] mt-6 mb-3 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-1 after:bg-[#ffdb70] after:rounded-full">
            {line.substring(3)}
          </h3>
        );
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={index} className="text-base font-bold text-[#fafafa] mt-5 mb-2">
            {line.substring(4)}
          </h4>
        );
        return;
      }

      // Bullet points
      if (line.trim().startsWith('- ')) {
        elements.push(
          <div key={index} className="flex items-start gap-2 my-1.5 pl-2 text-xs sm:text-sm">
            <span className="text-[#ffdb70] font-bold select-none">•</span>
            <p className="text-[#d6d6d6] leading-relaxed">{line.trim().substring(2)}</p>
          </div>
        );
        return;
      }

      // Empty spacing
      if (line.trim() === '') {
        elements.push(<div key={index} className="h-3" />);
      } else {
        // Handle bold and inline backticks
        const parts = line.split('**');
        const formattedLine = parts.map((part, i) => {
          if (i % 2 === 1) {
            return <strong key={i} className="text-[#fafafa] font-bold">{part}</strong>;
          }
          const subparts = part.split('`');
          return subparts.map((subpart, j) => {
            if (j % 2 === 1) {
              return <code key={j} className="bg-[#121212] px-1.5 py-0.5 rounded font-mono text-xs text-[#ffdb70] border border-[#383838]">{subpart}</code>;
            }
            return subpart;
          });
        });

        elements.push(
          <p key={index} className="text-[#d6d6d6] text-xs sm:text-sm leading-relaxed my-2">
            {formattedLine}
          </p>
        );
      }
    });

    return <div className="space-y-1">{elements}</div>;
  };

  return (
    <div className="font-sans text-[#d6d6d6] animate-fade-in space-y-12">
      
      {!selectedBlog ? (
        <>
          {/* Title block */}
          <header className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#fafafa] relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1.5 after:bg-[#ffdb70] after:rounded-full">
              Blog
            </h2>
          </header>

          {/* Categories bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium text-slate-400 pb-6 border-b border-[#383838]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3 rounded-lg capitalize transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'text-[#ffdb70] font-semibold bg-[#212123] border border-[#383838]'
                    : 'hover:text-[#ffd350]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Blogs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="bg-gradient-to-br from-[#212123] to-[#1e1e1f] border border-[#383838] rounded-2xl overflow-hidden shadow-lg group cursor-pointer hover:border-[#383838]/80 hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Blog Header without image */}
                <div className="p-4 pb-2 border-b border-[#383838]/60 bg-[#121212]/40 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-[#121212] border border-[#383838] text-[#ffdb70] font-mono text-[9px] uppercase font-bold rounded-lg">
                    {blog.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{blog.readTime}</span>
                </div>

                {/* Blog content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#ffdb70]" />
                        {blog.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#ffdb70]" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-[#fafafa] group-hover:text-[#ffdb70] transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-[#d6d6d6] line-clamp-3 leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#383838]/60 flex items-center justify-between text-xs font-bold text-[#ffdb70] group-hover:text-[#ffd350] font-mono">
                    <span className="inline-flex items-center">
                      Read Full Article
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-16 bg-[#121212]/50 border border-dashed border-[#383838] rounded-2xl">
              <p className="text-slate-500 font-mono text-xs">No journal articles found.</p>
            </div>
          )}
        </>
      ) : (
        /* Blog Reader Details */
        <div className="max-w-2xl mx-auto space-y-6 text-left animate-fade-in">
          
          {/* Back Action */}
          <button
            onClick={() => setSelectedBlog(null)}
            className="inline-flex items-center gap-1.5 bg-[#2b2b2c] border border-[#383838] text-xs font-semibold px-4 py-2 rounded-xl text-white hover:text-[#ffdb70] hover:bg-[#323233] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          {/* Header titles */}
          <div className="space-y-3 pt-2">
            <span className="px-2.5 py-0.5 bg-[#121212] border border-[#383838] text-[#ffdb70] font-mono text-[10px] uppercase font-bold rounded-lg">
              {selectedBlog.category}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#fafafa] tracking-tight leading-snug">
              {selectedBlog.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-mono uppercase pb-4 border-b border-[#383838]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#ffdb70]" />
                {selectedBlog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#ffdb70]" />
                {selectedBlog.readTime}
              </span>
              <span>•</span>
              <span className="hidden sm:inline">Author: {authorName}</span>
            </div>
          </div>

          {/* Formatted body article content */}
          <article className="space-y-1">
            {renderMarkdown(selectedBlog.content)}
          </article>

          {/* Bottom Footer block */}
          <div className="pt-6 border-t border-[#383838] flex items-center justify-between text-xs font-mono">
            <button
              onClick={() => setSelectedBlog(null)}
              className="text-slate-500 hover:text-slate-300 font-bold uppercase cursor-pointer"
            >
              Finish reading
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Article URL copied to clipboard!");
              }}
              className="inline-flex items-center gap-1.5 bg-[#2b2b2c] border border-[#383838] px-3.5 py-1.5 rounded-xl text-white hover:text-[#ffdb70] hover:bg-[#323233] transition-all cursor-pointer font-bold"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Article</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
