import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { accountRoutes } from './lib.routes';
import { AccountPageComponent } from './account-page/account-page.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { DividerComponent } from '../../../ui/src/lib/divider/divider.component';
import {
  PrimaryButtonComponent,
  SecondaryButtonComponent,
  TertiaryButtonComponent,
} from '@party-time/ui';

@NgModule({
  declarations: [RegisterComponent, AccountPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(accountRoutes),
    DividerComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    TertiaryButtonComponent,
  ],
})
export class AccountModule {}
