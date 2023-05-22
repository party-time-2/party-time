export interface EventDTO {
  name: string;
  dateTime: string;
  address: Address;
}

export interface Address {
  addressLine: string;
  zip: string;
  city: string;
  country: string;
}
