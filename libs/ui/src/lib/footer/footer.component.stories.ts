import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { FooterComponent } from './footer.component';
import { ActivatedRoute } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ballon = require('../../../../../apps/party-time-frontend/src/assets/ballon.png');

const logo = {
  src: ballon,
  alt: 'ballon logo',
  href: 'https://www.partytime.com',
  name: 'Party Time',
};

const groups = [
  {
    name: 'Party Time',
    links: [
      { routerLink: '/', name: 'Startseite' },
      { routerLink: '/1', name: 'Page 1' },
      { routerLink: '/2', name: 'Page 2' },
      { routerLink: '/3', name: 'Page 3' },
    ],
  },
];

export default {
  title: 'FooterComponent',
  component: FooterComponent,
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
  args: {
    logo: logo,
    groups: groups,
  },
} as Meta<FooterComponent>;

export const Primary = {
  render: (args: FooterComponent) => ({
    props: args,
  }),
  args: {},
};
