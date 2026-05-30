import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TriService } from '../services/tri.service';

interface Question {
  cle: string;
  titre: string;
  options: string[];
  /** Question affichée uniquement si l'utilisateur a choisi un ordinateur portable. */
  siPortable?: boolean;
}

@Component({
  selector: 'app-choices-assisted',
  standalone: false,
  templateUrl: './choices-assisted.component.html',
  styleUrl: './choices-assisted.component.css'
})
export class ChoicesAssistedComponent {
  questions: Question[] = [
    { cle: 'type', titre: "Type d'ordinateur", options: ['Fixe', 'Mobile'] },
    { cle: 'temps', titre: "Temps d'utilisation", options: ['-6h', '6-8h', '+10h'], siPortable: true },
    { cle: 'ecran', titre: "Taille d'écran", options: ['Petit ~12"', 'Moyen ~14"', 'Grand +16"'], siPortable: true },
    { cle: 'domaine', titre: "Domaine d'utilisation", options: ['Design', 'Gaming', 'Développement', 'Bureautique'] },
    { cle: 'prix', titre: 'Gamme de prix', options: ['Min', 'Moyen', 'Max'] },
  ];

  reponses: { [cle: string]: string } = {};

  constructor(private router: Router, private tri: TriService) {}

  get estPortable(): boolean {
    return this.reponses['type'] === 'Mobile';
  }

  estVisible(question: Question): boolean {
    return !question.siPortable || this.estPortable;
  }

  selectionner(cle: string, option: string): void {
    this.reponses[cle] = option;
    // Un ordinateur fixe n'a ni écran ni batterie : on oublie ces réponses.
    if (cle === 'type' && option !== 'Mobile') {
      delete this.reponses['temps'];
      delete this.reponses['ecran'];
    }
  }

  estSelectionne(cle: string, option: string): boolean {
    return this.reponses[cle] === option;
  }

  valider(): void {
    this.tri.definirReponses(this.reponses);
    this.router.navigate(['/manual']);
  }
}
