import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'party-time-logo',
  standalone: true,
  imports: [CommonModule],
  template: `<p>logo works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}
