import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ParticipantEventDTO,
  Status,
} from 'apps/party-time-frontend-17/src/app/models/dto/event-dto.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-participating-event',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
  ],
  template: `@if(participantEvent){
    <section class="m-5 max-w-md rounded-md border-2 border-red-500">
      <mat-card>
        <mat-card-header
          >{{ participantEvent.organizedEventDetailsDTO.name }} von
          {{ participantEvent.organizedEventDetailsDTO.organizer.name }}
        </mat-card-header>
        <mat-card-content>
          <p>
            {{
              participantEvent.organizedEventDetailsDTO.dateTime
                | date : 'dd.MM.yyyy HH:mm'
            }}
            - {{ participantEvent.invitationDetailsDTO.status }}
          </p>
          <pre>{{
            participantEvent.organizedEventDetailsDTO.address | json
          }}</pre>
        </mat-card-content>
        <mat-card-actions>
          <button
            [disabled]="
              participantEvent.invitationDetailsDTO.status.toString() ===
              'PARTICIPATING'
            "
            mat-button
            (click)="
              onParticipantStatusChange(
                participantEvent.organizedEventDetailsDTO.id,
                1
              )
            "
            color="primary"
          >
            Teilnehmen
          </button>
          <button
            [disabled]="
              participantEvent.invitationDetailsDTO.status.toString() ===
              'DECLINED'
            "
            mat-button
            (click)="
              onParticipantStatusChange(
                participantEvent.organizedEventDetailsDTO.id,
                2
              )
            "
            color="warn"
          >
            Ablehnen
          </button>
        </mat-card-actions>
      </mat-card>
    </section>
    }@else {
    <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>} `,
  styles: ``,
})
export class ParticipatingEventComponent {
  @Input() participantEvent: ParticipantEventDTO | undefined;
  @Output() participantStatusChange = new EventEmitter<{
    eventId: number;
    status: Status;
  }>();

  onParticipantStatusChange(eventId: number, status: Status) {
    this.participantStatusChange.emit({ eventId, status });
  }
}
