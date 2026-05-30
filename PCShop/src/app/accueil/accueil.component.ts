import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TriService } from '../services/tri.service';

interface Categorie {
  titre: string;
  imageSrc: string;
  icone: string;
}

@Component({
  selector: 'app-accueil',
  standalone: false,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  categories: Categorie[] = [
    { titre: 'Gaming', imageSrc: '', icone: 'sports_esports' },
    { titre: 'Portable', imageSrc: '', icone: 'laptop' },
    { titre: 'Graphisme', imageSrc: '', icone: 'palette' },
    { titre: 'Bureautique', imageSrc: '', icone: 'business_center' },
  ];

  private readonly categorieVersCriteres: Record<string, Record<string, string>> = {
    Gaming: { domaine: 'Gaming' },
    Graphisme: { domaine: 'Design' },
    Bureautique: { domaine: 'Bureautique' },
    Portable: { type: 'Mobile' },
  };

  constructor(private router: Router, private tri: TriService) {}

  choisirConfiguration(type: 'manuelle' | 'assistee'): void {
    this.router.navigate([type === 'manuelle' ? '/manual' : '/assist']);
  }

  ouvrirCategorie(categorie: Categorie): void {
    this.tri.definirReponses(this.categorieVersCriteres[categorie.titre] ?? {});
    this.router.navigate(['/manual']);
  }
}
