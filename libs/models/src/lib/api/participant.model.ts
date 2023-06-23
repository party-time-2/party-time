import { AccountDTO } from "./account.model";

export interface ParticipantDTO {
    account: AccountDTO;
    status: ParticipantStatus;
}

export enum ParticipantStatus {
    INVITED = 'INVITED',
    PARTICIPATING = 'PARTICIPATING',
    REJECTED  = 'REJECTED'
}