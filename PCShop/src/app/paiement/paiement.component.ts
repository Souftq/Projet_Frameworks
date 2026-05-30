import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-paiement',
  standalone: false,
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.css'
})
export class PaiementComponent {
  moyensPaiement = ['VISA', 'MasterCard', 'PayPal', 'Klarna'];
  confirme = false;
  totalPaye = 0;

  constructor(public cart: CartService, private router: Router) {}

  confirmer(): void {
    this.totalPaye = this.cart.total;
    this.cart.vider();
    this.confirme = true;
  }

  retourAccueil(): void {
    this.router.navigate(['/']);
  }
}
