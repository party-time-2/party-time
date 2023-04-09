import { Component } from '@angular/core';

@Component({
  selector: 'party-time-landing-page',
  template: `<section
    class="from-background-light dark:from-background-dark dark:to-surface-variant-dark to-surface-variant-light grid h-screen place-items-center bg-gradient-to-b"
  >
    <div class="mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
      <party-time-headline></party-time-headline>
    </div>
  </section> `,
  styles: [],
})
export class LandingPageComponent {}
