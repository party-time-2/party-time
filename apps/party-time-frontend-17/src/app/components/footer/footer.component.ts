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
    <footer class="bg-primary text-white py-8">
      <div class="container mx-auto text-center mb-8">
        <p class="text-lg font-bold">Übersicht aller Links der Webseite</p>
      </div>
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <h3 class="font-bold mb-4">Party Time</h3>
          <ul>
            <li><a routerLink="/" class="hover:underline">Startseite</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-4">Account</h3>
          <ul>
            <li><a routerLink="/account/register" class="hover:underline">Registrieren</a></li>
            <li><a routerLink="/account/change-password" class="hover:underline">Passwort ändern</a></li>
            <li><a routerLink="/account/delete" class="hover:underline">Account löschen</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-4">Events</h3>
          <ul>
            <li><a routerLink="/events" class="hover:underline">Übersicht</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-4">Authentifizierung</h3>
          <ul>
            <li><a routerLink="/auth/login" class="hover:underline">Login</a></li>
            <li><a routerLink="/auth/verify" class="hover:underline">Verifizieren</a></li>
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
