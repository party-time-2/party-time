import { Meta, componentWrapperDecorator } from '@storybook/angular';
import { LogoComponent } from './logo.component';

const ballon = require('../../../../../apps/party-time-frontend/src/assets/ballon.png');

export default {
  title: 'LogoComponent',
  component: LogoComponent,
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div class="w-screen h-screen bg-background-light dark:bg-background-dark text-on-background-light dark:text-on-background-dark">${story}</div>`
    ),
  ],
  args: {
    logo: {
      src: ballon,
      alt: 'ballon logo',
      href: 'https://www.partytime.com',
      name: 'Party Time',
    },
  },
} as Meta<LogoComponent>;

export const Primary = {
  render: (args: LogoComponent) => ({
    props: args,
  }),
  args: {},
};
