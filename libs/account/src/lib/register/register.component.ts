import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'party-time-register',
  templateUrl: './register.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  submitFrom(form: any) {
    console.log(form);
  }
}
