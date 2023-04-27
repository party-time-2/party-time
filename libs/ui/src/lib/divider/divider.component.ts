import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'party-time-divider',
  standalone: true,
  imports: [CommonModule],
  template: ` <hr
    class="pt-4 dark:border-outline-dark sm:pt-6 md:pt-10 lg:pt-16"
  />`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {}
