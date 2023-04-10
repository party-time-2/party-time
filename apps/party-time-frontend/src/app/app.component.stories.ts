import { Meta } from '@storybook/angular';
import { AppComponent } from './app.component';

export default {
  title: 'AppComponent',
  component: AppComponent,
} as Meta<AppComponent>;

export const Primary = {
  render: (args: AppComponent) => ({
    props: args,
  }),
  args: {
    title: 'Party Time',
    groups: [
      {
        name: 'Party Time',
        links: [
          { routerLink: '/', name: 'Startseite' },
          { routerLink: 'parties', name: 'Parties' },
          { routerLink: 'account', name: 'Account' },
          { routerLink: 'datenschutz', name: 'Datenschutz' },
          { routerLink: 'impressum', name: 'Impressum' },
        ],
      },
    ],
  },
};
