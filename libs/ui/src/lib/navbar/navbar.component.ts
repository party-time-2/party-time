import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILink, ILogo } from '@party-time/models';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
  selector: 'party-time-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent, PrimaryButtonComponent],
  template: `
    <nav class="w-full max-w-full pl-3 pr-6 pt-4">
      <div
        class="container mx-auto flex flex-wrap items-center justify-between"
      >
        <party-time-logo [logo]="logo"></party-time-logo>
        <div class="flex md:order-2">
          <party-time-primary-button
            *ngIf="cta.routerLink"
            [routerLink]="cta.routerLink"
            [name]="cta.name"
            class="hidden lg:block"
          ></party-time-primary-button>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            class="inline-flex items-center rounded-lg bg-primary-light p-2 text-sm text-on-primary-light dark:bg-primary-dark dark:text-on-primary-dark md:hidden"
            aria-controls="navbar-cta"
            aria-expanded="false"
            (click)="toggleMenu()"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          [ngClass]="{ hidden: !showMenu, flex: showMenu }"
          class="w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-cta"
        >
          <ul
            class="mt-4 flex flex-col rounded-lg border p-4 md:mt-0 md:flex-row md:space-x-6 md:border-0 md:text-sm md:font-medium "
          >
            <li *ngFor="let link of links">
              <button
                [routerLink]="link.routerLink"
                (click)="closeMenu()"
                class="block py-2 pl-3 pr-4 hover:text-on-surface-variant-light hover:underline dark:hover:text-on-secondary-light md:p-0 "
                aria-current="page"
              >
                {{ link.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
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

  closeMenu(): void {
    this.showMenu = false;
  }
}
