import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDTO, OrganizerEventDTO } from '@party-time/models';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatButtonModule],
  template: `@if (event) {
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>{{ event.eventDetailsDTO.name }}</mat-panel-title>
      </mat-expansion-panel-header>

      <p>{{ event.eventDetailsDTO.dateTime | date : 'dd.MM.yyyy' }}</p>
      <p>
        {{ event.eventDetailsDTO.address.addressLine }}
        {{ event.eventDetailsDTO.address.addressLineAddition }}
      </p>
      <p>
        {{ event.eventDetailsDTO.address.zip }}
        {{ event.eventDetailsDTO.address.city }}
      </p>
      <p>{{ event.eventDetailsDTO.address.country }}</p>
      <mat-action-row>
        <button
          mat-button
          (click)="deleteEventById(event.eventDetailsDTO.id)"
          color="warn"
        >
          Löschen
        </button>
        <button
          (click)="navigateToEventDetails(event.eventDetailsDTO.id)"
          mat-button
          color="primary"
        >
          Bearbeiten
        </button>
      </mat-action-row>
    </mat-expansion-panel>
    } `,
  styles: ``,
})
export class EventCardComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  @Input() event: OrganizerEventDTO | undefined;
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();

  navigateToEventDetails(eventId: string): void {
    this.router.navigate(['../event'], {
      queryParams: { eventId },
      relativeTo: this.route,
    });
  }

  deleteEventById(eventId: string): void {
    this.deleteEvent.emit(eventId);
  }
}
