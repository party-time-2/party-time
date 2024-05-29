import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `<a [href]="href" class="flex items-center">
    <img [src]="src" class="mr-3 h-9" [alt]="alt" />
    <div class="">
      <span
        class="hover:text-on-surface-variant-light dark:hover:text-on-secondary-light self-center bg-no-repeat text-xl font-semibold sm:block"
      >
        {{ name }}
      </span>
    </div>
  </a>`,
  styles: ``,
})
export class LogoComponent {
  @Input() src: string | undefined;
  @Input() alt: string | undefined;
  @Input() href: string | undefined;
  @Input() name: string | undefined;
}
