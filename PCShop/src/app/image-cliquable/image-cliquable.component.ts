import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-cliquable',
  standalone: false,
  templateUrl: './image-cliquable.component.html',
  styleUrl: './image-cliquable.component.css'
})
export class ImageCliquableComponent {
  @Input() imageSrc: string = '';
  @Input() titre: string = '';
  @Input() icone: string = '';
  @Output() clicked = new EventEmitter<void>();
}
