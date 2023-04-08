import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'party-time-cta-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: ` <button
    type="button"
    [routerLink]="routerLink"
    class="
        text-on-tertiary-container-dark
        dark:text-on-tertiary-container-light
        bg-tertiary-container-dark
        dark:bg-tertiary-container-light
        mr-3
        h-9
        rounded-lg
        px-5
        hover:bg-tertiary-container-light
        hover:text-on-tertiary-container-light
        hover:dark:bg-tertiary-container-dark
        hover:dark:text-on-tertiary-container-dark
"
  >
    {{ name }}
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaButtonComponent {
  @Input() name!: string;
  @Input() routerLink!: string;
}
