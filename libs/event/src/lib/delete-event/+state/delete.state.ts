// implements F002
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ApiError } from '@party-time/models';
import { EventService } from '../../services/event.service';
import { Observable, tap, exhaustMap } from 'rxjs';

export interface DeleteStateInterface {
  isLoading: boolean;
  isEventDeleted: boolean;
  error: ApiError | null;
}

export const initialState: DeleteStateInterface = {
  isLoading: false,
  isEventDeleted: false,
  error: null,
};

@Injectable()
export class DeleteStore extends ComponentStore<DeleteStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private isEventDeleted$ = this.select((state) => state.isEventDeleted);
  private error$ = this.select((state) => state.error);

  vm$ = this.select({
    isLoading: this.isLoading$,
    error: this.error$,
    isEventDeleted: this.isEventDeleted$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  setIsEventDeleted = this.updater((state, isEventDeleted: boolean) => ({
    ...state,
    isEventDeleted,
  }));

  setError = this.updater((state, error: ApiError) => ({
    ...state,
    error,
  }));

  constructor(private eventService: EventService) {
    super(initialState);
  }

  deleteEvent = this.effect((trigger$: Observable<string>) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((id) =>
        this.eventService.deleteEvent(id).pipe(
          tapResponse(
            () => {
              this.setIsEventDeleted(true);
              this.setIsLoading(false);
            },
            (error: ApiError) => {
              this.setError(error);
              this.setIsLoading(false);
            }
          )
        )
      )
    )
  );
}
