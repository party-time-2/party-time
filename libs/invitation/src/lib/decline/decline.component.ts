import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationService } from '../services/invitation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'party-time-decline',
  standalone: true,
  imports: [CommonModule],
  template: `<p>decline works!</p>`,
  styles: [],
  providers: [InvitationService],
})
export class DeclineComponent {
  eventId = this.route.snapshot.paramMap.get('eventId');
  constructor(private invitationService: InvitationService, private route: ActivatedRoute, private router: Router) {
    this.invitationService.declineInvitation(this.eventId as string).subscribe(
      () => {
        this.router.navigate(['/events']);
      },
    );
  }
}
