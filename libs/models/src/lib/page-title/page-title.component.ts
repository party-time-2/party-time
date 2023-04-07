import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'party-time-page-title',
  standalone: true,
  imports: [CommonModule],
  template: `<p>page-title works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleComponent {}
