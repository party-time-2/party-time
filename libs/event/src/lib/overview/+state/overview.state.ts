// implements F016
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EventDTO, ApiError } from '@party-time/models';
import { Observable, tap, exhaustMap } from 'rxjs';
import { EventService } from '../../services/event.service';

export interface OverviewStateInterface {
  events: EventDTO[];
  isLoading: boolean;
  error: ApiError | null;
}

export const initialState: OverviewStateInterface = {
  events: [],
  isLoading: false,
  error: null,
};

@Injectable()
export class OverviewStore extends ComponentStore<OverviewStateInterface> {
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
        this.eventService.getEvents().pipe(
          tapResponse(
            (events: EventDTO[]) => {
              this.patchState({
                events,
                isLoading: false,
              });

              // // get participants for each event
              // events.forEach((event) => {
              //   this.eventService.getParticipants(event.id).subscribe(
              //     (participants) => {
              //       console.log(participants);
              //     }
              //   );
              // });

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
