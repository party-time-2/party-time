import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'party-time-main-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1
      class="m-10 h-full text-3xl font-extrabold text-on-background-light dark:text-on-background-dark md:text-5xl lg:pt-5 lg:text-6xl"
    >
      {{ title }}
    </h1>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {
  @Input() title!: string | undefined;
}
