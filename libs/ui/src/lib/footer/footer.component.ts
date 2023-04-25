import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGoup, ILogo } from '@party-time/models';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'party-time-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent, DividerComponent],
  template: ` <footer class="sm:p-6">
    <party-time-divider></party-time-divider>
    <div class="md:flex md:justify-between">
      <div class="mb-6 md:mb-0" *ngIf="logo">
        <party-time-logo [logo]="logo"></party-time-logo>
      </div>
      <div class="md:flex md:justify-between">
        <section class="mb-6 md:mb-0">
          <ul
            class="mr-6 flex w-full flex-row flex-wrap justify-center gap-4"
            *ngFor="let grp of groups"
          >
            <li
              class="text-xl font-semibold hover:text-on-surface-variant-light dark:hover:text-on-secondary-light"
              *ngFor="let item of grp.links"
            >
              <ng-template #routerLink>
                <button
                  [routerLink]="item.routerLink"
                  *ngIf="item.routerLink; else routerLink"
                  class="hover:underline"
                >
                  {{ item.name }}
                </button></ng-template
              >
              <a
                [href]="item.href"
                *ngIf="item.href; else routerLink"
                class="hover:underline"
                >{{ item.name }}</a
              >
            </li>
          </ul>
        </section>
      </div>
    </div>
  </footer>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input()
  logo!: ILogo;
  @Input()
  groups!: IGoup[];
}
