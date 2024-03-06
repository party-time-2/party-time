import { AccountDTO } from './account.model';

export interface ParticipantDTO {
  account: AccountDTO;
  status: ParticipantStatus;
}

export enum ParticipantStatus {
  INVITED = 'INVITED',
  PARTICIPATING = 'PARTICIPATING',
  DECLINED = 'DECLINED',
}

export interface InvitationCreateDTO {
  participantEmail: string;
}

export interface AccountInvitationDetailsDTO {
  id: number;
  status: ParticipantStatus;
  invitee: AccountDTO;
}
