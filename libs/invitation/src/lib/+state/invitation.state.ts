// implements F008
// implements F009
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ApiError } from '@party-time/models';
import { Observable, exhaustMap, tap } from 'rxjs';
import { InvitationService } from '../services/invitation.service';

export interface InvitationStateInterface {
  isLoading: boolean;
  error: ApiError | undefined;
  isInvited: boolean | undefined;
}

export const initialState: InvitationStateInterface = {
  isLoading: false,
  error: undefined,
  isInvited: undefined,
};

@Injectable()
export class InvitationStore extends ComponentStore<InvitationStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private isInvited$ = this.select((state) => state.isInvited);
  private error$ = this.select((state) => state.error);

  vm$ = this.select({
    isLoading: this.isLoading$,
    isInvited: this.isInvited$,
    error: this.error$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  getAccept = this.effect((eventId$: Observable<string>) =>
    eventId$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((eventId) =>
        this.invitationService.acceptInvitation(eventId).pipe(
          tapResponse(
            () => {
              this.patchState({
                isInvited: true,
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

  getDecline = this.effect((eventId$: Observable<string>) =>
    eventId$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((eventId) =>
        this.invitationService.declineInvitation(eventId).pipe(
          tapResponse(
            () => {
              this.patchState({
                isInvited: false,
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

  constructor(private invitationService: InvitationService) {
    super(initialState);
  }
}
