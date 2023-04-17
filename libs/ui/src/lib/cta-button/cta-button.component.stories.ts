import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { CtaButtonComponent } from './cta-button.component';
import { ActivatedRoute } from '@angular/router';

export default {
  title: 'CtaButtonComponent',
  component: CtaButtonComponent,
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
} as Meta<CtaButtonComponent>;

export const Primary = {
  render: (args: CtaButtonComponent) => ({
    props: args,
  }),
  args: {
    name: 'Party',
    routerLink: 'party',
  },
};
