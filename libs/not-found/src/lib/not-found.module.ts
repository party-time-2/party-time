import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { notFoundRoutes } from './lib.routes';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PrimaryButtonComponent } from '@party-time/ui';

@NgModule({
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    RouterModule.forChild(notFoundRoutes),
  ],
  declarations: [NotFoundPageComponent],
})
export class NotFoundModule {}
