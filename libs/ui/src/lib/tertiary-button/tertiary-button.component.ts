import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'party-time-tertiary-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<button
    type="button"
    [routerLink]="routerLink"
    class="
            h-9
            rounded-lg
            bg-tertiary-container-light
            px-5
            text-on-tertiary-container-light
            hover:bg-tertiary-container-dark
            hover:text-on-tertiary-container-dark
            dark:bg-tertiary-container-dark
            dark:text-on-tertiary-container-light
            hover:dark:bg-tertiary-container-dark
            hover:dark:text-on-tertiary-container-dark
        "
  >
    {{ name }}
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TertiaryButtonComponent {
  @Input() name!: string;
  @Input() routerLink!: string;
}
