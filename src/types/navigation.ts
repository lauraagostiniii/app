export type ScreenId =
  | 'home'
  // Flusso 1: Mappa & Contaminazione
  | 'mappa'
  | 'filtri'
  | 'grado-contaminazione'
  // Flusso 2: Eventi & Sagre
  | 'box'
  | 'eventi'
  | 'sagre'
  | 'nessuna-sagra'
  // Flusso 3: Preferiti & Viaggio
  | 'preferiti'
  | 'cartelle'
  | 'viaggio-vienna'
  | 'hotel-saker'
  // Flusso 4: Ricerca Ristoranti & Distanza
  | 'cerca'
  | 'cerca-mappa'
  | 'cerca-filtri'
  | 'ristoranti'
  | 'distanza-100m'
  | 'nessun-ristorante'
  // Nuove sezioni Menu in Basso
  | 'aggiungi'
  | 'profilo';

export type MainTabId = 'home' | 'preferiti' | 'aggiungi' | 'profilo';

export interface ScreenNode {
  id: ScreenId;
  title: string;
  shortTitle: string;
  tab: MainTabId;
  flowId?: 1 | 2 | 3 | 4;
  flowStep?: number;
  flowTotalSteps?: number;
  parent?: ScreenId;
  nextOptions: {
    targetId: ScreenId;
    label: string;
    flowBadge?: string;
  }[];
  descriptionPlaceholder: string;
  wireframeBoxes: {
    type: 'empty' | 'dashed' | 'cross' | 'list' | 'state-alert';
    label: string;
    height?: string;
  }[];
}

export interface FlowDefinition {
  id: 1 | 2 | 3 | 4;
  name: string;
  stickyColorName: string;
  steps: ScreenId[];
  description: string;
}
