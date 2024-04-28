import { AccountDTO } from './account-dto.interface';

export interface EventCreateDTO {
  name: string;
  dateTime: Date;
  address: AddressDTO;
}
export interface AddressDTO {
  addressLine: string;
  addressLineAddition?: string;
  zip: string;
  city: string;
  country: string;
}

export interface EventDetailsDTO {
  id: number;
  name: string;
  dateTime: Date;
  address: AddressDTO;
}

export interface AccountInvitationDetailsDTO {
  id: number;
  status: Status;
  invitee: AccountDTO;
}

export interface OrganizerEventDTO {
  accountInvitationDetailsDTO: AccountInvitationDetailsDTO;
  eventDetailsDTO: EventDetailsDTO;
}

export enum Status {
  INVITED,
  PARTICIPATING,
  DECLINED,
}

export interface InvitationCreateDTO {
  string: string;
}

export interface InvitationDetailsDTO {
  id: number;
  status: Status;
}

export interface OrganizedEventDetailsDTO {
  id: number;
  name: string;
  dateTime: Date;
  address: AddressDTO;
  organizer: AccountDTO;
}

export interface ParticipantEventDTO {
  invitationDetailsDTO: InvitationDetailsDTO;
  organizedEventDetailsDTO: OrganizedEventDetailsDTO;
}
