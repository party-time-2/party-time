import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'party-time-inverted-button',
  standalone: true,
  imports: [CommonModule],
  template: `<p>inverted-button works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvertedButtonComponent {}
