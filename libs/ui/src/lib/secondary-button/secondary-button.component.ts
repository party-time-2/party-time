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
            h-9
            rounded-lg
            bg-secondary-container-light
            px-5
            text-on-secondary-container-light
            hover:bg-secondary-container-dark
            hover:text-on-secondary-container-dark
            dark:bg-secondary-container-dark
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
