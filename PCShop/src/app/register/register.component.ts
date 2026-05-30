import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  sInscrire(nom: string, email: string, motDePasse: string, confirmation: string): void {
    // TODO: brancher la création de compte
    if (motDePasse !== confirmation) {
      console.warn('Les mots de passe ne correspondent pas');
      return;
    }
    console.log('Inscription :', nom, email);
  }
}
