// implements F008
// implements F009
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationService } from '../services/invitation.service';
import { InvitationStore } from '../+state/invitation.state';
import { ActivatedRoute } from '@angular/router';
import { LoadingCircleComponent, PrimaryButtonComponent } from '@party-time/ui';

@Component({
  selector: 'party-time-invitation',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent, LoadingCircleComponent],
  templateUrl: './invitation.component.html',
  styles: [],
  providers: [InvitationService, InvitationStore],
})
export class InvitationComponent {
  eventId = this.route.snapshot.paramMap.get('eventId');
  action = this.route.snapshot.paramMap.get('action');
  vm$ = this.invitationStore.vm$;
  
  constructor(private route: ActivatedRoute, private invitationStore: InvitationStore) {
    if (this.action === 'accept') {
      this. invitationStore.getAccept(this.eventId as string);
    }
    if (this.action === 'decline') {
      this.invitationStore.getDecline(this.eventId as string);
    }
  }

}
