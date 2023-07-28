import { AccountDTO } from './account.model';
import { ParticipantDTO, ParticipantStatus } from './participant.model';

export interface ParticipantEventDTO extends EventDTO {
  status: ParticipantStatus;
}

export interface EventDTO {
  id: string;
  name: string;
  organizer: AccountDTO;
  dateTime: string;
  address: Address;
  participants: ParticipantDTO[];
}

export interface EventCreateDTO {
  name: string;
  address: Address;
  dateTime: string;
}

export interface Address {
  addressLine: string;
  addressLineAddition: string;
  zip: string;
  city: string;
  country: string;
}
