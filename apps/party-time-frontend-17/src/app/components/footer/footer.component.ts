import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-primary py-8 text-white">
      <div class="container mx-auto mb-8 text-center">
        <p class="text-lg font-bold">Übersicht aller Links der Webseite</p>
      </div>
      <div
        class="container mx-auto grid grid-cols-1 gap-8 text-center md:grid-cols-2 md:text-left lg:grid-cols-4"
      >
        <div>
          <h3 class="mb-4 font-bold">Party Time</h3>
          <ul>
            <li><a routerLink="/" class="hover:underline">Startseite</a></li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 font-bold">Account</h3>
          <ul>
            <li>
              <a routerLink="/account/register" class="hover:underline"
                >Registrieren</a
              >
            </li>
            <li>
              <a routerLink="/account/change-password" class="hover:underline"
                >Passwort ändern</a
              >
            </li>
            <li>
              <a routerLink="/account/delete" class="hover:underline"
                >Account löschen</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 font-bold">Events</h3>
          <ul>
            <li>
              <a routerLink="/events" class="hover:underline">Übersicht</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 font-bold">Authentifizierung</h3>
          <ul>
            <li>
              <a routerLink="/auth/login" class="hover:underline">Login</a>
            </li>
            <li>
              <a routerLink="/auth/verify" class="hover:underline"
                >Verifizieren</a
              >
            </li>
            <li><a (click)="logout()" class="hover:underline">Logout</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        background-color: #3f51b5;
      }
    `,
  ],
  providers: [AuthService],
})
export class FooterComponent {
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
