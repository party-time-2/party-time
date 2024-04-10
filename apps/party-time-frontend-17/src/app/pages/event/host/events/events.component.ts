import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHostService } from 'apps/party-time-frontend-17/src/app/services/event/host/event.host.service';
import { IEventHostService } from 'apps/party-time-frontend-17/src/app/models/event.host.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ApiError, EventDTO, OrganizerEventDTO } from '@party-time/models';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from 'apps/party-time-frontend-17/src/app/components/page-header/page-header.component';
import { NavbarComponent } from 'apps/party-time-frontend-17/src/app/components/navbar/navbar.component';
import { FooterComponent } from 'apps/party-time-frontend-17/src/app/components/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventCardComponent } from '../../components/event-card/event-card.component';
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
        [event]="event"
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
  events$: Observable<OrganizerEventDTO[]> =
    this.eventHostService.getOrganizedEvents();

  deleteEvent(eventId: string): void {
    this.eventHostService.deleteEvent(eventId).subscribe({
      next: () => {
        this.snackBar.open('Event gelöscht.', 'OK', {
          duration: 2000,
        });
        this.events$ = this.eventHostService.getOrganizedEvents();
      },
      error: (apiError: ApiError) => {
        this.snackBar.open(apiError.error.message, 'OK', {
          duration: 2000,
        });
        this.events$ = this.eventHostService.getOrganizedEvents();
      },
    });
  }
}
