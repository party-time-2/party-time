import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { landingRoutes } from './lib.routes';
import { HeadlineComponent } from './headline/headline.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StepperComponent } from './stepper/stepper.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(landingRoutes)],
  declarations: [
    HeadlineComponent,
    LandingPageComponent,
    StepperComponent,
    ImageComponent,
  ],
})
export class LandingModule {}
