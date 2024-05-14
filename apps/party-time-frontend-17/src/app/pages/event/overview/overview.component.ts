import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { EventHostService } from '../../../services/event/host/event.host.service';
import { EventParticipantsService } from '../../../services/event/participants/event.participants.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventDetailsComponent } from '../components/event-details/event-details.component';
import { ParticipatingEventComponent } from '../components/participating-Event/participating-Event.component';
import { ApiError } from '../../../models/error.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from '../components/event-dialog/event-dialog.component';
import {
  AccountInvitationDetailsDTO,
  EventCreateDTO,
  EventDetailsDTO,
  OrganizerEventDTO,
} from '../../../models/dto/event-dto.interface';
import { BehaviorSubject } from 'rxjs';
import { ParticipantsDialogComponent } from '../components/participants-dialog/participants-dialog.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    PageHeaderComponent,
    MatProgressSpinnerModule,
    EventDetailsComponent,
    ParticipatingEventComponent,
    MatIconModule,
    MatButtonModule,
    EventDetailsComponent,
  ],
  template: `<app-navbar></app-navbar>
    <app-page-header title="Events"></app-page-header>
    <H2 class="text-center">Organisierte Events</H2>
    <div class="flex flex-row justify-center pt-5">
      <button mat-fab color="primary" (click)="addNewEvent()">
        <mat-icon>add</mat-icon>
      </button>
    </div>
    <div class="flex flex-wrap justify-center">
      @if (organizedEvents$ | async) { @for (organizedEvent of organizedEvents$
      | async; track $index) {
      <app-event-details
        (deleteClicked)="onEventDelete($event)"
        (editClicked)="onEventEdit($event)"
        (participantsClicked)="onParticipant($event)"
        [eventDetails]="organizedEvent"
      ></app-event-details>
      }@empty {
      <p>No events found</p>
      } }@else {
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      }
    </div>

    <H2 class="text-center">Einladungen</H2>
    <div class="flex flex-wrap justify-center">
      @if (participatingEvents$ | async) { @for (participatingEvent of
      participatingEvents$ | async; track $index) {
      <app-participating-event
        [participantEvent]="participatingEvent"
        (participantStatusChange)="onParticipantStatusChange($event)"
      />
      }@empty {
      <p>No events found</p>
      }}@else {
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      }
    </div>
    <app-footer></app-footer> `,
  styles: ``,
  providers: [EventHostService, EventParticipantsService],
})
export class OverviewComponent {
  private eventHostService = inject(EventHostService);
  private eventParticipantsService = inject(EventParticipantsService);
  private snackBar = inject(MatSnackBar);
  private openDialog = inject(MatDialog);
  private organizedEventsSource = new BehaviorSubject<EventDetailsDTO[]>([]);
  organizedEvents$ = this.organizedEventsSource.asObservable();
  participatingEvents$ = this.eventParticipantsService.getParticipatingEvents();

  constructor() {
    this.eventHostService.getOrganizedEvents().subscribe((events) => {
      this.organizedEventsSource.next(events);
    });
  }

  addNewEvent() {
    const dialogRef = this.openDialog.open(EventDialogComponent, {
      data: { eventDetailsDTO: null },
    });
    dialogRef.afterClosed().subscribe((result: EventCreateDTO | null) => {
      if (result) {
        this.eventHostService.createEvent(result).subscribe({
          next: (organizerEventDTO: OrganizerEventDTO) => {
            const currentEvents = this.organizedEventsSource.value;
            this.organizedEventsSource.next([
              ...currentEvents,
              organizerEventDTO.eventDetailsDTO,
            ]);
          },
          error: (error: ApiError) => {
            // Display the detailed error message using MatSnackBar
            this.snackBar.open('Event konnte nicht erstellt werden', 'Ok', {
              duration: 5000,
            });
          },
        });
      }
    });
  }

  onEventEdit(eventDetailsDTO: EventDetailsDTO) {
    const dialogRef = this.openDialog.open(EventDialogComponent, {
      data: { eventDetailsDTO },
    });
    dialogRef.afterClosed().subscribe((result: EventDetailsDTO | null) => {
      if (result) {
        this.eventHostService.updateEvent(result).subscribe({
          next: (organizerEventDTO: OrganizerEventDTO) => {
            const currentEvents = this.organizedEventsSource.value;
            this.organizedEventsSource.next(
              currentEvents.map((event) =>
                event.id === eventDetailsDTO.id
                  ? organizerEventDTO.eventDetailsDTO
                  : event
              )
            );
          },
          error: (error: ApiError) => {
            this.snackBar.open('Event konnte nicht bearbeitet werden', 'Ok', {
              duration: 5000,
            });
          },
        });
      }
    });
  }

  onEventDelete(eventId: number) {
    this.eventHostService.deleteEvent(eventId).subscribe({
      next: () => {
        const currentEvents = this.organizedEventsSource.value;
        this.organizedEventsSource.next(
          currentEvents.filter((event) => event.id !== eventId)
        );
        this.snackBar.open('Event gelöscht', 'Ok', { duration: 2000 });
      },
      error: (error: ApiError) => {
        this.snackBar.open(error.message, 'Ok', { duration: 2000 });
      },
    });
  }

  onParticipant(eventId: number) {
    this.eventHostService.getParticipants(eventId).subscribe({
      next: (accountInvitationDetailsDTO: AccountInvitationDetailsDTO[]) => {
        this.openDialog.open(ParticipantsDialogComponent, {
          data: { accountInvitationDetailsDTO },
        });
      },
      error: (error: ApiError) => {
        this.snackBar.open(error.message, 'Ok', { duration: 2000 });
      },
    });
  }

  onParticipantStatusChange(event: { eventId: number; status: number }) {
    if (event.status === 1) {
      this.eventParticipantsService
        .acceptEvent(event.eventId.toString())
        .subscribe({
          next: () => {
            this.participatingEvents$ =
              this.eventParticipantsService.getParticipatingEvents();
          },
          error: (error: ApiError) => {
            this.snackBar.open(error.message, 'Ok', { duration: 2000 });
          },
        });
    } else {
      this.eventParticipantsService
        .declineEvent(event.eventId.toString())
        .subscribe({
          next: () => {
            this.participatingEvents$ =
              this.eventParticipantsService.getParticipatingEvents();
          },
          error: (error: ApiError) => {
            this.snackBar.open(error.message, 'Ok', { duration: 2000 });
          },
        });
    }
  }
}
