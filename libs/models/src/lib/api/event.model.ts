import { AccountDTO } from './account.model';
import {
  AccountInvitationDetailsDTO,
  ParticipantDTO,
  ParticipantStatus,
} from './participant.model';

export interface ParticipantEventDTO extends EventDTO {
  participatingStatus: ParticipantStatus;
}

export interface EventDTO {
  id: string;
  name: string;
  organizer: AccountDTO;
  dateTime: string;
  address: AddressDTO;
  participants: ParticipantDTO[];
}

export interface EventCreateDTO {
  name: string;
  address: AddressDTO;
  dateTime: string;
}

export interface AddressDTO {
  addressLine: string;
  addressLineAddition?: string;
  zip: string;
  city: string;
  country: string;
}

export interface OrganizerEventDTO {
  eventDetailsDTO: EventDetailsDTO;
  accountInvitationDetailsDTO: AccountInvitationDetailsDTO[];
}

export interface EventDetailsDTO {
  id: string;
  name: string;
  dateTime: string;
  address: AddressDTO;
}
