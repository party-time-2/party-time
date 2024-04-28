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
  ],
  template: `<h2 mat-dialog-title>Event Erstellen</h2>
    <mat-dialog-content>
      <form [formGroup]="eventForm">
        <mat-form-field appearance="fill">
          <mat-label>Event Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        mat-button
        color="primary"
        [disabled]="!eventForm.valid"
        (click)="onSubmit()"
      >
        Speichern
      </button>
      <button mat-button color="warn" mat-dialog-close>Abbrechen</button>
    </mat-dialog-actions> `,
  providers: [EventHostService],
  styles: ``,
})
export class EventDialogComponent {
  private snackBar = inject(MatSnackBar);
  private eventHostService = inject(EventHostService);
  eventForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<OverviewComponent>) {}

  onSubmit() {
    this.dialogRef.close(this.eventForm.value);
  }
}
