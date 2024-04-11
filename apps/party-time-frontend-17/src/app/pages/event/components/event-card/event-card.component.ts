import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  EventDetailsDTO,
  OrganizerEventDTO,
} from 'apps/party-time-frontend-17/src/app/models/dto/event-dto.interface';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatButtonModule],
  template: `@if (eventDetailsDTO) {
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>{{ eventDetailsDTO.name }}</mat-panel-title>
      </mat-expansion-panel-header>

      <p>{{ eventDetailsDTO.dateTime | date : 'dd.MM.yyyy' }}</p>
      <p>
        {{ eventDetailsDTO.address.addressLine }}
        {{ eventDetailsDTO.address.addressLineAddition }}
      </p>
      <p>
        {{ eventDetailsDTO.address.zip }}
        {{ eventDetailsDTO.address.city }}
      </p>
      <p>{{ eventDetailsDTO.address.country }}</p>
      <mat-action-row>
        <button
          mat-button
          (click)="deleteEventById(eventDetailsDTO.id)"
          color="warn"
        >
          Löschen
        </button>
        <button
          (click)="navigateToEventDetails(eventDetailsDTO.id)"
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
  @Input() eventDetailsDTO: EventDetailsDTO | undefined;
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();

  navigateToEventDetails(eventId: number): void {
    this.router.navigate(['../event'], {
      queryParams: { eventId },
      relativeTo: this.route,
    });
  }

  deleteEventById(eventId: number): void {
    this.deleteEvent.emit(eventId);
  }
}
