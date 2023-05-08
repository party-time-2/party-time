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
    [id]="id"
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
    <ng-container *ngIf="!isLoading; else loading">
      {{ name }}
    </ng-container>
    <ng-template #loading>
      <div class="flex items-center justify-center">
        <div
          class="mr-5 h-5 w-5 animate-spin rounded-full border-b-2 border-primary-container-light"
        ></div>
        {{ lodingMessage }}
      </div>
    </ng-template>
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {
  @Input() name!: string;
  @Input() routerLink!: string;
  @Input() type!: string;
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() lodingMessage = 'Laden...';
  @Input()
  id: string | Math = Math.random().toString();
  @Output()
  clicked = new EventEmitter();
}
