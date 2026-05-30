import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  standalone: false,
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css'
})
export class DropDownComponent {
  @Input() titre: string = '';
  @Input() options: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();

  ouvert = false;
  private selection = new Set<string>();

  basculer(): void {
    this.ouvert = !this.ouvert;
  }

  estCoche(option: string): boolean {
    return this.selection.has(option);
  }

  basculerOption(option: string, coche: boolean): void {
    if (coche) {
      this.selection.add(option);
    } else {
      this.selection.delete(option);
    }
    this.selectionChange.emit([...this.selection]);
  }
}
