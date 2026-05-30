import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PcService } from '../services/pc.service';
import { CartService } from '../services/cart.service';
import { Pc } from '../models/pc.model';

interface Composant {
  label: string;
  valeur: string;
}

interface Disponibilite {
  magasin: string;
  disponible: boolean;
}

@Component({
  selector: 'app-product-info',
  standalone: false,
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent implements OnInit {
  pc?: Pc;
  similaires: Pc[] = [];

  images: string[] = ['', '', ''];
  imageActive = 0;

  disponibilites: Disponibilite[] = [
    { magasin: 'PC SHOP Paris MC', disponible: true },
    { magasin: 'PC SHOP Noirs Centre', disponible: false },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pcService: PcService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.charger(Number(params.get('id'))));
  }

  private charger(id: number): void {
    this.pc = this.pcService.getById(id);
    this.imageActive = 0;
    this.similaires = this.pc ? this.pcService.getSimilaires(this.pc) : [];
  }

  get nom(): string {
    return this.pc ? `${this.pc.marque} ${this.pc.nom}` : '';
  }

  get description(): string {
    if (!this.pc) {
      return '';
    }
    const s = this.pc.system;
    return `${this.pc.marque} ${this.pc.nom} est un ordinateur ${this.pc.type} équipé de ${s.ram} Go de mémoire, ` +
      `d'un processeur ${s.cpu.marque} ${s.cpu.nom} et d'une carte graphique ${s.cg.marque} ${s.cg.modele}.`;
  }

  get composants(): Composant[] {
    if (!this.pc) {
      return [];
    }
    const s = this.pc.system;
    const liste: Composant[] = [
      { label: 'Processeur', valeur: `${s.cpu.marque} ${s.cpu.nom}` },
      { label: 'Mémoire vive', valeur: `${s.ram} Go` },
      { label: 'Stockage', valeur: `${s.hdd.type.toUpperCase()} · ${s.hdd.capacite} Go` },
      { label: 'Carte graphique', valeur: `${s.cg.marque} ${s.cg.modele}` },
    ];
    if (this.pc.ecran) {
      liste.push({ label: 'Écran', valeur: `${this.pc.ecran.taille}" ${this.pc.ecran.type}` });
    }
    if (this.pc.batterie) {
      liste.push({ label: 'Autonomie', valeur: `${this.pc.batterie.autonomie} h` });
    }
    return liste;
  }

  choisirImage(index: number): void {
    this.imageActive = index;
  }

  ajouterAuPanier(): void {
    if (this.pc) {
      this.cartService.ajouter(this.pc);
    }
  }

  ouvrirSimilaire(pc: Pc): void {
    this.router.navigate(['/produit', pc.id]);
  }
}
