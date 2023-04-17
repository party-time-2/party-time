import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { SecondaryButtonComponent } from './secondary-button.component';
import { ActivatedRoute } from '@angular/router';

export default {
  title: 'SecondaryButtonComponent',
  component: SecondaryButtonComponent,
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
} as Meta<SecondaryButtonComponent>;

export const Primary = {
  render: (args: SecondaryButtonComponent) => ({
    props: args,
  }),
  args: {
    name: 'Secondary',
    routerLink: '',
  },
};
