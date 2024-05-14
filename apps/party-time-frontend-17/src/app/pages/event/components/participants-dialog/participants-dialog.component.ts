import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccountInvitationDetailsDTO,
  InvitationDetailsDTO,
} from 'apps/party-time-frontend-17/src/app/models/dto/event-dto.interface';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { OverviewComponent } from '../../overview/overview.component';

@Component({
  selector: 'app-participants-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `<p>participants-dialog works!</p>`,
  styles: ``,
})
export class ParticipantsDialogComponent {
  accountInvitationDetailsDTO: AccountInvitationDetailsDTO[] | undefined;

  constructor(
    private dialogRef: MatDialogRef<OverviewComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: {
      accountInvitationDetailsDTO: AccountInvitationDetailsDTO[] | undefined;
    }
  ) {
    {
      if (data) {
        this.accountInvitationDetailsDTO = data.accountInvitationDetailsDTO;
        console.log(this.accountInvitationDetailsDTO);
      }
    }
  }
}
