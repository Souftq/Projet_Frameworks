import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOuvert = false;

  constructor(public cart: CartService, private router: Router) {}

  basculerMenu(): void {
    this.menuOuvert = !this.menuOuvert;
  }

  rechercher(terme: string): void {
    const q = terme.trim();
    this.router.navigate(['/manual'], { queryParams: q ? { q } : {} });
  }
}
