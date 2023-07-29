// implements F018
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ApiError, ParticipantEventDTO } from '@party-time/models';
import { Observable, exhaustMap, tap } from 'rxjs';
import { EventService } from '../../services/event.service';

export interface LocationStateInterface {
  eventId: string | undefined;
  mapsUrl: string | undefined;
  event: ParticipantEventDTO | undefined;
  isLoading: boolean;
  error: ApiError | null;
}

export const initialState: LocationStateInterface = {
  eventId: undefined,
  event: undefined,
  mapsUrl: undefined,
  isLoading: false,
  error: null,
};

@Injectable()
export class LocationStore extends ComponentStore<LocationStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private error$ = this.select((state) => state.error);
  private event$ = this.select((state) => state.event);
  private eventId$ = this.select((state) => state.eventId);
  private mapsUrl$ = this.select((state) => state.mapsUrl);

  vm$ = this.select({
    isLoading: this.isLoading$,
    error: this.error$,
    event: this.event$,
    eventId: this.eventId$,
    mapsUrl: this.mapsUrl$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));


  // getEvent(): void {
  //   this.eventId$.subscribe((eventId) => {
  //     if (eventId) {
  //       this.eventService
  //         .getParticipantEvent(eventId)
  //         .subscribe((event) => this.patchState({ event }));
  //       this.getMapsUrl();
        
  //     }
  //   });
  // }

  getEvent = this.effect((eventId$: Observable<string>) => {
    return eventId$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((eventId) =>
        this.eventService.getParticipantEvent(eventId).pipe(
          tapResponse(
            (event: ParticipantEventDTO) => {
              this.patchState({
                event,
                isLoading: false,
              });
              this.getMapsUrl();
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
    );
  }); 
    

  getMapsUrl() {
    this.event$.subscribe((event) => {
      if (event) {
        const key = 'AIzaSyBd88PKzZcJodQqJOsJgV1BgyPuuub9pSw';
        const mapsUrl = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${event.address.addressLine},${event.address.city},${event.address.country}`;
        this.patchState({ mapsUrl });
      }
    });
  }

  constructor(private eventService: EventService) {
    super(initialState);
  }
}
