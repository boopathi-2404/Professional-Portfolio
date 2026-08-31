import React from 'react';
import { MapPin, ExternalLink, Navigation, Compass, Map, Radio } from 'lucide-react';

interface LocationItem {
  id: 'srit';
  name: string;
  shortName: string;
  tagline: string;
  district: string;
  address: string;
  coordinates: string;
  directionsUrl: string;
  mapEmbedUrl: string;
  details: string[];
}

export default function InteractiveMap() {
  const currentLocation: LocationItem = {
    id: 'srit',
    name: 'Sri Ramakrishna Institute of Technology',
    shortName: 'SRIT COIMBATORE',
    tagline: 'Autonomous Engineering College near Western Ring Road',
    district: 'Coimbatore, Tamil Nadu',
    address: 'Pachapalayam, Perur Chettipalayam, Western Ring Road Corridor, Coimbatore - 641010',
    coordinates: '10.9324° N, 76.9038° E',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sri+Ramakrishna+Institute+of+Technology+Coimbatore',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Sri%20Ramakrishna%20Institute%20of%20Technology,%20Coimbatore&t=&z=16&ie=UTF8&iwloc=&output=embed',
    details: [
      'Located directly adjacent to Western Ring Road expressway corridor in Coimbatore',
      'Autonomous Institution affiliated with Anna University',
      'Accredited with NAAC "A" Grade & NBA',
      'State-of-the-art Computer Science & AI Innovation Labs'
    ]
  };

  return (
    <div className="space-y-5">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 bg-gradient-to-r from-[#18181e] via-[#14141a] to-[#18181e] border border-[#ff8c00]/40 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00] flex items-center justify-center text-[#ff8c00] shrink-0 shadow-[0_0_15px_rgba(255,140,0,0.3)]">
            <MapPin className="w-5 h-5 text-[#ff8c00] animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black text-white uppercase font-sans tracking-wide">
                REAL TIME LOCATION INTERFACE
              </h2>
              <span className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-950/90 text-emerald-400 border border-emerald-500/50 px-2 py-0.5 rounded-full font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono mt-0.5">
              Coimbatore • Tamil Nadu
            </p>
          </div>
        </div>

        {/* Live Map Badge & Directions Link */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-[#0d0d12] px-3 py-1.5 rounded-xl border border-[#383838]">
            <Radio className="w-3.5 h-3.5 text-[#1a73e8] animate-pulse" />
            <span className="text-xs font-mono font-bold text-white">Live Google Map</span>
          </div>

          <a
            href={currentLocation.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-xs font-mono flex items-center gap-1.5 shadow-[0_0_12px_rgba(26,115,232,0.4)] transition-all cursor-pointer border border-[#4285f4]"
            title="Open directions in Google Maps"
          >
            <Navigation className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Directions</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>

      {/* LIVE GOOGLE MAP FRAME */}
      <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden border-2 border-[#383838] shadow-[0_10px_35px_rgba(0,0,0,0.85)] bg-[#121216] select-none group">
        
        <iframe
          src={currentLocation.mapEmbedUrl}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full border-0"
          title={`Live Map of ${currentLocation.name}`}
        />

        {/* TOP LEFT: Glowing Green and Black Banner Header "LIVE MAP: SRIT COIMBATORE" */}
        <div className="absolute top-3 left-3 z-20 bg-[#0a0a0d]/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#10b981] shadow-[0_0_18px_rgba(16,185,129,0.5)] flex items-center gap-2 text-xs font-mono text-[#10b981]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
          <Radio className="w-3.5 h-3.5 text-[#10b981] animate-pulse" />
          <span className="font-extrabold uppercase tracking-wider text-glow-green">
            LIVE MAP: SRIT COIMBATORE
          </span>
        </div>

        {/* BOTTOM RIGHT: Sleek Black Box displaying Coordinates with Glowing Text */}
        <div className="absolute bottom-3 right-3 z-20 bg-[#0a0a0d]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#10b981]/60 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-2 text-xs font-mono text-[#10b981]">
          <Compass className="w-3.5 h-3.5 text-[#10b981] animate-spin-slow" />
          <span className="font-extrabold tracking-wide drop-shadow-[0_0_8px_#10b981]">
            10.9324° N, 76.9038° E
          </span>
        </div>

      </div>

      {/* Selected Location Details Card */}
      <div className="bg-gradient-to-r from-[#181820] via-[#14141a] to-[#181820] border border-[#ff8c00]/30 rounded-2xl p-4 sm:p-5 shadow-[0_8px_25px_rgba(0,0,0,0.6)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#2e2e38]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#ff8c00] uppercase tracking-wider">
              Campus Location Summary
            </span>
            <h3 className="text-base font-extrabold text-white font-sans mt-0.5">
              {currentLocation.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {currentLocation.address}
            </p>
          </div>
          <a
            href={currentLocation.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ffdb70] text-black font-black text-xs font-mono flex items-center gap-1.5 shrink-0 shadow-[0_0_10px_rgba(255,140,0,0.3)] hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Map className="w-3.5 h-3.5 text-black" />
            <span>Open Google Maps</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
          {currentLocation.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2.5 bg-[#121218] p-2.5 rounded-xl border border-[#2a2a35] text-xs text-slate-300">
              <span className="text-[#10b981] font-bold text-sm leading-none">•</span>
              <span className="leading-relaxed">{detail}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
