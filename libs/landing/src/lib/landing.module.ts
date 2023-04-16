import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { landingRoutes } from './lib.routes';
import { HeadlineComponent } from './headline/headline.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(landingRoutes)],
  declarations: [HeadlineComponent, LandingPageComponent],
})
export class LandingModule {}
