import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ApiError } from '@party-time/models';

export interface OtherStateInterface {
  isLoading: boolean;
  error: ApiError | null;
}

export const initialState: OtherStateInterface = {
  isLoading: false,
  error: null,
};

@Injectable()
export class OtherStore extends ComponentStore<OtherStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private error$ = this.select((state) => state.error);

  vm$ = this.select({
    isLoading: this.isLoading$,
    error: this.error$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  constructor() {
    super(initialState);
  }
}
