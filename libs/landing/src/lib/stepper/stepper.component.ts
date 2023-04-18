import { Component } from '@angular/core';

@Component({
  selector: 'party-time-stepper',
  template: `
    <section class="stepper">
      <h1
        class="h-full text-3xl font-extrabold text-on-background-light dark:text-on-background-dark md:text-5xl lg:pt-5 lg:text-6xl"
      >
        Erstelle deine Party
      </h1>
      <div
        class="bg-gradient-to-r from-primary-light to-tertiary-light bg-clip-text text-transparent dark:from-primary-dark dark:to-tertiary-dark"
      >
        in 3 Schritten
      </div>
      <ol class="pt-5">
        <li
          class="m-5 list-item list-inside list-disc text-lg font-normal text-on-surface-variant-light dark:text-on-surface-variant-dark lg:text-xl"
        >
          Party anlegen
        </li>
        <li
          class="m-5 list-item list-inside list-disc text-lg  font-normal text-on-surface-variant-light dark:text-on-surface-variant-dark lg:text-xl"
        >
          Lege Datum und Location fest
        </li>
        <li
          class="m-5 list-item list-inside list-disc text-lg  font-normal text-on-surface-variant-light dark:text-on-surface-variant-dark lg:text-xl"
        >
          Lade deine Gäste ein
        </li>
      </ol>
    </section>
  `,
  styles: [],
})
export class StepperComponent {}
