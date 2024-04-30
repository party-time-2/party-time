import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { PageHeaderComponent } from 'apps/party-time-frontend-17/src/app/components/page-header/page-header.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { EventHostService } from 'apps/party-time-frontend-17/src/app/services/event/host/event.host.service';
import { EventCreateDTO } from 'apps/party-time-frontend-17/src/app/models/dto/event-dto.interface';
import { OverviewComponent } from '../../overview/overview.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import {
  MtxCalendarView,
  MtxDatetimepickerMode,
  MtxDatetimepickerModule,
  MtxDatetimepickerType,
} from '@ng-matero/extensions/datetimepicker';

@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MtxDatetimepickerModule,
  ],
  template: `
    <section class="flex w-96 flex-col gap-4">
      <h2 mat-dialog-title>Event Erstellen</h2>
      <mat-dialog-content>
        <form [formGroup]="eventForm" data-cy="event-form">
          <section class="flex flex-col gap-4">
            <mat-form-field appearance="fill" data-cy="event-name-field">
              <mat-label>Event Name</mat-label>
              <input
                matInput
                formControlName="name"
                data-cy="event-name-input"
              />
              <mat-error *ngIf="eventForm.get('name')?.errors?.['required']">
                Event Name ist erforderlich.
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mtx-datetimepicker
                #datetimePicker
                [type]="type"
                [mode]="mode"
                [multiYearSelector]="multiYearSelector"
                [calendarHeaderComponent]="customHeader"
                [startView]="startView"
                [twelvehour]="twelvehour"
                [timeInterval]="timeInterval"
                [touchUi]="touchUi"
                [timeInput]="timeInput"
                [startAt]="today"
                oninput="logEventForm()"
                (selectedChanged)="logEventForm()"
              ></mtx-datetimepicker>
              <input
                [mtxDatetimepicker]="datetimePicker"
                formControlName="dateTime"
                [value]="today"
                [ngModel]="today"
                matInput
                required
                placeholder="Datum und Uhrzeit"
                (dateInput)="logEventForm()"
              />
              
              <mtx-datetimepicker-toggle
                [for]="datetimePicker"
                matSuffix
              >
            </mtx-datetimepicker-toggle>
            </mat-form-field>
          </section>
        </form>
      </mat-dialog-content>
      <mat-dialog-actions>
        <!-- FIXME: eventForm.valid gibt true zurück, aber Button wird nicht enabled -->
        <button
          mat-button
          color="primary"
          [disabled]="eventForm.valid"
          (click)="onSubmit()"
        >
          Speichern
        </button>
        <button mat-button color="warn" mat-dialog-close>Abbrechen</button>
      </mat-dialog-actions>
    </section>
  `,
  providers: [EventHostService],
  styles: ``,
})
export class EventDialogComponent {
  private snackBar = inject(MatSnackBar);
  private eventHostService = inject(EventHostService);
  today = new Date('2024-08-24T13:45:00.000Z');

  type: MtxDatetimepickerType = 'datetime';
  mode: MtxDatetimepickerMode = 'auto';
  startView: MtxCalendarView = 'month';
  multiYearSelector = false;
  touchUi = false;
  twelvehour = false;
  timeInterval = 1;
  timeInput = true;
  customHeader!: any;

  eventForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    dateTime: new FormControl('2024-04-24T13:45:00.000Z', [
      Validators.required,
    ]),
    // address: new FormGroup({
    //   addressLine: new FormControl('', [Validators.required]),
    //   addressLineAddition: new FormControl(''),
    //   zip: new FormControl('', [Validators.required]),
    //   city: new FormControl('', [Validators.required]),
    //   country: new FormControl('', [Validators.required]),
    // }),
  });

  constructor(private dialogRef: MatDialogRef<OverviewComponent>) {}

  logEventForm() {
    console.log(this.eventForm);
  }

  convertDateToISO(date: string) {
    return new Date(date).toISOString();
  }

  convertISOToDate(date: string) {
    return new Date(date).toString();
  }

  onSubmit() {
    console.log(this.today);
    // const formattedDate = this.convertDateToISO(
    //   this.eventForm.value.dateTime as string
    // );

    console.log(this.eventForm.value);

    const updatedValue = {
      ...this.eventForm.value,
      //dateTime: formattedDate,
      address: {
        addressLine: 'string',
        addressLineAddition: 'string',
        zip: 'strin',
        city: 'string',
        country: 'string',
      },
    };

    this.dialogRef.close(updatedValue as unknown as EventCreateDTO);
  }
}
function provideMomentDatetimeAdapter(arg0: {
  parse: {
    dateInput: string;
    monthInput: string;
    yearInput: string;
    timeInput: string;
    datetimeInput: string;
  };
  display: {
    dateInput: string;
    monthInput: string;
    yearInput: string;
    timeInput: string;
    datetimeInput: string;
    monthYearLabel: string;
    dateA11yLabel: string;
    monthYearA11yLabel: string;
    popupHeaderDateLabel: string;
  };
}): import('@angular/core').Provider {
  throw new Error('Function not implemented.');
}
