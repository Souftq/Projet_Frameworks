import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PcService } from '../services/pc.service';
import { TriService } from '../services/tri.service';
import { Pc } from '../models/pc.model';

type CleFiltre = 'type' | 'marque' | 'ram' | 'cpu' | 'prix';

interface GroupeFiltre {
  cle: CleFiltre;
  titre: string;
  options: string[];
}

@Component({
  selector: 'app-choices-manual',
  standalone: false,
  templateUrl: './choices-manual.component.html',
  styleUrl: './choices-manual.component.css'
})
export class ChoicesManualComponent {
  private readonly tranches = ['< 500 €', '500 – 1000 €', '1000 – 1500 €', '> 1500 €'];

  groupes: GroupeFiltre[];
  selections: Record<string, string[]> = {};
  recherche = '';
  pcsFiltres: Pc[] = [];

  constructor(
    private pcService: PcService,
    private route: ActivatedRoute,
    private router: Router,
    public tri: TriService,
  ) {
    const pcs = this.pcService.getAll();
    const distinct = (valeurs: string[]) => Array.from(new Set(valeurs));

    this.groupes = [
      { cle: 'type', titre: 'Type', options: distinct(pcs.map(p => p.type)) },
      { cle: 'marque', titre: 'Marque', options: distinct(pcs.map(p => p.marque)) },
      {
        cle: 'ram',
        titre: 'Mémoire vive',
        options: distinct(pcs.map(p => `${p.system.ram} Go`)).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
      },
      { cle: 'cpu', titre: 'Processeur', options: distinct(pcs.map(p => p.system.cpu.marque)) },
      { cle: 'prix', titre: 'Gamme de prix', options: this.tranches.filter(t => pcs.some(p => this.trancheePrix(p.prix) === t)) },
    ];

    this.route.queryParamMap.subscribe(params => {
      this.recherche = params.get('q') ?? '';
      this.appliquerFiltres();
    });
  }

  majSelection(cle: CleFiltre, valeurs: string[]): void {
    this.selections[cle] = valeurs;
    this.appliquerFiltres();
  }

  effacerRecommandation(): void {
    this.tri.reset();
    this.appliquerFiltres();
  }

  ouvrirPc(pc: Pc): void {
    this.router.navigate(['/produit', pc.id]);
  }

  private appliquerFiltres(): void {
    let resultat = this.pcService.getAll()
      .filter(pc => this.correspond(pc) && this.correspondRecherche(pc));
    if (this.tri.actif) {
      resultat = this.tri.classer(resultat);
    }
    this.pcsFiltres = resultat;
  }

  private correspondRecherche(pc: Pc): boolean {
    const terme = this.recherche.trim().toLowerCase();
    if (!terme) {
      return true;
    }
    const texte = `${pc.marque} ${pc.nom} ${pc.system.cpu.marque} ${pc.system.cpu.nom}`.toLowerCase();
    return texte.includes(terme);
  }

  private correspond(pc: Pc): boolean {
    return this.groupes.every(groupe => {
      const selection = this.selections[groupe.cle];
      if (!selection || selection.length === 0) {
        return true;
      }
      return this.valeurPc(pc, groupe.cle).some(valeur => selection.includes(valeur));
    });
  }

  private valeurPc(pc: Pc, cle: CleFiltre): string[] {
    switch (cle) {
      case 'type': return [pc.type];
      case 'marque': return [pc.marque];
      case 'ram': return [`${pc.system.ram} Go`];
      case 'cpu': return [pc.system.cpu.marque];
      case 'prix': return [this.trancheePrix(pc.prix)];
    }
  }

  private trancheePrix(prix: number): string {
    if (prix < 500) {
      return '< 500 €';
    }
    if (prix < 1000) {
      return '500 – 1000 €';
    }
    if (prix < 1500) {
      return '1000 – 1500 €';
    }
    return '> 1500 €';
  }
}
