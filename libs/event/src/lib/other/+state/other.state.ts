import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  ApiError,
  ParticipantEventDTO,
  ParticipantStatus,
} from '@party-time/models';
import { Observable, tap, exhaustMap } from 'rxjs';
import { EventService } from '../../services/event.service';

export interface OtherStateInterface {
  events: ParticipantEventDTO[];
  isLoading: boolean;
  error: ApiError | null;
}

export const initialState: OtherStateInterface = {
  events: [],
  isLoading: false,
  error: null,
};

@Injectable()
export class OtherStore extends ComponentStore<OtherStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private error$ = this.select((state) => state.error);
  private events$ = this.select((state) => state.events);

  vm$ = this.select({
    isLoading: this.isLoading$,
    error: this.error$,
    events: this.events$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  getEvents = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap(() =>
        this.eventService.getParticipantEvents().pipe(
          tapResponse(
            (events: ParticipantEventDTO[]) => {
              this.patchState({
                events,
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
