import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { EventHostService } from 'apps/party-time-frontend-17/src/app/services/event/host/event.host.service';
import { IEventHostService } from 'apps/party-time-frontend-17/src/app/models/event.host.interface';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from 'apps/party-time-frontend-17/src/app/components/page-header/page-header.component';
import { NavbarComponent } from 'apps/party-time-frontend-17/src/app/components/navbar/navbar.component';
import { FooterComponent } from 'apps/party-time-frontend-17/src/app/components/footer/footer.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OrganizerEventDTO } from 'apps/party-time-frontend-17/src/app/models/dto/event-dto.interface';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    PageHeaderComponent,
    NavbarComponent,
    FooterComponent,
    MatProgressSpinner,
    MatDatepickerModule,
  ],
  template: `<app-navbar></app-navbar>
    <section class="flex h-screen flex-col items-center justify-center">
      <app-page-header
        Title="Mein Event"
        data-cy="event-header"
      ></app-page-header>
      @if (event) {
      <form
        [formGroup]="hostEventForm"
        class="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-white px-4 py-6 shadow-md"
      >
        <mat-form-field appearance="fill" data-cy="name-field">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" data-cy="name-input" />
          <mat-error
            *ngIf="hostEventForm.get('name')?.errors?.['required']"
            data-cy="name-required-error"
          >
            Name ist erforderlich.
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="fill" data-cy="dateTime-field">
          <mat-label>Datum und Uhrzeit</mat-label>
          <input matInput formControlName="dateTime" data-cy="dateTime-input" />
          <mat-error
            *ngIf="hostEventForm.get('dateTime')?.errors?.['required']"
            data-cy="dateTime-required-error"
          >
            Datum und Uhrzeit sind erforderlich.
          </mat-error>
        </mat-form-field>
        <button
          mat-button
          color="primary"
          data-cy="host-submit-button"
          [disabled]="!hostEventForm.valid"
        >
          Speichern
        </button>
      </form>
      <pre>{{ event | json }}</pre>
      } @else {
      <mat-spinner></mat-spinner>
      }
    </section>
    <app-footer></app-footer> `,
  providers: [EventHostService],
  styles: ``,
})
export class EventComponent {
  @Input() set eventId(eventId: number) {
    this.eventParticipantsService
      .getEvent(eventId)
      .subscribe((event: OrganizerEventDTO) => {
        console.log(event);
        this.event = event;
        this.hostEventForm.patchValue({
          name: event.eventDetailsDTO.name,
          dateTime: event.eventDetailsDTO.dateTime,
          address: {
            addressLine: event.eventDetailsDTO.address.addressLine,
            addressLineAddition:
              event.eventDetailsDTO.address.addressLineAddition,
            zip: event.eventDetailsDTO.address.zip,
            city: event.eventDetailsDTO.address.city,
            country: event.eventDetailsDTO.address.country,
          },
        });
      });
  }
  private eventParticipantsService: IEventHostService =
    inject(EventHostService);
  event: OrganizerEventDTO | undefined;

  hostEventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    dateTime: new FormControl(new Date(), Validators.required),
    address: new FormGroup({
      addressLine: new FormControl('', Validators.required),
      addressLineAddition: new FormControl(''),
      zip: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    }),
  });
}
