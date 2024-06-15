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
  template: `
    <ng-container *ngIf="participantEvent; else loading">
      <section
        class="m-5 max-w-md rounded-md border-2"
        [ngClass]="{
          'border-blue-500': participantEvent.invitationDetailsDTO.status === Status.INVITED,
          'border-green-500': participantEvent.invitationDetailsDTO.status === Status.PARTICIPATING,
          'border-red-500': participantEvent.invitationDetailsDTO.status === Status.DECLINED
        }"
      >
        <mat-card>
          <mat-card-header>
            {{ participantEvent.organizedEventDetailsDTO.name }} von
            {{ participantEvent.organizedEventDetailsDTO.organizer.name }}
          </mat-card-header>
          <mat-card-content>
            <p>
              {{
                participantEvent.organizedEventDetailsDTO.dateTime
                  | date: 'dd.MM.yyyy HH:mm'
              }}
              - {{ getStatusText(participantEvent.invitationDetailsDTO.status) }}
            </p>
            <p>
              {{ participantEvent.organizedEventDetailsDTO.address.addressLine }}
            </p>
            <p>
              <p>
              {{
                participantEvent.organizedEventDetailsDTO.address.addressLineAddition || ''
              }}
              </p>
              <p>
                <p>
              {{ participantEvent.organizedEventDetailsDTO.address.zip }},
              {{ participantEvent.organizedEventDetailsDTO.address.city }}
            </p>
            <p>
              {{ participantEvent.organizedEventDetailsDTO.address.country }}
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button
              [disabled]="
                participantEvent.invitationDetailsDTO.status === Status.PARTICIPATING
              "
              mat-button
              (click)="onParticipantStatusChange(participantEvent.organizedEventDetailsDTO.id, Status.PARTICIPATING)"
              color="primary"
            >
              Teilnehmen
            </button>
            <button
              [disabled]="
                participantEvent.invitationDetailsDTO.status === Status.DECLINED
              "
              mat-button
              (click)="onParticipantStatusChange(participantEvent.organizedEventDetailsDTO.id, Status.DECLINED)"
              color="warn"
            >
              Ablehnen
            </button>
          </mat-card-actions>
        </mat-card>
      </section>
    </ng-container>
    <ng-template #loading>
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    </ng-template>
  `,
  styles: [],
})
export class ParticipatingEventComponent {
  @Input() participantEvent: ParticipantEventDTO | undefined;
  @Output() participantStatusChange = new EventEmitter<{
    eventId: number;
    status: Status;
  }>();

  Status = Status;

  onParticipantStatusChange(eventId: number, status: Status) {
    this.participantStatusChange.emit({ eventId, status });
  }

  getStatusText(status: Status): string {
    const statusMap = {
      [Status.INVITED]: 'Eingeladen',
      [Status.PARTICIPATING]: 'Teilnehmer',
      [Status.DECLINED]: 'Abgelehnt',
    };
    return statusMap[status] || 'Unbekannt';
  }
}
