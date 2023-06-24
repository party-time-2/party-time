//implements F006
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  PrimaryButtonComponent,
  MainHeaderComponent,
  PrimaryLabelComponent,
  PrimaryErrorComponent,
} from '@party-time/ui';

import { EventService } from '../services/event.service';
import { ParticipantsStore } from './+state/participants.state';
import { ActivatedRoute } from '@angular/router';
import { ParticipantsSelectorComponent } from '../selectors/participant-selector.component';

@Component({
  selector: 'party-time-participants',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    MainHeaderComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
    ParticipantsSelectorComponent,
  ],
  providers: [EventService, ParticipantsStore],
  templateUrl: './participants.component.html',
})
export class ParticipantsComponent {
  vm$ = this.participants.vm$;
  eventId = this.route.snapshot.paramMap.get('id');

  constructor(
    private participants: ParticipantsStore,
    private route: ActivatedRoute
  ) {
    this.participants.getParticipants(this.eventId as string);
  }
}
