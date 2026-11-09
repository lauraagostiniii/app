import React from 'react';
import { ScreenId, ScreenNode } from '../types/navigation';
import { StylizedMap } from './StylizedMap';
import { ArrowLeft, CornerDownRight, AlertCircle, Compass, SlidersHorizontal } from 'lucide-react';

interface ScreenWireframeProps {
  screen: ScreenNode;
  onNavigate: (targetId: ScreenId) => void;
  onBack: () => void;
  canGoBack: boolean;
  historyStack: ScreenId[];
}

export const ScreenWireframe: React.FC<ScreenWireframeProps> = ({
  screen,
  onNavigate,
  onBack,
  canGoBack,
}) => {
  const isTerminalNode = [
    'grado-contaminazione',
    'nessuna-sagra',
    'hotel-saker',
    'nessun-ristorante',
  ].includes(screen.id);

  const hasStylizedMap = screen.id === 'home' || screen.id === 'mappa' || screen.id === 'cerca-mappa';

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF] text-black font-mono select-none">
      {/* Sub-header inside screen (Wireframe header) */}
      <div className="border-b-2 border-black p-2.5 bg-[#F4F4F4] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 truncate">
          {canGoBack && (
            <button
              onClick={onBack}
              className="px-2 py-1 border border-black bg-white text-[11px] font-bold hover:bg-black hover:text-white transition-colors flex items-center gap-1 active:translate-y-0.5 cursor-pointer shrink-0"
              title="Torna indietro"
            >
              <ArrowLeft size={12} />
              <span>[ &lt; Indietro ]</span>
            </button>
          )}
          <span className="text-xs uppercase tracking-wider font-bold truncate">
            [ Schermata: {screen.title} ]
          </span>
        </div>

        {screen.flowId && (
          <span className="text-[10px] px-1.5 py-0.5 border border-black bg-white font-semibold shrink-0">
            F{screen.flowId} ({screen.flowStep}/{screen.flowTotalSteps})
          </span>
        )}
      </div>

      {/* Screen Main Wireframe Content */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {/* Main Screen Title Banner */}
        <div className="border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_0px_#000000]">
          <div className="text-[10px] text-neutral-600 uppercase">
            Identificativo Architettura:
          </div>
          <div className="text-sm font-bold tracking-tight">
            [ SCHERMATA: {screen.title.toUpperCase()} ]
          </div>
          <div className="text-[11px] text-neutral-700 mt-1 border-t border-neutral-300 pt-1 leading-snug">
            {screen.descriptionPlaceholder}
          </div>
        </div>

        {/* SPECIAL REQUIREMENT: Stylized Real Map with Embedded Filter Icon */}
        {hasStylizedMap && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-600 px-0.5">
              <span>[ Mappa Urbana Molto Stilizzata ]</span>
              <span className="underline">Tocca icona filtri all&apos;interno</span>
            </div>

            <StylizedMap
              onOpenFilters={() => {
                if (screen.id === 'cerca-mappa') {
                  onNavigate('cerca-filtri');
                } else {
                  onNavigate('filtri');
                }
              }}
              onOpenMapDetail={
                screen.id === 'home'
                  ? () => onNavigate('mappa')
                  : undefined
              }
              isFullHeight={screen.id === 'mappa'}
              filterLabel={screen.id === 'cerca-mappa' ? 'Filtri Cerca' : 'Filtri'}
            />
          </div>
        )}

        {/* Terminal/Empty State Indicator if applicable */}
        {isTerminalNode && (
          <div className="border-2 border-black bg-[#F4F4F4] p-2.5 flex items-start gap-2">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <div className="text-xs">
              <span className="font-bold underline block">
                [ NODO TERMINALE / ENDPOINT FLUSSO ]
              </span>
              Questa schermata conclude il percorso di navigazione del test.
            </div>
          </div>
        )}

        {/* Placeholder Wireframe Boxes */}
        <div className="space-y-2">
          {screen.wireframeBoxes
            // If on home, mappa, or cerca-mappa, the first box was the map which is already rendered above
            .filter((_, idx) => !hasStylizedMap || idx > 0)
            .map((box, idx) => {
              if (box.type === 'cross') {
                return (
                  <div
                    key={idx}
                    className={`w-full ${box.height || 'h-24'} border-2 border-dashed border-black bg-[#F4F4F4] relative flex items-center justify-center p-2 text-center overflow-hidden`}
                  >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <line x1="0" y1="0" x2="100%" y2="100%" stroke="#000" strokeWidth="1" />
                      <line x1="100%" y1="0" x2="0" y2="100%" stroke="#000" strokeWidth="1" />
                    </svg>
                    <span className="text-xs font-semibold bg-white px-2 py-1 border border-black z-10">
                      {box.label}
                    </span>
                  </div>
                );
              }

              if (box.type === 'state-alert') {
                return (
                  <div
                    key={idx}
                    className={`w-full ${box.height || 'h-20'} border-2 border-black bg-white p-3 flex flex-col justify-center items-center text-center`}
                  >
                    <span className="text-xs font-bold uppercase">{box.label}</span>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className={`w-full ${box.height || 'h-18'} border-2 ${
                    box.type === 'dashed' ? 'border-dashed' : 'border-solid'
                  } border-black bg-[#F4F4F4] p-2 flex items-center justify-center text-center`}
                >
                  <span className="text-xs font-medium text-neutral-800">
                    {box.label}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Wireframe Interactive Action Blocks to Progress Navigation */}
        <div className="pt-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5 flex items-center gap-1">
            <CornerDownRight size={13} />
            [ Transizioni &amp; Opzioni di Navigazione ]:
          </div>

          <div className="space-y-1.5">
            {screen.nextOptions.map((opt, idx) => {
              const isFlowNext = opt.flowBadge !== undefined;
              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(opt.targetId)}
                  className={`w-full text-left p-2.5 text-xs font-bold transition-all flex items-center justify-between border-2 border-black cursor-pointer ${
                    isFlowNext
                      ? 'bg-black text-white hover:bg-neutral-800 shadow-[2px_2px_0px_0px_#888888]'
                      : 'bg-white text-black hover:bg-neutral-200'
                  } active:translate-x-0.5 active:translate-y-0.5`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="shrink-0">{isFlowNext ? '▶' : '↳'}</span>
                    <span className="truncate">[ → Vai a: {opt.label} ]</span>
                  </div>
                  {opt.flowBadge && (
                    <span className="text-[10px] px-1.5 py-0.5 border border-white bg-black shrink-0 font-mono">
                      {opt.flowBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Breadcrumb Tracker */}
        <div className="border border-black bg-white p-1.5 text-[10px] text-neutral-700 flex justify-between">
          <span className="font-bold uppercase">[ Sezione: {screen.tab.toUpperCase()} ]</span>
          <span>ID: #{screen.id}</span>
        </div>
      </div>
    </div>
  );
};
