import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

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
    <mat-toolbar color="primary">
      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with menu icon"
        [matMenuTriggerFor]="menu"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item routerLink="/events">Events</button>
        <button mat-menu-item [mat-menu-trigger-for]="account">Account</button>
        <button mat-menu-item routerLink="/impressum">Impressum</button>
        <button mat-menu-item routerLink="/datenschutz">
          Datenschutzerklärung
        </button>
      </mat-menu>
      <button routerLink="/">Party Time</button>
    </mat-toolbar>

    <mat-menu #account="matMenu">
      @if (isAuthenticated$ | async;) {

      <button mat-menu-item routerLink="/account/change-password">
        Passwort ändern
      </button>
      <button mat-menu-item routerLink="/account/delete">
        Account löschen
      </button>
      <button mat-menu-item (click)="logout()">Logout</button>

      }@else {
      <button mat-menu-item routerLink="/auth/login">Login</button>
      <button mat-menu-item routerLink="/account/register">Registrieren</button>
      <button mat-menu-item routerLink="/auth/verify">
        E-Mail verifizieren
      </button>
      }
    </mat-menu>
  `,
  styles: [
    `
      .example-spacer {
        flex: 1 1 auto;
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
