import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Pc } from '../models/pc.model';
import { PcService } from './pc.service';

export interface LignePanier {
  pc: Pc;
  quantite: number;
}

const CLE_STOCKAGE = 'pcshop-panier';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _lignes: LignePanier[] = [];
  private readonly navigateur: boolean;

  constructor(
    private pcService: PcService,
    @Inject(PLATFORM_ID) plateforme: object,
  ) {
    this.navigateur = isPlatformBrowser(plateforme);
    this.charger();
  }

  get lignes(): LignePanier[] {
    return this._lignes;
  }

  get total(): number {
    return this._lignes.reduce((somme, l) => somme + l.pc.prix * l.quantite, 0);
  }

  get nombreArticles(): number {
    return this._lignes.reduce((somme, l) => somme + l.quantite, 0);
  }

  ajouter(pc: Pc): void {
    const ligne = this._lignes.find(l => l.pc.id === pc.id);
    if (ligne) {
      ligne.quantite++;
    } else {
      this._lignes.push({ pc, quantite: 1 });
    }
    this.sauvegarder();
  }

  augmenter(ligne: LignePanier): void {
    ligne.quantite++;
    this.sauvegarder();
  }

  diminuer(ligne: LignePanier): void {
    if (ligne.quantite > 1) {
      ligne.quantite--;
      this.sauvegarder();
    }
  }

  supprimer(ligne: LignePanier): void {
    this._lignes = this._lignes.filter(l => l !== ligne);
    this.sauvegarder();
  }

  vider(): void {
    this._lignes = [];
    this.sauvegarder();
  }

  private charger(): void {
    if (!this.navigateur) {
      return;
    }
    try {
      const brut = localStorage.getItem(CLE_STOCKAGE);
      if (!brut) {
        return;
      }
      const items = JSON.parse(brut) as { id: number; quantite: number }[];
      this._lignes = items
        .map(item => {
          const pc = this.pcService.getById(item.id);
          return pc ? { pc, quantite: item.quantite } : null;
        })
        .filter((ligne): ligne is LignePanier => ligne !== null);
    } catch {
      this._lignes = [];
    }
  }

  private sauvegarder(): void {
    if (!this.navigateur) {
      return;
    }
    const items = this._lignes.map(l => ({ id: l.pc.id, quantite: l.quantite }));
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(items));
  }
}
