import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsDTO } from 'apps/party-time-frontend-17/src/app/models/dto/event-dto.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `@if(eventDetails){
    <section class="m-5 max-w-md rounded-md border-2 border-blue-500">
      <mat-card>
        <mat-card-header>
          {{ eventDetails.name }}
        </mat-card-header>
        <mat-card-content>
          <p>{{ eventDetails.dateTime | date : 'dd.MM.yyyy HH:mm' }}</p>
          <pre>{{ eventDetails.address | json }}</pre>
        </mat-card-content>
        <mat-card-actions>
          <button (click)="onEditClicked(eventDetails)">
            <mat-icon fontIcon="edit"></mat-icon>
          </button>
          <button (click)="onDeleteClicked(eventDetails.id)">
            <mat-icon fontIcon="delete"></mat-icon>
          </button>
        </mat-card-actions>
      </mat-card>
    </section>
    }@else{
    <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>} `,
  styles: ``,
})
export class EventDetailsComponent {
  @Input() eventDetails: EventDetailsDTO | undefined;
  @Output() editClicked = new EventEmitter<EventDetailsDTO>();
  @Output() deleteClicked = new EventEmitter<number>();

  onEditClicked(eventDetailsDTO: EventDetailsDTO): void {
    this.editClicked.emit(eventDetailsDTO);
  }

  onDeleteClicked(id: number): void {
    this.deleteClicked.emit(id);
  }
}
