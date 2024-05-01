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
            <!-- Event Name Input -->
            <mat-form-field appearance="fill" data-cy="event-name-field">
              <mat-label>Event Name</mat-label>
              <input
                matInput
                formControlName="name"
                data-cy="event-name-input"
                placeholder="z.B. Geburtstagsparty"
              />
              <mat-error *ngIf="eventForm.get('name')?.errors?.['required']">
                Event Name ist erforderlich.
              </mat-error>
              <mat-error *ngIf="eventForm.get('name')?.errors?.['minlength']">
                Der Name muss mindestens 5 Zeichen lang sein.
              </mat-error>
              <mat-error *ngIf="eventForm.get('name')?.errors?.['maxlength']">
                Der Name darf maximal 20 Zeichen lang sein.
              </mat-error>
            </mat-form-field>

            <!-- Date Time Picker Input -->
            <mat-form-field appearance="fill" data-cy="datetime-field">
              <mat-label>Datum und Uhrzeit</mat-label>
              <input
                matInput
                [mtxDatetimepicker]="datetimePicker"
                formControlName="dateTime"
                data-cy="datetime-input"
                placeholder="Datum und Uhrzeit"
              />
              <mtx-datetimepicker-toggle
                [for]="datetimePicker"
                matSuffix
              ></mtx-datetimepicker-toggle>
              <mtx-datetimepicker
                #datetimePicker
                [type]="type"
                [mode]="mode"
                [calendarHeaderComponent]="customHeader"
                [startView]="startView"
                [multiYearSelector]="multiYearSelector"
                [twelvehour]="twelvehour"
                [timeInterval]="timeInterval"
                [touchUi]="touchUi"
                [timeInput]="timeInput"
                [startAt]="eventDate"
              >
              </mtx-datetimepicker>
              <mat-error
                *ngIf="eventForm.get('dateTime')?.errors?.['required']"
              >
                Datum und Uhrzeit sind erforderlich.
              </mat-error>
            </mat-form-field>

            <!-- Address Inputs -->
            <div
              formGroupName="address"
              data-cy="address-form"
              class="flex flex-col gap-4"
            >
              <mat-form-field appearance="fill" data-cy="address-line-field">
                <mat-label>Adresse</mat-label>
                <input
                  matInput
                  formControlName="addressLine"
                  data-cy="address-line-input"
                  placeholder="z.B. Grünwalder Str. 2"
                />
                <mat-error
                  *ngIf="eventForm.get(['address', 'addressLine'])?.errors?.['required']"
                >
                  Adresse ist erforderlich.
                </mat-error>
                <mat-error
                  *ngIf="eventForm.get(['address', 'addressLine'])?.errors?.['minlength']"
                >
                  Adresse muss mindestens 4 Zeichen lang sein.
                </mat-error>
                <mat-error
                  *ngIf="eventForm.get(['address', 'addressLine'])?.errors?.['maxlength']"
                >
                  Adresse darf maximal 24 Zeichen lang sein.
                </mat-error>
              </mat-form-field>

              <mat-form-field
                appearance="fill"
                data-cy="address-addition-field"
              >
                <mat-label>Adresszusatz</mat-label>
                <input
                  matInput
                  formControlName="addressLineAddition"
                  data-cy="address-addition-input"
                  placeholder="z.B. Hinterhof"
                />
              </mat-form-field>

              <mat-form-field appearance="fill" data-cy="zip-field">
                <mat-label>Postleitzahl</mat-label>
                <input
                  matInput
                  formControlName="zip"
                  data-cy="zip-input"
                  placeholder="z.B. 81547"
                />
                <mat-error
                  *ngIf="eventForm.get(['address', 'zip'])?.errors?.['required']"
                >
                  Postleitzahl ist erforderlich.
                </mat-error>
                <mat-error
                  *ngIf="eventForm.get(['address', 'zip'])?.errors?.['minlength'] || eventForm.get(['address', 'zip'])?.errors?.['maxlength']"
                >
                  Postleitzahl muss genau 5 Zeichen lang sein.
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" data-cy="city-field">
                <mat-label>Stadt</mat-label>
                <input
                  matInput
                  formControlName="city"
                  data-cy="city-input"
                  placeholder="z.B. München"
                />
                <mat-error
                  *ngIf="eventForm.get(['address', 'city'])?.errors?.['required']"
                >
                  Stadt ist erforderlich.
                </mat-error>
                <mat-error
                  *ngIf="eventForm.get(['address', 'city'])?.errors?.['minlength'] || eventForm.get(['address', 'city'])?.errors?.['maxlength']"
                >
                  Stadt muss zwischen 3 und 20 Zeichen lang sein.
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" data-cy="country-field">
                <mat-label>Land</mat-label>
                <input
                  matInput
                  formControlName="country"
                  data-cy="country-input"
                  placeholder="z.B. Deutschland"
                />
                <mat-error
                  *ngIf="eventForm.get(['address', 'country'])?.errors?.['required']"
                >
                  Land ist erforderlich.
                </mat-error>
                <mat-error
                  *ngIf="eventForm.get(['address', 'country'])?.errors?.['minlength'] || eventForm.get(['address', 'country'])?.errors?.['maxlength']"
                >
                  Land muss zwischen 3 und 20 Zeichen lang sein.
                </mat-error>
              </mat-form-field>
            </div>
          </section>
        </form>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button
          mat-button
          color="primary"
          [disabled]="!eventForm.valid"
          (click)="onSubmit()"
          data-cy="save-button"
        >
          Speichern
        </button>
        <button
          mat-button
          color="warn"
          mat-dialog-close
          data-cy="cancel-button"
        >
          Abbrechen
        </button>
      </mat-dialog-actions>
    </section>
  `,
  providers: [EventHostService],
  styles: ``,
})
export class EventDialogComponent {
  eventDate = undefined;
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
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    dateTime: new FormControl(new Date(), [Validators.required]),
    address: new FormGroup({
      addressLine: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
      ]),
      addressLineAddition: new FormControl(''),
      zip: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    }),
  });

  constructor(private dialogRef: MatDialogRef<OverviewComponent>) {}

  onSubmit() {
    if (this.eventForm.invalid) {
      return;
    }
    this.dialogRef.close(this.eventForm.value as unknown as EventCreateDTO);
  }
}
