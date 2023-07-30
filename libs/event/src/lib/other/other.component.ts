import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrimaryButtonComponent,
  MainHeaderComponent,
  PrimaryLabelComponent,
  PrimaryErrorComponent,
} from '@party-time/ui';
import { OtherStore } from './+state/other.state';
import { Router } from '@angular/router';
import { Address, ParticipantStatus } from '@party-time/models';
import { EventService } from '../services/event.service';
import { EventParticipatingSelectorComponent } from '../selectors/event-participating-selector.component';

@Component({
  selector: 'party-time-other',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    MainHeaderComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
    EventParticipatingSelectorComponent,
  ],
  templateUrl: './other.component.html',
  styles: [],
  providers: [OtherStore, EventService],
})
export class OtherComponent {
  vm$ = this.otherStore.vm$;

  constructor(private otherStore: OtherStore, private router: Router) {
    this.otherStore.getEvents();
  }

  navigateToMap(eventId: string) {
    this.router.navigate(['event/map', eventId]);
  }

  changeParticipantStatus(
    participantStatus: ParticipantStatus,
    eventId: string
  ) {
    if (participantStatus === ParticipantStatus.PARTICIPATING) {
      this.router.navigate([`invitation/${eventId}/accept`]);
    } else {
      this.router.navigate([`invitation/${eventId}/decline`]);
    }
  }
}
