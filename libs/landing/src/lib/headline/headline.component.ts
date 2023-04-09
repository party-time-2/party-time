import { Component } from '@angular/core';

@Component({
  selector: 'party-time-headline',
  template: `
    <h1
      class="text-on-background-light dark:text-on-background-dark h-full text-3xl font-extrabold md:text-5xl lg:text-6xl"
    >
      Organisiere deine Party
      <span
        class="to-tertiary-light dark:to-tertiary-dark dark:from-primary-dark from-primary-light bg-gradient-to-r bg-clip-text text-transparent"
      >
        übersichtlich
      </span>
    </h1>
    <p
      class="text-on-surface-variant-light dark:text-on-surface-variant-dark mt-2 text-lg font-normal underline underline-offset-4 sm:mt-3 md:mt-4 lg:mt-6 lg:text-xl"
    >
      Du machst Party.
    </p>
    <p
      class="text-on-surface-variant-light dark:text-on-surface-variant-dark text-lg font-normal lg:text-xl"
    >
      Wir behalten den Überblick.
    </p>
  `,
})
export class HeadlineComponent {}
