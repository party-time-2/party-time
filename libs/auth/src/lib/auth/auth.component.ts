//implements F011
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'party-time-auth',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<router-outlet></router-outlet>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
