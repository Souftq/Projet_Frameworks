export interface Cpu {
  marque: string;
  nom: string;
  score: number;
  core: number;
  'frequence-max': number;
  tdp: number;
}

export interface Hdd {
  capacite: number;
  type: string;
  rpm: number | null;
  'vitesse-transfert': number;
}

export interface CarteGraphique {
  marque: string;
  modele: string;
  score: number;
}

export interface SystemePc {
  ram: number;
  cpu: Cpu;
  hdd: Hdd;
  cg: CarteGraphique;
}

export interface Ecran {
  taille: number;
  type: string;
  dpi: number;
}

export interface Clavier {
  chiclet: boolean;
  retroeclairage: boolean;
  type: string;
  'pave-num': boolean;
}

export interface Batterie {
  capacite: number;
  autonomie: number;
}

/** Données brutes telles que présentes dans le JSON. */
export interface PcData {
  marque: string;
  nom: string;
  type: 'fixe' | 'portable' | string;
  ecran: Ecran | null;
  clavier: Clavier | null;
  system: SystemePc;
  batterie: Batterie | null;
  prix: number;
}

/** Un PC enrichi d'un identifiant stable (son index dans le catalogue). */
export interface Pc extends PcData {
  id: number;
}
