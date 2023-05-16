import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'party-time-primary-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex text-error-light dark:text-error-dark" role=" alert">
      <div class="text-sm font-medium">{{ error }}</div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryErrorComponent {
  @Input() error: string | undefined;
}
