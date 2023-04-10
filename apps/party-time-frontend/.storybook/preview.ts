import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
};
