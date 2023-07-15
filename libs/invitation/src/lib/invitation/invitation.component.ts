import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'party-time-invitation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitation.component.html',
  styles: [],
})
export class InvitationComponent {
  accept() {
    alert('Accepted!');
  }

  decline() {
    alert('Declined!');
  }

  
}
