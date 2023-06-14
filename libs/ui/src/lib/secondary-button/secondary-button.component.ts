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
  selector: 'party-time-secondary-button',
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
            bg-secondary-container-light
            px-5
            text-on-secondary-container-light
            hover:bg-secondary-container-dark
            hover:text-on-secondary-container-dark
            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:hover:bg-error-container-light
            disabled:hover:text-on-error-container-light
            dark:bg-secondary-container-dark
            dark:text-on-secondary-container-dark
            hover:dark:bg-secondary-container-light
            hover:dark:text-on-secondary-container-light
          "
  >
    <ng-container *ngIf="!isLoading; else loading">
      {{ name }}
    </ng-container>
    <ng-template #loading>
      <div class="flex items-center justify-center">
        <div
          class="mr-5 h-5 w-5 animate-spin rounded-full border-b-2 border-secondary-container-light"
        ></div>
        {{ loadingMessage }}
      </div>
    </ng-template>
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryButtonComponent {
  @Input() name!: string;
  @Input() routerLink!: string;
  @Input() type!: string;
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() loadingMessage = 'Laden...';
  @Input()
  id: string | Math = Math.random().toString();
  @Output()
  clicked = new EventEmitter();
}
