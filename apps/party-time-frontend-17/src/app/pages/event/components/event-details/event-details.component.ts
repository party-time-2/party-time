import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsDTO } from 'apps/party-time-frontend-17/src/app/models/dto/event-dto.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  template: `@if(eventDetails){
    <section class="m-5 max-w-md rounded-md border-2 border-blue-500">
      <mat-card>
        <mat-card-header>
          <h2
            class="
          border-b-2
          p-3
          text-center
          text-xl
          font-bold
          "
          >
            {{ eventDetails.name }}
          </h2>
        </mat-card-header>
        <mat-card-content>
          <p
            class="
          py-3
          text-sm
          font-semibold
          "
          >
            {{ eventDetails.dateTime | date : 'dd.MM.yyyy HH:mm' }}
          </p>
          <mat-divider></mat-divider>
          <div class="pt-5">
            <p>{{ eventDetails.address.addressLine }}</p>
            @if (eventDetails.address.addressLineAddition) {
            <p>{{ eventDetails.address.addressLineAddition }}</p>
            }@else {
            <p>-</p>
            }
            <p>
              {{ eventDetails.address.zip }} {{ eventDetails.address.city }}
            </p>
            <p>{{ eventDetails.address.country }}</p>
          </div>
        </mat-card-content>
        <mat-card-actions class="mt-5 flex w-full justify-between">
          <button
            color="primary"
            mat-mini-fab
            (click)="onEditClicked(eventDetails)"
          >
            <mat-icon fontIcon="edit"></mat-icon>
          </button>
          <button
            mat-mini-fab
            color="accent"
            (click)="onParticipantsClicked(eventDetails.id)"
          >
            <mat-icon fontIcon="groups"></mat-icon>
          </button>
          <button
            mat-mini-fab
            color="warn"
            (click)="onDeleteClicked(eventDetails.id)"
          >
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
  @Output() participantsClicked = new EventEmitter<number>();

  onEditClicked(eventDetailsDTO: EventDetailsDTO): void {
    this.editClicked.emit(eventDetailsDTO);
  }

  onDeleteClicked(id: number): void {
    this.deleteClicked.emit(id);
  }

  onParticipantsClicked(id: number): void {
    this.participantsClicked.emit(id);
  }
}
