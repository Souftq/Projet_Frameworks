import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titres',
  standalone: false,
  templateUrl: './titres.component.html',
  styleUrl: './titres.component.css'
})
export class TitresComponent {
  @Input() texte: string = '';
}
