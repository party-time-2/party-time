import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'party-time-secondary-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<button
    type="button"
    [routerLink]="routerLink"
    class="
          mr-3
          h-9
          rounded-lg
          bg-secondary-container-dark
          px-5
          text-on-secondary-container-dark
          hover:bg-secondary-container-light
          hover:text-on-secondary-container-light
          dark:bg-secondary-container-light
          dark:text-on-secondary-container-light
          hover:dark:bg-secondary-container-dark
          hover:dark:text-on-secondary-container-dark
        "
  >
    {{ name }}
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryButtonComponent {
  @Input() name!: string;
  @Input() routerLink!: string;
}
