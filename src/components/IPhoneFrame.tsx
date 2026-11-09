import React from 'react';
import { MainTabId, ScreenNode, ScreenId } from '../types/navigation';
import { MAIN_TABS } from '../data/navigationTree';
import { ScreenWireframe } from './ScreenWireframe';
import {
  Wifi,
  Battery,
  Signal,
  Home,
  Heart,
  PlusSquare,
  User,
  Search,
} from 'lucide-react';

interface IPhoneFrameProps {
  currentScreen: ScreenNode;
  activeTab: MainTabId;
  onSelectTab: (tabId: MainTabId) => void;
  onNavigate: (screenId: ScreenId) => void;
  onBack: () => void;
  canGoBack: boolean;
  historyStack: ScreenId[];
  isDeviceMode: boolean;
  scale?: number;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  currentScreen,
  activeTab,
  onSelectTab,
  onNavigate,
  onBack,
  canGoBack,
  historyStack,
  isDeviceMode,
  scale = 1,
}) => {
  const getTabIcon = (tabId: MainTabId) => {
    switch (tabId) {
      case 'home':
        return <Home size={18} />;
      case 'preferiti':
        return <Heart size={18} />;
      case 'aggiungi':
        return <PlusSquare size={18} />;
      case 'profilo':
        return <User size={18} />;
    }
  };

  const isSearchActive =
    currentScreen.id === 'cerca' ||
    currentScreen.id === 'cerca-mappa' ||
    currentScreen.id === 'cerca-filtri' ||
    currentScreen.id === 'ristoranti' ||
    currentScreen.id === 'distanza-100m' ||
    currentScreen.id === 'nessun-ristorante';

  const phoneContent = (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden relative font-sans">
      {/* iOS Status Bar (iPhone 13 Pro) */}
      <div className="h-10 bg-white border-b border-black flex items-center justify-between px-6 pt-1 select-none z-20 shrink-0">
        <div className="text-xs font-bold text-black font-mono">09:41</div>

        {/* Notch simulation (iPhone 13 Pro notch width ~150px) */}
        {isDeviceMode && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl flex items-center justify-center gap-2">
            <div className="w-10 h-1 bg-neutral-700 rounded-full" />
            <div className="w-2.5 h-2.5 bg-neutral-800 rounded-full border border-neutral-700" />
          </div>
        )}

        {/* Status icons in wireframe monochrome */}
        <div className="flex items-center gap-1.5 text-black">
          <Signal size={13} strokeWidth={2.5} />
          <Wifi size={13} strokeWidth={2.5} />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-bold font-mono">100%</span>
            <Battery size={15} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Persistent App Header with Title & TOP-RIGHT SEARCH BUTTON */}
      <header className="px-3 py-2 bg-white border-b-2 border-black flex items-center justify-between z-20 shrink-0 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black font-mono uppercase tracking-tight">
            APP WIREFRAME
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">| iOS</span>
        </div>

        {/* CERCA IN ALTO A DESTRA (Richiesto: "il cerca è in alto a destra") */}
        <button
          onClick={() => onNavigate('cerca')}
          className={`px-2.5 py-1 text-xs font-mono font-bold border-2 border-black flex items-center gap-1.5 transition-all cursor-pointer ${
            isSearchActive
              ? 'bg-black text-white shadow-[2px_2px_0px_0px_#888888]'
              : 'bg-white text-black hover:bg-neutral-200'
          } active:translate-x-0.5 active:translate-y-0.5`}
          title="Apri Ricerca (in alto a destra)"
        >
          <Search size={13} className="stroke-[2.5]" />
          <span>[ Cerca ]</span>
        </button>
      </header>

      {/* Main Screen Viewport (Interactive Wireframe) */}
      <main className="flex-1 overflow-hidden relative">
        <ScreenWireframe
          screen={currentScreen}
          onNavigate={onNavigate}
          onBack={onBack}
          canGoBack={canGoBack}
          historyStack={historyStack}
        />
      </main>

      {/* Persistent Bottom Navigation (Tab Bar) with 4 items: Home, Preferiti, Aggiungi, Profilo */}
      <nav
        aria-label="Barra di Navigazione Principale in Basso"
        className="border-t-2 border-black bg-white select-none z-20 shadow-[0_-2px_4px_rgba(0,0,0,0.05)] shrink-0"
      >
        <div className="grid grid-cols-4 gap-1 p-1.5 bg-[#F4F4F4]">
          {MAIN_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-black text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_#888888]'
                    : 'bg-white text-black border border-black hover:bg-neutral-100'
                } active:scale-95`}
                title={`Vai alla sezione ${tab.label}`}
              >
                <div className="mb-0.5">{getTabIcon(tab.id)}</div>
                <span className="text-[10px] uppercase font-mono tracking-tight truncate max-w-full">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* iOS Home Indicator */}
        <div className="h-4 bg-white flex items-center justify-center">
          <div className="w-32 h-1 bg-black rounded-full" />
        </div>
      </nav>
    </div>
  );

  if (!isDeviceMode) {
    return (
      <div className="w-full max-w-md mx-auto h-[844px] border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
        {phoneContent}
      </div>
    );
  }

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
      className="transition-transform duration-200"
    >
      {/* iPhone 13 Pro Outer Bezel (390 x 844 viewport ratio + 16px frame) */}
      <div className="relative w-[410px] h-[870px] bg-neutral-900 rounded-[52px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_2px_#333333,12px_12px_0px_0px_#000000] border-4 border-black">
        {/* Physical hardware side buttons */}
        <div className="absolute -left-4.5 top-28 w-1.5 h-8 bg-neutral-700 rounded-l-sm border border-black" />
        <div className="absolute -left-4.5 top-40 w-1.5 h-12 bg-neutral-700 rounded-l-sm border border-black" />
        <div className="absolute -left-4.5 top-56 w-1.5 h-12 bg-neutral-700 rounded-l-sm border border-black" />
        <div className="absolute -right-4.5 top-36 w-1.5 h-18 bg-neutral-700 rounded-r-sm border border-black" />

        {/* Glass Screen Edge */}
        <div className="w-full h-full rounded-[42px] overflow-hidden border-2 border-black bg-white flex flex-col">
          {phoneContent}
        </div>
      </div>
    </div>
  );
};
