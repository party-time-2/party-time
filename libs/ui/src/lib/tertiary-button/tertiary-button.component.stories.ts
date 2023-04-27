import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { TertiaryButtonComponent } from './tertiary-button.component';
import { ActivatedRoute } from '@angular/router';

export default {
  title: 'TertiaryButtonComponent',
  component: TertiaryButtonComponent,
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
} as Meta<TertiaryButtonComponent>;

export const Primary = {
  render: (args: TertiaryButtonComponent) => ({
    props: args,
  }),
  args: {
    name: 'Tertiary',
    routerLink: '',
  },
};
