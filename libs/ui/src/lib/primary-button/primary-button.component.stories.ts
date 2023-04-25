import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { PrimaryButtonComponent } from './primary-button.component';
import { ActivatedRoute } from '@angular/router';

export default {
  title: 'PrimaryButtonComponent',
  component: PrimaryButtonComponent,
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div class="w-screen h-screen bg-background-light dark:bg-background-dark text-on-background-light dark:text-on-background-dark">${story}</div>`
    ),
    moduleMetadata({
      imports: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }),
  ],
} as Meta<PrimaryButtonComponent>;

export const Primary = {
  render: (args: PrimaryButtonComponent) => ({
    props: args,
  }),
  args: {
    name: 'Primary',
    routerLink: '',
  },
};
