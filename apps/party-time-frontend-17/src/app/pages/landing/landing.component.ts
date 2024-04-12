import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    MatButtonModule,
    RouterLink,
  ],
  template: `<app-navbar></app-navbar>
    <section class="flex h-screen flex-col items-center justify-center">
      <h1 class="text-4xl font-bold">Willkommen bei Party Time</h1>
      <p class="mt-4 text-lg">Die Plattform für deine nächste Party</p>
      <button mat-raised-button color="primary" class="mt-4" routerLink="/">
        Party erstellen
      </button>
    </section>
    <app-footer></app-footer>`,
  styles: ``,
})
export class LandingComponent {}
