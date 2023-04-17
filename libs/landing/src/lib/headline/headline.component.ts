import { Component } from '@angular/core';

@Component({
  selector: 'party-time-headline',
  template: `
    <section class="headline">
      <h1
        class="my-12 text-3xl font-extrabold text-on-background-light dark:text-on-background-dark md:text-5xl lg:text-6xl"
      >
        Plane deine Party
        <div
          class="bg-gradient-to-r from-primary-light to-tertiary-light bg-clip-text text-transparent dark:from-primary-dark dark:to-tertiary-dark md:pt-4"
        >
          und behalte den Überblick
        </div>
      </h1>
      <div class="subline">
        <p
          class="mt-2 text-lg font-normal text-on-surface-variant-light underline underline-offset-4 dark:text-on-surface-variant-dark sm:mt-3 md:mt-4 lg:mt-6 lg:text-xl"
        >
          Du machst Party.
        </p>
        <p
          class="text-lg font-normal text-on-surface-variant-light dark:text-on-surface-variant-dark lg:text-xl"
        >
          Wir behalten den Überblick.
        </p>
      </div>
    </section>
  `,
})
export class HeadlineComponent {}
