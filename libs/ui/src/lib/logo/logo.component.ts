import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILogo } from '@party-time/models';

@Component({
  selector: 'party-time-logo',
  standalone: true,
  imports: [CommonModule],
  template: ` <a *ngIf="logo" [href]="logo.href" class="flex items-center">
    <img [src]="logo.src" class="mr-3 h-9" [alt]="logo.alt" />
    <div class="">
      <span
        class="self-center bg-no-repeat text-xl font-semibold hover:text-on-surface-variant-light dark:hover:text-on-secondary-light sm:block"
      >
        {{ logo.name }}
      </span>
    </div>
  </a>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  @Input()
  logo!: ILogo;
}
