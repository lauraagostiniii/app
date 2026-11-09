/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, MainTabId } from './types/navigation';
import { SCREENS, MAIN_TABS, FLOWS } from './data/navigationTree';
import { IPhoneFrame } from './components/IPhoneFrame';
import { NavigationMapPanel } from './components/NavigationMapPanel';
import {
  Smartphone,
  Layers,
  ChevronRight,
  RotateCcw,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export default function App() {
  const [currentScreenId, setCurrentScreenId] = useState<ScreenId>('home');
  const [activeTab, setActiveTab] = useState<MainTabId>('home');
  const [historyStack, setHistoryStack] = useState<ScreenId[]>(['home']);
  const [visitedScreens, setVisitedScreens] = useState<Set<ScreenId>>(
    new Set<ScreenId>(['home'])
  );
  const [isDeviceMode, setIsDeviceMode] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(0.85);
  const [activeViewMode, setActiveViewMode] = useState<'split' | 'phone' | 'map'>('split');

  const currentScreen = SCREENS[currentScreenId] || SCREENS.home;

  const navigateTo = (targetId: ScreenId) => {
    const targetNode = SCREENS[targetId];
    if (!targetNode) return;

    setCurrentScreenId(targetId);
    setActiveTab(targetNode.tab);
    setHistoryStack((prev) => [...prev, targetId]);
    setVisitedScreens((prev) => new Set([...prev, targetId]));
  };

  const handleSelectTab = (tabId: MainTabId) => {
    setActiveTab(tabId);
    const tabDef = MAIN_TABS.find((t) => t.id === tabId);
    const rootScreenId = tabDef?.rootScreen || 'home';
    setCurrentScreenId(rootScreenId);
    setHistoryStack((prev) => [...prev, rootScreenId]);
    setVisitedScreens((prev) => new Set([...prev, rootScreenId]));
  };

  const handleBack = () => {
    if (historyStack.length <= 1) return;
    const newStack = [...historyStack];
    newStack.pop(); // remove current
    const previousId = newStack[newStack.length - 1];
    setHistoryStack(newStack);
    setCurrentScreenId(previousId);

    const prevNode = SCREENS[previousId];
    if (prevNode) {
      setActiveTab(prevNode.tab);
    }
  };

  const handleResetSession = () => {
    setCurrentScreenId('home');
    setActiveTab('home');
    setHistoryStack(['home']);
    setVisitedScreens(new Set<ScreenId>(['home']));
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-black font-mono flex flex-col antialiased">
      {/* Top Application Bar */}
      <header className="border-b-2 border-black bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-sm">
            W
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-tight uppercase">
              Wireframe Test: Architettura &amp; Flussi Navigazione
            </h1>
            <div className="text-xs text-neutral-600 flex items-center gap-2">
              <span>Target: iPhone 13 Pro (390 × 844 pt)</span>
              <span>•</span>
              <span>Palette: Monocromatica (#000 / #FFF / #F4F4F4)</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher for responsive layouts */}
        <div className="flex items-center gap-2 text-xs">
          <div className="hidden sm:flex border-2 border-black bg-white p-0.5">
            <button
              onClick={() => setActiveViewMode('split')}
              className={`px-3 py-1 font-bold cursor-pointer ${
                activeViewMode === 'split' ? 'bg-black text-white' : 'hover:bg-neutral-100'
              }`}
            >
              Vista Completa (Affiancata)
            </button>
            <button
              onClick={() => setActiveViewMode('phone')}
              className={`px-3 py-1 font-bold cursor-pointer ${
                activeViewMode === 'phone' ? 'bg-black text-white' : 'hover:bg-neutral-100'
              }`}
            >
              Solo iPhone
            </button>
            <button
              onClick={() => setActiveViewMode('map')}
              className={`px-3 py-1 font-bold cursor-pointer ${
                activeViewMode === 'map' ? 'bg-black text-white' : 'hover:bg-neutral-100'
              }`}
            >
              Solo Mappa IA
            </button>
          </div>

          <button
            onClick={handleResetSession}
            className="px-2.5 py-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
            title="Azzera e torna alla schermata Home iniziale"
          >
            <RotateCcw size={12} />
            <span>Reset Test</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Workspace */}
      <div className="flex-1 p-3 md:p-6 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 overflow-x-hidden">
        {/* Left Column: iPhone 13 Pro Interactive Prototype */}
        {(activeViewMode === 'split' || activeViewMode === 'phone') && (
          <div className="flex flex-col items-center justify-start shrink-0">
            {/* Status breadcrumb indicator above device */}
            <div className="mb-3 px-3 py-1.5 border border-black bg-white text-xs flex items-center gap-2 shadow-[2px_2px_0px_0px_#000000]">
              <span className="font-bold uppercase">[ Percorso Attivo ]:</span>
              <div className="flex items-center gap-1 font-mono text-[11px] text-neutral-800">
                <span>Home</span>
                {currentScreen.id !== 'home' && (
                  <>
                    <ChevronRight size={12} />
                    <span className="font-bold underline">{currentScreen.title}</span>
                  </>
                )}
              </div>
            </div>

            <IPhoneFrame
              currentScreen={currentScreen}
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              onNavigate={navigateTo}
              onBack={handleBack}
              canGoBack={historyStack.length > 1}
              historyStack={historyStack}
              isDeviceMode={isDeviceMode}
              scale={scale}
            />
          </div>
        )}

        {/* Right Column: Navigation Map & Information Architecture Companion */}
        {(activeViewMode === 'split' || activeViewMode === 'map') && (
          <div className="w-full lg:w-auto h-[870px] flex shrink-0">
            <NavigationMapPanel
              currentScreenId={currentScreenId}
              onJumpToScreen={navigateTo}
              visitedScreens={visitedScreens}
              onResetSession={handleResetSession}
              isDeviceMode={isDeviceMode}
              onToggleDeviceMode={() => setIsDeviceMode(!isDeviceMode)}
              scale={scale}
              onChangeScale={setScale}
            />
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <footer className="border-t-2 border-black bg-white px-4 py-2.5 text-xs text-neutral-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="font-bold text-black uppercase">
            [ Low-Fidelity Wireframe Artifact ]
          </span>
          <span>4 Flussi Mappati dai Post-it Originali</span>
        </div>
        <div className="text-[11px] text-neutral-500 font-mono">
          Viewport: 390×844 pt (iPhone 13 Pro) • SPA State-based Navigation
        </div>
      </footer>
    </div>
  );
}
