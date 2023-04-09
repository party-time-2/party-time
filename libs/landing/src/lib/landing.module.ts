import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { landingRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(landingRoutes),
    RouterModule.forChild(landingRoutes),
  ],
})
export class LandingModule {}
