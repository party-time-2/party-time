import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ApiError, EventDTO, EventCreateDTO } from '@party-time/models';
import { Observable, exhaustMap, tap } from 'rxjs';
import { EventService } from '../../services/event.service';

export interface CreateStateInterface {
  createEventDTO?: EventCreateDTO;
  isLoading: boolean;
  error: ApiError | null;
  isEventCreated: boolean;
  event?: EventDTO;
}

export const initialState: CreateStateInterface = {
  createEventDTO: undefined,
  isLoading: false,
  error: null,
  isEventCreated: false,
  event: undefined,
};

@Injectable()
export class CreateStore extends ComponentStore<CreateStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private isEventCreated$ = this.select((state) => state.isEventCreated);
  private error$ = this.select((state) => state.error);
  private createEventDTO$ = this.select((state) => state.createEventDTO);
  private event$ = this.select((state) => state.event);

  vm$ = this.select({
    isLoading: this.isLoading$,
    isEventCreated: this.isEventCreated$,
    error: this.error$,
    createEventDTO: this.createEventDTO$,
    event: this.event$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  getEventDTO = this.effect((createEventDTO$: Observable<EventCreateDTO>) =>
    createEventDTO$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((createEventDTO) =>
        this.eventService.createEvent(createEventDTO).pipe(
          tapResponse(
            (event: EventDTO) => {
              this.patchState({
                event,
                isEventCreated: true,
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
