import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'party-time-verify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent {
  token: string | null = null;
  constructor(route: ActivatedRoute) {
    this.token = route.snapshot.paramMap.get('token');
    console.log(this.token);
  }
}
