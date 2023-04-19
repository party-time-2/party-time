import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'party-time-primary-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<button
    type="button"
    [routerLink]="routerLink"
    class="
            h-9
            rounded-lg
            bg-primary-container-light
            px-5
            text-on-primary-container-light
            hover:bg-primary-container-dark
            hover:text-on-primary-container-dark
            dark:bg-primary-container-dark
            dark:text-on-primary-container-light
            hover:dark:bg-primary-container-dark
            hover:dark:text-on-primary-container-dark
          "
  >
    {{ name }}
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {
  @Input() name!: string;
  @Input() routerLink!: string;
}
