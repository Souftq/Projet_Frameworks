import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  seConnecter(email: string, motDePasse: string): void {
    // TODO: brancher l'authentification
    console.log('Connexion :', email, motDePasse);
  }
}
