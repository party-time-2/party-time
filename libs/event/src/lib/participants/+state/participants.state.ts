// implements F004
// implements F005
// implements F006
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  ParticipantDTO,
  ApiError,
} from '@party-time/models';
import { Observable, tap, exhaustMap } from 'rxjs';
import { EventService } from '../../services/event.service';

export interface ParticipantsStateInterface {
  participants: ParticipantDTO[];
  isLoading: boolean;
  error: ApiError | null;
}

export const initialState: ParticipantsStateInterface = {
  participants: [],
  isLoading: false,
  error: null,
};

@Injectable()
export class ParticipantsStore extends ComponentStore<ParticipantsStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private error$ = this.select((state) => state.error);
  private participants$ = this.select((state) => state.participants);

  vm$ = this.select({
    isLoading: this.isLoading$,
    error: this.error$,
    participants: this.participants$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  removeParticipantFromList = this.updater((state, email: string) => ({
    ...state,
    participants: state.participants.filter(
      (participant) => participant.account.email !== email
    ),
  }));

  getParticipants = this.effect((trigger$: Observable<string>) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((eventId) =>
        this.eventService.getParticipants(eventId).pipe(
          tapResponse(
            (participants: ParticipantDTO[]) => {
              this.patchState({
                participants,
                isLoading: false,
              });
            },
            (error: ApiError) => {
              this.patchState({
                error,
                isLoading: false,
              });
            }
          )
        )
      )
    )
  );

  removeParticipant = this.effect(
    (trigger$: Observable<{ eventId: string; email: string }>) =>
      trigger$.pipe(
        tap(() => this.setIsLoading(true)),
        exhaustMap(({ eventId, email }) =>
          this.eventService.removeParticipant(eventId, email).pipe(
            tapResponse(
              (participants: ParticipantDTO[]) => {
                this.patchState({
                  participants,
                  isLoading: false,
                });
              },
              (error: ApiError) => {
                this.patchState({
                  error,
                  isLoading: false,
                });
              }
            )
          )
        )
      )
  );

  addParticipant = this.effect(
    (trigger$: Observable<{ eventId: string; email: string }>) =>
      trigger$.pipe(
        tap(() => this.setIsLoading(true)),
        exhaustMap(({ eventId, email }) =>
          this.eventService.addParticipant(eventId, email).pipe(
            tapResponse(
              (participants: ParticipantDTO[]) => {
                this.patchState({
                  participants,
                  isLoading: false,
                });
              },
              (error: ApiError) => {
                this.patchState({
                  error,
                  isLoading: false,
                });
              }
            )
          )
        )
      )
  );

  constructor(private eventService: EventService) {
    super(initialState);
  }
}
