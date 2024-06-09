import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [AuthService],
  template: `
    <mat-toolbar color="primary" class="flex justify-between items-center">
      <button
        mat-icon-button
        class="lg:hidden"
        aria-label="Menu"
        [matMenuTriggerFor]="menu"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span class="text-xl font-bold">Party Time</span>
      <div class="hidden lg:flex space-x-4">
        <button mat-button routerLink="/events">Events</button>
        <ng-container *ngIf="isAuthenticated$ | async; else guestLinks">
          <button mat-button [matMenuTriggerFor]="account">Account</button>
        </ng-container>
        <ng-template #guestLinks>
          <button mat-button routerLink="/auth/login">Login</button>
          <button mat-button routerLink="/account/register">Regestrieren</button>
        </ng-template>
      </div>
    </mat-toolbar>

    <mat-menu #menu="matMenu">
      <button mat-menu-item routerLink="/events">Events</button>
      <ng-container *ngIf="isAuthenticated$ | async; else guestMenu">
        <button mat-menu-item [matMenuTriggerFor]="account">Account</button>
      </ng-container>
      <ng-template #guestMenu>
        <button mat-menu-item routerLink="/auth/login">Login</button>
        <button mat-menu-item routerLink="/account/register">Regestrieren</button>
      </ng-template>
    </mat-menu>

    <mat-menu #account="matMenu">
      <ng-container *ngIf="isAuthenticated$ | async; else guest">
        <button mat-menu-item routerLink="/account/change-password">Passwort ändern</button>
        <button mat-menu-item routerLink="/account/delete">Account löschen</button>
        <button mat-menu-item (click)="logout()">Logout</button>
      </ng-container>
      <ng-template #guest>
        <button mat-menu-item routerLink="/auth/login">Login</button>
        <button mat-menu-item routerLink="/account/register">Regestrieren</button>
      </ng-template>
    </mat-menu>
  `,
  styles: [
    `
      @media (min-width: 1024px) {
        .lg\\:hidden {
          display: none;
        }
        .lg\\:flex {
          display: flex;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>;
  private router = inject(Router);

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
