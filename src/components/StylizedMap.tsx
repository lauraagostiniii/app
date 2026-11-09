import React from 'react';
import { Filter, SlidersHorizontal, MapPin, Compass, Navigation } from 'lucide-react';
import { ScreenId } from '../types/navigation';

interface StylizedMapProps {
  onOpenFilters: () => void;
  onOpenMapDetail?: () => void;
  className?: string;
  isFullHeight?: boolean;
  filterLabel?: string;
}

export const StylizedMap: React.FC<StylizedMapProps> = ({
  onOpenFilters,
  onOpenMapDetail,
  className = '',
  isFullHeight = false,
  filterLabel = 'Filtri',
}) => {
  return (
    <div
      className={`relative w-full border-2 border-black bg-[#FFFFFF] overflow-hidden select-none ${
        isFullHeight ? 'h-full min-h-[360px]' : 'h-56'
      } ${className}`}
    >
      {/* Stylized Urban Map SVG Layout (Pure Monochrome Wireframe) */}
      <svg
        className="w-full h-full absolute inset-0 cursor-pointer"
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
        onClick={onOpenMapDetail || onOpenFilters}
      >
        <defs>
          {/* Subtle grid pattern for city blocks */}
          <pattern id="city-blocks" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="26" height="26" fill="#F8F8F8" stroke="#E5E5E5" strokeWidth="1" />
          </pattern>
          <pattern id="diagonal-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2" stroke="#CCCCCC" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* City Blocks Base Background */}
        <rect width="100%" height="100%" fill="url(#city-blocks)" />

        {/* Park / Green area (represented in wireframe diagonal hatch) */}
        <path
          d="M 20 20 L 110 20 L 95 90 L 15 80 Z"
          fill="url(#diagonal-hatch)"
          stroke="#000000"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <text x="35" y="55" fontSize="8" fontFamily="monospace" fill="#555" fontWeight="bold">
          [ PARCO / AREA ]
        </text>

        {/* River / Water Canal (stylized monochrome ribbon) */}
        <path
          d="M -10 180 C 100 160, 160 220, 260 170 C 320 140, 360 150, 420 130"
          fill="none"
          stroke="#D0D0D0"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M -10 180 C 100 160, 160 220, 260 170 C 320 140, 360 150, 420 130"
          fill="none"
          stroke="#000000"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Primary Avenues (Bold double lines) */}
        <line x1="0" y1="110" x2="400" y2="110" stroke="#000000" strokeWidth="9" />
        <line x1="0" y1="110" x2="400" y2="110" stroke="#FFFFFF" strokeWidth="4" />
        <line x1="0" y1="110" x2="400" y2="110" stroke="#000000" strokeWidth="1" strokeDasharray="6 6" />

        <line x1="220" y1="0" x2="220" y2="240" stroke="#000000" strokeWidth="9" />
        <line x1="220" y1="0" x2="220" y2="240" stroke="#FFFFFF" strokeWidth="4" />
        <line x1="220" y1="0" x2="220" y2="240" stroke="#000000" strokeWidth="1" strokeDasharray="6 6" />

        {/* Secondary Streets */}
        <line x1="120" y1="0" x2="120" y2="180" stroke="#888888" strokeWidth="3" />
        <line x1="310" y1="0" x2="310" y2="240" stroke="#888888" strokeWidth="3" />
        <line x1="0" y1="50" x2="400" y2="50" stroke="#888888" strokeWidth="2.5" />
        <line x1="0" y1="175" x2="200" y2="175" stroke="#888888" strokeWidth="2.5" />

        {/* Street Labels (Wireframe notation) */}
        <text x="10" y="104" fontSize="8" fontFamily="monospace" fill="#000000" fontWeight="bold">
          CORSO PRINCIPALE
        </text>
        <text x="225" y="30" fontSize="8" fontFamily="monospace" fill="#000000" fontWeight="bold">
          VIA CENTRALE
        </text>

        {/* Roundabout */}
        <circle cx="220" cy="110" r="16" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
        <circle cx="220" cy="110" r="8" fill="#F0F0F0" stroke="#000000" strokeWidth="1" />

        {/* User Current Position (Pulsing ring) */}
        <circle cx="220" cy="110" r="18" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="220" cy="110" r="4.5" fill="#000000" />

        {/* Stylized Map Pin 1 */}
        <g transform="translate(160, 60)">
          <path d="M 0 0 C -7 -12, 7 -12, 0 0" fill="#000" stroke="#000" strokeWidth="1" />
          <circle cx="0" cy="-7" r="5" fill="#FFF" stroke="#000" strokeWidth="1.5" />
          <circle cx="0" cy="-7" r="2" fill="#000" />
        </g>

        {/* Stylized Map Pin 2 */}
        <g transform="translate(280, 75)">
          <circle cx="0" cy="-7" r="5" fill="#000" stroke="#000" strokeWidth="1.5" />
          <circle cx="0" cy="-7" r="2" fill="#FFF" />
          <path d="M 0 0 L 0 -2" stroke="#000" strokeWidth="2" />
        </g>

        {/* Stylized Map Pin 3 */}
        <g transform="translate(150, 150)">
          <circle cx="0" cy="-7" r="5" fill="#FFF" stroke="#000" strokeWidth="1.5" />
          <circle cx="0" cy="-7" r="2" fill="#000" />
        </g>

        {/* Stylized Map Pin 4 */}
        <g transform="translate(340, 160)">
          <circle cx="0" cy="-7" r="5" fill="#000" stroke="#000" strokeWidth="1.5" />
          <circle cx="0" cy="-7" r="2" fill="#FFF" />
        </g>
      </svg>

      {/* Top Left Compass & Map Label */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-white/95 px-2 py-1 border border-black shadow-[1px_1px_0px_0px_#000000] pointer-events-none">
        <Compass size={13} className="text-black" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
          [ Mappa Stilizzata ]
        </span>
      </div>

      {/* Center Top Tap Hint (if preview on home) */}
      {onOpenMapDetail && (
        <button
          onClick={onOpenMapDetail}
          className="absolute bottom-2 left-2 z-10 text-[9px] font-mono bg-white px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          [ ↗ Espandi Mappa ]
        </button>
      )}

      {/* PROMINENT EMBEDDED FILTER BUTTON (Richiesto: "all'interno un icona dei filtri") */}
      <div className="absolute top-2 right-2 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenFilters();
          }}
          className="bg-black text-white hover:bg-neutral-800 border-2 border-black px-2.5 py-1.5 shadow-[2px_2px_0px_0px_#888888] flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all"
          title="Apri Filtri Mappa (Grado di contaminazione / Categorie)"
        >
          <SlidersHorizontal size={14} className="stroke-[2.5]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wide">
            {filterLabel}
          </span>
        </button>
      </div>

      {/* Map Scale indicator bottom right */}
      <div className="absolute bottom-2 right-2 z-10 bg-white/90 border border-black px-1.5 py-0.5 text-[9px] font-mono flex items-center gap-1 pointer-events-none">
        <span>100m</span>
        <div className="w-8 h-1 bg-black" />
      </div>
    </div>
  );
};
