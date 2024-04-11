import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHostService } from 'apps/party-time-frontend-17/src/app/services/event/host/event.host.service';
import { IEventHostService } from 'apps/party-time-frontend-17/src/app/models/event.host.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from 'apps/party-time-frontend-17/src/app/components/page-header/page-header.component';
import { NavbarComponent } from 'apps/party-time-frontend-17/src/app/components/navbar/navbar.component';
import { FooterComponent } from 'apps/party-time-frontend-17/src/app/components/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import {
  EventDetailsDTO,
  OrganizerEventDTO,
} from 'apps/party-time-frontend-17/src/app/models/dto/event-dto.interface';
import { ApiError } from 'apps/party-time-frontend-17/src/app/models/error.interface';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    PageHeaderComponent,
    NavbarComponent,
    FooterComponent,
    MatProgressSpinnerModule,
    EventCardComponent,
  ],
  template: `<app-navbar></app-navbar>
    <section class="flex h-screen flex-col items-center justify-center">
      <app-page-header
        Title="Meine Events"
        data-cy="events-header"
      ></app-page-header>
      @if (events$ | async; as events) { @for (event of events; track $index) {
      <app-event-card
        [eventDetailsDTO]="event"
        (deleteEvent)="deleteEvent($event)"
      ></app-event-card>
      } } @else {
      <mat-spinner></mat-spinner>
      }
    </section>
    <app-footer></app-footer>`,
  providers: [EventHostService],
  styles: ``,
})
export class EventsComponent {
  private eventHostService: IEventHostService = inject(EventHostService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  events$: Observable<EventDetailsDTO[]> =
    this.eventHostService.getOrganizedEvents();

  deleteEvent(eventId: number): void {
    this.eventHostService.deleteEvent(eventId).subscribe({
      next: () => {
        this.snackBar.open('Event gelöscht.', 'OK', {
          duration: 2000,
        });
        this.events$ = this.eventHostService.getOrganizedEvents();
      },
      error: (apiError: ApiError) => {
        this.snackBar.open(apiError.message, 'OK', {
          duration: 2000,
        });
        this.events$ = this.eventHostService.getOrganizedEvents();
      },
    });
  }
}
