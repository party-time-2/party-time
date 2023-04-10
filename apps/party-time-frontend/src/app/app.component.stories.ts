import { Meta, moduleMetadata } from '@storybook/angular';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';

export default {
  title: 'AppComponent',
  component: AppComponent,
  decorators: [
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
} as Meta<AppComponent>;

export const Primary = {
  render: (args: AppComponent) => ({
    props: args,
  }),
  args: {
    title: 'party-time',
    logo: {
      src: '/assets/ballon.png',
      alt: 'ballon logo',
      href: 'https://www.partytime.com',
      name: 'Party Time',
    },
    groups: [
      {
        name: 'Party Time',
        links: [
          { routerLink: '/', name: 'Startseite' },
          { routerLink: 'party-planen', name: 'Party planen' },
          { routerLink: 'parties', name: 'Meine Parties' },
          { routerLink: 'account', name: 'Account' },
          { routerLink: 'datenschutz', name: 'Datenschutz' },
          { routerLink: 'impressum', name: 'Impressum' },
        ],
      },
    ],
  },
};
