import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-image-cliquable',
  standalone: false,
  templateUrl: './image-cliquable.component.html',
  styleUrl: './image-cliquable.component.css'
})
export class ImageCliquableComponent {
  @Input() imageSrc: string = '';
  @Input() titre: string = '';
}
