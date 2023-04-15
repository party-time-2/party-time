import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { NavbarComponent } from './navbar.component';
import { ActivatedRoute } from '@angular/router';

const ballon = require('../../../../../apps/party-time-frontend/src/assets/ballon.png');

const logo = {
  src: ballon,
  alt: 'ballon logo',
  href: 'https://www.partytime.com',
  name: 'Party Time',
};

const links = [
  { routerLink: '/', name: 'Startseite' },
  { routerLink: 'party', name: 'Party' },
  { routerLink: 'datenschutz', name: 'Datenschutz' },
  { routerLink: 'impressum', name: 'Impressum' },
];

export default {
  title: 'NavbarComponent',
  component: NavbarComponent,
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
    links: links,
    cta: links[1],
  },
} as Meta<NavbarComponent>;

export const Primary = {
  render: (args: NavbarComponent) => ({
    props: args,
  }),
  args: {},
};
