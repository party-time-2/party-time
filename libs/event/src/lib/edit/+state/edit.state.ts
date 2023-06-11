// implements F002
// implements F016
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EventDTO, ApiError } from '@party-time/models';
import { Observable, tap, exhaustMap } from 'rxjs';
import { EventService } from '../../services/event.service';

export interface EditStateInterface {
  event: EventDTO | undefined;
  isLoading: boolean;
  error: ApiError | null;
}

export const initialState: EditStateInterface = {
  event: undefined,
  isLoading: false,
  error: null,
};

@Injectable()
export class EditStore extends ComponentStore<EditStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private error$ = this.select((state) => state.error);
  private event$ = this.select((state) => state.event);
  
  vm$ = this.select({
    isLoading: this.isLoading$,
    error: this.error$,
    event: this.event$,
  });
  

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  getEvent = this.effect((trigger$: Observable<string>) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((id) =>
        this.eventService.getEvent(id).pipe(
          tapResponse(
            (event: EventDTO) => {
              this.patchState({
                event,
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
