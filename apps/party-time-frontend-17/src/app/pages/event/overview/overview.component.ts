import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { EventHostService } from '../../../services/event/host/event.host.service';
import { EventParticipantsService } from '../../../services/event/participants/event.participants.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventDetailsComponent } from '../components/event-details/event-details.component';

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
  ],
  template: `<app-navbar></app-navbar>
    <app-page-header title="Events"></app-page-header>

    @if (organizedEvents$ | async) { @for (event of organizedEvents$ | async;
    track $index) {
    <app-event-details [eventDetails]="event"></app-event-details>
    }@empty {
    <p>No events found</p>
    } }@else {
    <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    } @if (participaintingEvents$ | async) { @for (event of
    participaintingEvents$ | async; track $index) {
    <pre>{{ participaintingEvents$ | async | json }}</pre>
    }@empty {
    <p>No events found</p>
    }}@else {
    <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    }
    <app-footer></app-footer>`,
  styles: ``,
  providers: [EventHostService, EventParticipantsService],
})
export class OverviewComponent {
  private eventHostService = inject(EventHostService);
  private eventParticipantsService = inject(EventParticipantsService);
  organizedEvents$ = this.eventHostService.getOrganizedEvents();
  participaintingEvents$ =
    this.eventParticipantsService.getParticipaintingEvents();
}
