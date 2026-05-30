import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-total',
  standalone: false,
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.css'
})
export class CartTotalComponent {
  @Input() total = 0;
  moyensPaiement = ['VISA', 'MasterCard', 'PayPal', 'Klarna'];

  constructor(private router: Router) {}

  payer(): void {
    this.router.navigate(['/paiement']);
  }
}
