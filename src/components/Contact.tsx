import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Calendar, Github, Linkedin, Twitter, Facebook, Instagram, ExternalLink, Star, MessageSquare, Compass } from 'lucide-react';
import { ProfileInfo } from '../types';
import InteractiveMap from './InteractiveMap';

const TelegramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-2.31 1.49-3.26 2.1-.5.32-.96.48-1.38.47-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.45 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.34z"/>
  </svg>
);

interface ContactProps {
  profile: ProfileInfo;
  addMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<boolean>;
}

export default function Contact({ profile, addMessage }: ContactProps) {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    category: 'Portfolio Feedback', 
    rating: 5, 
    subject: '', 
    message: '' 
  });
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const categories = [
    { id: 'Portfolio Feedback', label: '⭐ Portfolio Feedback' },
    { id: 'General Inquiry', label: '💬 General Inquiry' },
    { id: 'Project Opportunity', label: '🚀 Project Opportunity' },
    { id: 'Bug / Suggestion', label: '💡 Bug / Suggestion' }
  ];

  const ratingLabels = ['', 'Needs Work', 'Fair', 'Good', 'Very Good', 'Excellent!'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("All mandatory fields (Name, Email, Message) must be filled.");
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const formattedSubject = formData.subject.trim() 
        ? `[${formData.category}] ${formData.subject}`
        : `[${formData.category}] Rating: ${formData.rating}/5 Stars`;

      const formattedMessage = `Rating: ${'★'.repeat(formData.rating)}${'☆'.repeat(5 - formData.rating)} (${formData.rating}/5 - ${ratingLabels[formData.rating]})\nCategory: ${formData.category}\n\nMessage / Feedback:\n${formData.message}`;

      const submitted = await addMessage({
        name: formData.name,
        email: formData.email,
        subject: formattedSubject,
        message: formattedMessage
      });

      if (submitted) {
        setSuccess(true);
        setFormData({ name: '', email: '', category: 'Portfolio Feedback', rating: 5, subject: '', message: '' });
      } else {
        setErrorMsg("Failed to deliver your message. Let's try again.");
      }
    } catch (err: any) {
      setErrorMsg(`Error: ${err.message || 'Delivery failed'}`);
    } finally {
      setLoading(false);
    }
  };

  const mapDirectionUrl = "https://www.google.com/maps/dir/?api=1&destination=Sri+Ramakrishna+Institute+of+Technology,+Coimbatore";
  const calendarUrl = "https://calendar.google.com/calendar/u/0/r";

  return (
    <div className="font-sans text-[#d6d6d6] animate-fade-in space-y-10">
      
      {/* Title block with Cyber Outlines */}
      <header className="mb-8 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff8c00] to-[#00f0ff] p-0.5 shadow-[0_0_15px_rgba(255,140,0,0.5)]">
            <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center text-[#ffdb70]">
              <Compass className="w-5 h-5 text-[#ff8c00]" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Contact & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] via-[#ffdb70] to-[#00f0ff]">Feedback</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c00] to-[#00f0ff] rounded-full mt-1.5 shadow-[0_0_10px_#ff8c00]" />
          </div>
        </div>
      </header>

      {/* Quick Interactive 3D Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Phone Card */}
        <a 
          href={`tel:${profile.phone.replace(/\s+/g, '')}`} 
          className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#ff8c00]/40 hover:border-[#ff8c00] rounded-2xl p-4 flex items-center gap-3.5 group transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_20px_rgba(255,140,0,0.2)] cursor-pointer"
          title="Click to dial phone number"
        >
          <div className="w-11 h-11 rounded-xl bg-[#1e1e26] border border-[#ff8c00]/60 flex items-center justify-center text-[#ff8c00] group-hover:bg-[#ff8c00] group-hover:text-black transition-all shrink-0 shadow-[0_0_12px_rgba(255,140,0,0.3)]">
            <Phone className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider">Phone / Dial</p>
            <p className="text-xs font-bold text-white group-hover:text-[#ffdb70] truncate transition-colors">{profile.phone}</p>
          </div>
        </a>

        {/* Email Card */}
        <a 
          href={`mailto:${profile.email}`} 
          className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#00f0ff]/40 hover:border-[#00f0ff] rounded-2xl p-4 flex items-center gap-3.5 group transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_20px_rgba(0,240,255,0.2)] cursor-pointer"
          title="Click to send an email"
        >
          <div className="w-11 h-11 rounded-xl bg-[#1e1e26] border border-[#00f0ff]/60 flex items-center justify-center text-[#00f0ff] group-hover:bg-[#00f0ff] group-hover:text-black transition-all shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
            <Mail className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider">Gmail / Mail</p>
            <p className="text-xs font-bold text-white group-hover:text-[#00f0ff] truncate transition-colors">{profile.email}</p>
          </div>
        </a>

        {/* Birthday Card */}
        <a 
          href={calendarUrl}
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#ffdb70]/40 hover:border-[#ffdb70] rounded-2xl p-4 flex items-center gap-3.5 group transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_20px_rgba(255,219,112,0.2)] cursor-pointer"
          title="Click to open Google Calendar"
        >
          <div className="w-11 h-11 rounded-xl bg-[#1e1e26] border border-[#ffdb70]/60 flex items-center justify-center text-[#ffdb70] group-hover:bg-[#ffdb70] group-hover:text-black transition-all shrink-0 shadow-[0_0_12px_rgba(255,219,112,0.3)]">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider">Birthday / Calendar</p>
            <p className="text-xs font-bold text-white group-hover:text-[#ffdb70] truncate transition-colors">{profile.birthday || "14-June-2008"}</p>
          </div>
        </a>

        {/* Location / Google Maps Direction Card for SRIT Coimbatore */}
        <a 
          href={mapDirectionUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#ff8c00]/40 hover:border-[#00f0ff] rounded-2xl p-4 flex items-center gap-3.5 group transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_20px_rgba(255,140,0,0.2)] cursor-pointer"
          title="Click to open Google Maps direction for SRIT Coimbatore"
        >
          <div className="w-11 h-11 rounded-xl bg-[#1e1e26] border border-[#ff8c00]/60 flex items-center justify-center text-[#ff8c00] group-hover:bg-[#00f0ff] group-hover:text-black transition-all shrink-0 shadow-[0_0_12px_rgba(255,140,0,0.3)]">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider">Campus Location</p>
            <p className="text-xs font-bold text-white group-hover:text-[#00f0ff] truncate transition-colors">{profile.location}</p>
          </div>
        </a>

      </div>

      {/* Interactive Map Section with Google Maps natural colors & pulse pin */}
      <section>
        <InteractiveMap />
      </section>

      {/* Social Media 3D Vibrant Buttons */}
      <section className="space-y-4">
        <h3 className="text-lg font-extrabold text-white uppercase font-sans tracking-wide">Connect via Social Networks</h3>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-cyber flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
          >
            <Github className="w-4 h-4 text-[#00f0ff]" />
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-orange flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer"
          >
            <Linkedin className="w-4 h-4 text-black" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-black" />
          </a>

          <a
            href={profile.facebook || "https://www.facebook.com/share/1FCuFmuQqA/"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-cyan flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer"
          >
            <Facebook className="w-4 h-4 text-black" />
            <span>Facebook</span>
            <ExternalLink className="w-3.5 h-3.5 text-black" />
          </a>

          <a
            href={profile.instagram || "https://www.instagram.com/boopathi.__.08?igsh=MTA5ZTQ2a2k1dmZvZg=="}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-orange flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-black" />
            <span>Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-black" />
          </a>

          <a
            href={profile.telegram || "https://t.me/boopathi_008"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-cyan flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer"
          >
            <TelegramIcon className="w-4 h-4 text-black" />
            <span>Telegram</span>
            <ExternalLink className="w-3.5 h-3.5 text-black" />
          </a>

          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-cyber flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
          >
            <Twitter className="w-4 h-4 text-[#00f0ff]" />
            <span>Twitter / X</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </section>

      {/* Contact & Feedback Form Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-extrabold text-white uppercase font-sans tracking-wide flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#ff8c00]" />
            <span>Contact & Feedback Gateway</span>
          </h3>
          <span className="text-xs text-[#00f0ff] font-mono font-bold">
            Directly messages Dharmenthira Boopathi
          </span>
        </div>
        
        <div className="bg-gradient-to-br from-[#18181e] to-[#121216] border border-[#ff8c00]/40 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Category Selector Pills */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#00f0ff]">
                  Select Inquiry / Feedback Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center border ${
                        formData.category === cat.id
                          ? 'btn-3d-orange text-black font-extrabold shadow-[0_0_12px_rgba(255,140,0,0.5)]'
                          : 'bg-[#101014] text-slate-300 border-[#383838] hover:border-[#00f0ff] hover:text-[#00f0ff]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Star Rating for Feedback */}
              <div className="space-y-2 bg-[#0a0a0c] p-4 rounded-2xl border border-[#383838]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#ff8c00]">
                    Portfolio & Project Experience Feedback Rating
                  </label>
                  <span className="text-xs font-bold text-[#ffdb70] font-mono">
                    {ratingLabels[hoverRating || formData.rating]} ({hoverRating || formData.rating}/5)
                  </span>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                      title={`Rate ${star} out of 5 stars`}
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= (hoverRating || formData.rating)
                            ? 'fill-[#ff8c00] text-[#ffdb70] drop-shadow-[0_0_10px_rgba(255,140,0,0.8)]'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0c] border border-[#383838] focus:border-[#00f0ff] rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-slate-600 transition-colors shadow-inner"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0c] border border-[#383838] focus:border-[#00f0ff] rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-slate-600 transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* Optional Subject */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Subject (Optional)</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Great work on the portfolio!"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0c] border border-[#383838] focus:border-[#00f0ff] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-slate-600 transition-colors shadow-inner"
                />
              </div>

              {/* Message / Feedback text area */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Your Message or Detailed Feedback *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Type your message or feedback suggestions here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0c] border border-[#383838] focus:border-[#00f0ff] rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-slate-600 transition-colors resize-none shadow-inner"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-400 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 3D Vibrant Submit button on bottom right */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-3d-orange inline-flex items-center justify-center gap-2 px-8 py-3.5 text-black rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? "Transmitting..." : "Transmit Message & Feedback"}</span>
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>

            </form>
          ) : (
            /* Thank you notice */
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 bg-[#00f0ff]/10 border-2 border-[#00f0ff] rounded-full flex items-center justify-center mx-auto text-[#00f0ff] shadow-[0_0_20px_#00f0ff]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-lg text-white">Transmission Received!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed font-sans">
                  Your message and feedback rating have been logged into Dharmenthira Boopathi's system inbox.
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="btn-3d-cyber px-5 py-2.5 text-xs font-bold text-white rounded-xl cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

