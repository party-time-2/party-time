import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ApiError } from "@party-time/models";
import { Observable, exhaustMap, tap } from "rxjs";
import { InvitationService } from "../services/invitation.service";

export interface InvitationStateInterface {
    isLoading: boolean;
    error: ApiError | undefined;
    isInvited: boolean | undefined;
}

export const initialState: InvitationStateInterface = {
    isLoading: false,
    error: undefined,
    isInvited: false,
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

    getAccept = this.effect((invitationId$: Observable<string>) =>
        invitationId$.pipe(
            tap(() => this.setIsLoading(true)),
            exhaustMap((invitationId) =>
                this.invitationService.acceptInvitation(invitationId).pipe(
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

    getDecline = this.effect((invitationId$: Observable<string>) =>
        invitationId$.pipe(
            tap(() => this.setIsLoading(true)),
            exhaustMap((invitationId) =>
                this.invitationService.declineInvitation(invitationId).pipe(
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