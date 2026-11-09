import React, { useState } from 'react';
import { ScreenId } from '../types/navigation';
import { FLOWS, SCREENS, MAIN_TABS } from '../data/navigationTree';
import {
  GitCommit,
  CheckCircle2,
  Circle,
  Play,
  RotateCcw,
  Eye,
  Layers,
  Search,
  SlidersHorizontal,
  Map as MapIcon,
} from 'lucide-react';

interface NavigationMapPanelProps {
  currentScreenId: ScreenId;
  onJumpToScreen: (screenId: ScreenId) => void;
  visitedScreens: Set<ScreenId>;
  onResetSession: () => void;
  isDeviceMode: boolean;
  onToggleDeviceMode: () => void;
  scale: number;
  onChangeScale: (newScale: number) => void;
}

export const NavigationMapPanel: React.FC<NavigationMapPanelProps> = ({
  currentScreenId,
  onJumpToScreen,
  visitedScreens,
  onResetSession,
  isDeviceMode,
  onToggleDeviceMode,
  scale,
  onChangeScale,
}) => {
  const [selectedFlowId, setSelectedFlowId] = useState<number | 'all'>('all');
  const [showOriginalPostits, setShowOriginalPostits] = useState(false);

  const totalScreensCount = Object.keys(SCREENS).length;
  const coveragePercent = Math.round(
    (visitedScreens.size / totalScreensCount) * 100
  );

  return (
    <aside className="w-full lg:w-[480px] xl:w-[540px] flex flex-col bg-white border-2 border-black font-mono text-black shadow-[6px_6px_0px_0px_#000000] h-full overflow-hidden">
      {/* Panel Header */}
      <div className="p-3.5 bg-black text-white border-b-2 border-black flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Layers size={18} />
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Mappa Navigazione &amp; IA
            </h2>
            <div className="text-[10px] text-neutral-300">
              iPhone 13 Pro (390×844) • Test Architettura Informativa
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowOriginalPostits(!showOriginalPostits)}
            className="px-2 py-1 bg-white text-black text-xs font-bold border border-white hover:bg-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
            title="Mostra Post-it originali dell'architettura"
          >
            <Eye size={12} />
            <span>Post-it</span>
          </button>

          <button
            onClick={onResetSession}
            className="p-1.5 bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-600 transition-colors cursor-pointer"
            title="Resetta cronologia test"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Control Strip (View & Scale controls) */}
      <div className="bg-[#F4F4F4] border-b-2 border-black p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase text-[11px]">[ Vista ]:</span>
          <button
            onClick={onToggleDeviceMode}
            className={`px-2 py-1 border border-black font-bold cursor-pointer ${
              isDeviceMode ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {isDeviceMode ? 'Scocca iPhone 13' : 'Solo Schermo'}
          </button>
        </div>

        {isDeviceMode && (
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold">[ Zoom ]:</span>
            {[0.75, 0.85, 1].map((s) => (
              <button
                key={s}
                onClick={() => onChangeScale(s)}
                className={`px-1.5 py-0.5 border border-black text-[10px] font-bold cursor-pointer ${
                  scale === s ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {Math.round(s * 100)}%
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Layout Summary (Bottom Bar + Top Right Search + Stylized Map) */}
      <div className="p-2.5 border-b-2 border-black bg-white text-xs space-y-1.5 shrink-0">
        <div className="flex items-center justify-between">
          <span className="font-bold uppercase text-[11px]">
            [ Menu in Basso (4 Voci) ]:
          </span>
          <div className="flex gap-1">
            {MAIN_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => onJumpToScreen(t.rootScreen)}
                className={`px-1.5 py-0.5 text-[10px] border border-black cursor-pointer font-bold ${
                  currentScreenId === t.rootScreen ? 'bg-black text-white' : 'bg-[#F4F4F4]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-neutral-700 pt-1 border-t border-neutral-200">
          <span className="flex items-center gap-1">
            <Search size={12} className="text-black" />
            <span>Cerca: in alto a destra</span>
          </span>
          <span className="flex items-center gap-1">
            <SlidersHorizontal size={12} className="text-black" />
            <span>Filtri: icona dentro la mappa</span>
          </span>
        </div>
      </div>

      {/* Coverage & Validation Stats */}
      <div className="p-2.5 border-b-2 border-black bg-[#F4F4F4] shrink-0">
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="font-bold uppercase text-[11px]">[ Copertura Schermate ]:</span>
          <span className="font-bold text-[11px]">
            {visitedScreens.size} / {totalScreensCount} ({coveragePercent}%)
          </span>
        </div>
        <div className="w-full h-2.5 border border-black bg-white p-0.5">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${coveragePercent}%` }}
          />
        </div>
      </div>

      {/* Filter Flow Selector */}
      <div className="p-2 border-b-2 border-black bg-white flex items-center gap-1 overflow-x-auto text-xs shrink-0">
        <button
          onClick={() => setSelectedFlowId('all')}
          className={`px-2 py-1 border border-black shrink-0 font-bold cursor-pointer ${
            selectedFlowId === 'all'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-neutral-200'
          }`}
        >
          Tutti i 4 Flussi
        </button>
        {FLOWS.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFlowId(f.id)}
            className={`px-2 py-1 border border-black shrink-0 font-bold cursor-pointer ${
              selectedFlowId === f.id
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            F{f.id} ({f.stickyColorName})
          </button>
        ))}
      </div>

      {/* Original Sticky Note Drawer / Image Preview */}
      {showOriginalPostits && (
        <div className="border-b-2 border-black bg-[#F4F4F4] p-3 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase">
              [ Mappa di Partenza: Post-it Originali ]
            </span>
            <button
              onClick={() => setShowOriginalPostits(false)}
              className="text-xs px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white cursor-pointer"
            >
              Chiudi
            </button>
          </div>
          <div className="border-2 border-black overflow-hidden bg-white">
            <img
              src="/assets/aistudio/Screenshot_2026-11-09_alle_15.48.38_3429f158.png"
              alt="Architettura Informativa Originale"
              className="w-full h-auto object-contain max-h-48"
            />
          </div>
        </div>
      )}

      {/* Flow List & Interactive Nodes */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5">
        {FLOWS.filter(
          (f) => selectedFlowId === 'all' || selectedFlowId === f.id
        ).map((flow) => {
          const isFlowComplete = flow.steps.every((s) => visitedScreens.has(s));

          return (
            <div
              key={flow.id}
              className="border-2 border-black bg-white p-3 shadow-[3px_3px_0px_0px_#000000]"
            >
              {/* Flow Header */}
              <div className="flex items-center justify-between pb-2 border-b border-black mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-black text-white flex items-center justify-center text-xs font-bold">
                    {flow.id}
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-tight">
                      {flow.name}
                    </div>
                    <div className="text-[10px] text-neutral-600">
                      Post-it: {flow.stickyColorName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {isFlowComplete ? (
                    <span className="text-[10px] px-1.5 py-0.5 border border-black bg-black text-white flex items-center gap-1">
                      <CheckCircle2 size={10} /> Testato
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 border border-black bg-[#F4F4F4]">
                      In corso
                    </span>
                  )}
                  <button
                    onClick={() => onJumpToScreen(flow.steps[1] || 'home')}
                    className="p-1 border border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
                    title={`Avvia test ${flow.name}`}
                  >
                    <Play size={12} />
                  </button>
                </div>
              </div>

              {/* Node Sequence (Interactive Tree Path) */}
              <div className="space-y-1.5">
                {flow.steps.map((stepId, index) => {
                  const node = SCREENS[stepId];
                  const isCurrent = currentScreenId === stepId;
                  const isVisited = visitedScreens.has(stepId);
                  const isLast = index === flow.steps.length - 1;

                  return (
                    <div key={stepId} className="flex items-center gap-1.5">
                      <span className="text-[10px] text-neutral-500 w-4 text-right shrink-0">
                        {index + 1}.
                      </span>

                      <button
                        onClick={() => onJumpToScreen(stepId)}
                        className={`flex-1 text-left px-2 py-1.5 text-xs transition-all border flex items-center justify-between cursor-pointer ${
                          isCurrent
                            ? 'bg-black text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_#888888]'
                            : isVisited
                            ? 'bg-[#F4F4F4] text-black border-black hover:bg-neutral-200'
                            : 'bg-white text-neutral-700 border-neutral-400 hover:border-black'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {isCurrent ? (
                            <GitCommit size={12} className="shrink-0" />
                          ) : isVisited ? (
                            <CheckCircle2 size={12} className="shrink-0" />
                          ) : (
                            <Circle size={10} className="shrink-0 text-neutral-400" />
                          )}
                          <span className="truncate">
                            [ {node ? node.title : stepId} ]
                          </span>
                        </div>

                        {isCurrent && (
                          <span className="text-[9px] px-1 border border-white bg-black shrink-0">
                            ATTIVO
                          </span>
                        )}
                        {!isCurrent && isLast && (
                          <span className="text-[9px] px-1 border border-black bg-white shrink-0 text-black">
                            FINE
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Footer */}
      <div className="p-2.5 bg-[#F4F4F4] border-t-2 border-black text-[11px] leading-tight text-neutral-700 shrink-0">
        <div className="font-bold uppercase mb-0.5">[ Istruzioni Collaudo UX ]:</div>
        Tocca l&apos;icona [ Filtri ] sulla mappa per avviare il Flusso 1, oppure il pulsante [ Cerca ] in alto a destra per il Flusso 4.
      </div>
    </aside>
  );
};
