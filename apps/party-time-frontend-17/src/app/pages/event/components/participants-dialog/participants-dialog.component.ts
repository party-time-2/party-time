import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AccountInvitationDetailsDTO, Status } from 'apps/party-time-frontend-17/src/app/models/dto/event-dto.interface';
import { EventHostService } from 'apps/party-time-frontend-17/src/app/services/event/host/event.host.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiError } from 'apps/party-time-frontend-17/src/app/models/error.interface';

@Component({
  selector: 'app-participants-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Teilnehmer verwalten</h2>
      <mat-list>
        <mat-list-item *ngFor="let participant of sortedParticipants" class="participant-item">
          <div class="flex justify-between items-center w-full">
            <div class="participant-info flex-1 overflow-hidden">
              {{ participant.invitee.email }} - {{ getStatusText(participant.status) }}
            </div>
            <button mat-icon-button color="warn" (click)="uninviteParticipant(participant)">
              <mat-icon>remove_circle</mat-icon>
            </button>
          </div>
        </mat-list-item>
      </mat-list>
      <mat-divider class="mb-4"></mat-divider>
      <form [formGroup]="participantForm" (ngSubmit)="addParticipant()">
        <mat-form-field class="w-full">
          <mat-label>Email Adresse</mat-label>
          <input matInput formControlName="email" required />
          <mat-error
            *ngIf="participantForm.get('email')?.errors?.['required']"
            data-cy="email-required-error"
          >
            E-Mail ist erforderlich.
          </mat-error>

          <mat-error
            *ngIf="participantForm.get('email')?.errors?.['email']"
            data-cy="email-invalid-error"
          >
            Bitte geben Sie eine gültige E-Mail-Adresse ein.
          </mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" [disabled]="participantForm.invalid">Hinzufügen</button>
      </form>
    </div>
  `,
  styles: [`
    .p-4 {
      padding: 1rem;
    }
    .mb-4 {
      margin-bottom: 1rem;
    }
    .w-full {
      width: 100%;
    }
    .participant-item {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 1rem;
    }
    .participant-info {
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `],
})
export class ParticipantsDialogComponent {
  accountInvitationDetailsDTO: AccountInvitationDetailsDTO[] | undefined;
  eventId: number | undefined;
  participantForm: FormGroup;
  private eventHostService = inject(EventHostService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  
  constructor(
    private dialogRef: MatDialogRef<ParticipantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { eventId: number; accountInvitationDetailsDTO: AccountInvitationDetailsDTO[] },
    private fb: FormBuilder
  ) {
    console.log(data); // Log data to verify its presence
    this.eventId = data.eventId;
    this.accountInvitationDetailsDTO = data.accountInvitationDetailsDTO;
    this.participantForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get sortedParticipants(): AccountInvitationDetailsDTO[] {
    if (!this.accountInvitationDetailsDTO) return [];
    return this.accountInvitationDetailsDTO.sort((a, b) => this.compareStatus(a.status, b.status));
  }

  compareStatus(statusA: Status, statusB: Status): number {
    const order = [Status.INVITED, Status.PARTICIPATING, Status.DECLINED];
    return order.indexOf(statusA) - order.indexOf(statusB);
  }

  getStatusText(status: Status): string {
    const statusMap = {
      [Status.INVITED]: 'Eingeladen',
      [Status.PARTICIPATING]: 'Zugesagt',
      [Status.DECLINED]: 'Abgelehnt',
    };
    return statusMap[status] || 'Unbekannt';
  }

  addParticipant() {
    if (this.participantForm.valid && this.eventId != undefined) {
      const email = this.participantForm.value.email;
      this.eventHostService.inviteParticipant(this.eventId, email).subscribe({
        next: (participants) => {
          if (!participants) {
            return;
          }

          this.accountInvitationDetailsDTO = participants;
                        const control = this.participantForm.get("email");
                        this.participantForm.reset();
              control?.markAsPristine();
              control?.markAsUntouched();
              control?.setErrors(null);
        },
        error: (apiError: ApiError) => {
          this.snackBar.open(apiError.message, 'OK', {
            duration: 5000,
          });
        },
      });
    }
  }

  uninviteParticipant(participant: AccountInvitationDetailsDTO) {
    if (this.accountInvitationDetailsDTO && this.eventId != undefined) {
      this.eventHostService.removeParticipant(this.eventId, participant.id.toString()).subscribe({
        next: () => {
          this.accountInvitationDetailsDTO = this.accountInvitationDetailsDTO?.filter(p => p.id !== participant.id);
        },
        error: (apiError: ApiError) => {
          this.snackBar.open(apiError.message, 'OK', {
            duration: 5000,
          });
        },
      });
    }
  }
}

