import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationService } from '../services/invitation.service';

@Component({
  selector: 'party-time-decline',
  standalone: true,
  imports: [CommonModule],
  template: `<p>decline works!</p>`,
  styles: [],
  providers: [InvitationService],
})
export class DeclineComponent {}
