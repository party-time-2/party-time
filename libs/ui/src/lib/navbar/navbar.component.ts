import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILink, ILogo } from '@party-time/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'party-time-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="px-2 py-2.5 sm:px-4 bg-red-500">
      <div
        class="container mx-auto flex flex-wrap items-center justify-between bg-red"
      ></div>
    </nav>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input()
  logo!: ILogo;
  @Input()
  links!: ILink[];
  @Input()
  cta!: ILink;

  showMenu = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
