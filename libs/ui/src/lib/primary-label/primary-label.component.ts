import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'party-time-primary-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label
      [for]="id"
      class="mt-5 block text-sm font-medium leading-6 text-on-primary-container-light dark:text-on-primary-container-dark"
    >
      {{ label }}</label
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLabelComponent {
  @Input() label: string | undefined;
  @Input() id: string | undefined;
}
