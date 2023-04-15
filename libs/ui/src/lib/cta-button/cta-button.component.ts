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
        text-on-primary-container-dark
        dark:text-on-primary-container-light
        bg-primary-container-dark
        dark:bg-primary-container-light
        mr-3
        h-9
        rounded-lg
        px-5
        hover:bg-primary-container-light
        hover:text-on-primary-container-light
        hover:dark:bg-primary-container-dark
        hover:dark:text-on-primary-container-dark
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
