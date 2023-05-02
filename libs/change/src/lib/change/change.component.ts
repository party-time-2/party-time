import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeService } from '../services/change.service';

@Component({
  selector: 'party-time-change',
  standalone: true,
  imports: [CommonModule],
  template: `<p>change works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeComponent {
  constructor(private changeService: ChangeService) {
    changeService
      .changePassword({
        newPassword: 'Party123123!u',
        oldPassword: 'Party123123!s',
      })
      .subscribe((res) => console.log(res.status));
  }
}
