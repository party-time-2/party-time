import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'party-time-primary-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<button
    type="button"
    [routerLink]="routerLink"
    (click)="clicked.emit()"
    [disabled]="disabled"
    [type]="type"
    class="
            h-9
            rounded-lg
            bg-primary-container-light
            px-5
            text-on-primary-container-light
            hover:bg-primary-container-dark
            hover:text-on-primary-container-dark
            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:hover:bg-error-container-light
            disabled:hover:text-on-error-container-light
            dark:bg-primary-container-dark
            dark:text-on-primary-container-dark
            hover:dark:bg-primary-container-light
            hover:dark:text-on-primary-container-light
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
  @Input() type!: string;
  @Input() disabled = false;
  @Output()
  clicked = new EventEmitter();
}
