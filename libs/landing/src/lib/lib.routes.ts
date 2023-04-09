import { Route } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const landingRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
];
