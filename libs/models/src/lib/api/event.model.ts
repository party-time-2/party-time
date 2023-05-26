import { AccountDTO } from './account.model';

export interface EventDTO {
  id: string;
  name: string;
  organizer: AccountDTO;
  dateTime: string;
  address: Address;
}

export interface EventCreateDTO {
  name: string;
  address: Address;
  dateTime: string;
}

export interface Address {
  addressLine: string;
  zip: string;
  city: string;
  country: string;
}
