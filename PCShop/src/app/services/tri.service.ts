import { Injectable } from '@angular/core';
import { Pc } from '../models/pc.model';
import { PcService } from './pc.service';

interface Borne {
  min: number;
  max: number;
}

/**
 * Algorithme de tri (mode Assisté) : chaque réponse attribue des points à
 * chaque ordinateur ; on cumule les points, puis on classe du meilleur score
 * au moins bon.
 */
@Injectable({ providedIn: 'root' })
export class TriService {
  private reponses: Record<string, string> = {};
  actif = false;

  private readonly bornes: { cpu: Borne; gpu: Borne; ram: Borne; prix: Borne };

  constructor(private pcService: PcService) {
    const pcs = this.pcService.getAll();
    this.bornes = {
      cpu: this.borne(pcs.map(p => p.system.cpu.score)),
      gpu: this.borne(pcs.map(p => p.system.cg.score)),
      ram: this.borne(pcs.map(p => p.system.ram)),
      prix: this.borne(pcs.map(p => p.prix)),
    };
  }

  definirReponses(reponses: Record<string, string>): void {
    this.reponses = { ...reponses };
    this.actif = Object.keys(this.reponses).length > 0;
  }

  reset(): void {
    this.reponses = {};
    this.actif = false;
  }

  /** Renvoie une nouvelle liste classée du meilleur score au moins bon. */
  classer(pcs: Pc[]): Pc[] {
    return [...pcs].sort((a, b) => this.score(b) - this.score(a));
  }

  score(pc: Pc): number {
    return Object.entries(this.reponses)
      .reduce((total, [cle, valeur]) => total + this.points(cle, valeur, pc), 0);
  }

  private points(cle: string, valeur: string, pc: Pc): number {
    const cpu = this.normaliser(pc.system.cpu.score, this.bornes.cpu);
    const gpu = this.normaliser(pc.system.cg.score, this.bornes.gpu);
    const ram = this.normaliser(pc.system.ram, this.bornes.ram);
    const prix = this.normaliser(pc.prix, this.bornes.prix);

    switch (cle) {
      case 'type':
        if (valeur === 'Fixe') {
          return pc.type === 'fixe' ? 100 : 0;
        }
        if (valeur === 'Mobile') {
          return pc.type === 'portable' ? 100 : 0;
        }
        return 0;

      case 'domaine':
        switch (valeur) {
          case 'Gaming': return gpu;
          case 'Design': return (gpu + cpu + ram) / 3;
          case 'Développement': return (cpu * 2 + ram) / 3;
          case 'Bureautique': return (100 - prix + (100 - gpu)) / 2;
          default: return 0;
        }

      case 'temps':
        switch (valeur) {
          case '+10h': return cpu;
          case '6-8h': return cpu * 0.6;
          case '-6h':
            return pc.type === 'portable' && pc.batterie ? Math.min(100, pc.batterie.autonomie * 8) : 30;
          default: return 0;
        }

      case 'ecran': {
        if (!pc.ecran) {
          return pc.type === 'fixe' ? 20 : 0;
        }
        const cible = valeur.includes('12') ? 12 : valeur.includes('14') ? 14 : 16;
        return Math.max(0, 100 - Math.abs(pc.ecran.taille - cible) * 25);
      }

      case 'prix':
        if (valeur === 'Min') {
          return 100 - prix;
        }
        if (valeur === 'Max') {
          return prix;
        }
        if (valeur === 'Moyen') {
          return 100 - Math.abs(prix - 50) * 2;
        }
        return 0;

      default:
        return 0;
    }
  }

  private normaliser(valeur: number, borne: Borne): number {
    if (borne.max === borne.min) {
      return 50;
    }
    return ((valeur - borne.min) / (borne.max - borne.min)) * 100;
  }

  private borne(valeurs: number[]): Borne {
    return { min: Math.min(...valeurs), max: Math.max(...valeurs) };
  }
}
