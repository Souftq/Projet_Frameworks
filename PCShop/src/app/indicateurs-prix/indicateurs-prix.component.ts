import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-indicateurs-prix',
  standalone: false,
  templateUrl: './indicateurs-prix.component.html',
  styleUrl: './indicateurs-prix.component.css'
})
export class IndicateursPrixComponent {
  @Input() prix = 0;
  @Input() prixPromo: number | null = null;

  get enPromo(): boolean {
    return this.prixPromo !== null && this.prixPromo < this.prix;
  }

  get reduction(): number {
    return this.enPromo ? Math.round((1 - (this.prixPromo as number) / this.prix) * 100) : 0;
  }
}
