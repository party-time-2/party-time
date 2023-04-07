import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'party-time-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<p>footer works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
