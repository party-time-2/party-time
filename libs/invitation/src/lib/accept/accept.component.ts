import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationService } from '../services/invitation.service';

@Component({
  selector: 'party-time-accept',
  standalone: true,
  imports: [CommonModule],
  template: `<p>accept works!</p>`,
  styles: [],
  providers: [InvitationService],
})
export class AcceptComponent {}
