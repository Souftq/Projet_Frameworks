import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() selected: boolean = false;
  @Input() primary: boolean = false;
  @Input() block: boolean = false;
  @Output() clicked = new EventEmitter<void>();
}
