//implements F006
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventService, ParticipantsStore],
  templateUrl: './participants.component.html',
})
export class ParticipantsComponent {
  vm$ = this.participants.vm$;
  eventId = this.route.snapshot.paramMap.get('id');
  
  // form group to add a participant
  addParticipantForm = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  
  onRemoveParticipant(email: string | undefined) {
    if (email) {
      this.participants.removeParticipant({
        eventId: this.eventId as string,
        email,
      });
    }
  }

  onSubmit() {
    if (this.addParticipantForm.valid) {
      this.participants.addParticipant({
        eventId: this.eventId as string,
        email: this.addParticipantForm.value.email as string,
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addParticipantForm.controls;
  }

  constructor(
    private participants: ParticipantsStore,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.participants.getParticipants(this.eventId as string);
  }
}
