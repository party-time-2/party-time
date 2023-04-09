import { Component } from '@angular/core';

@Component({
  selector: 'party-time-landing-page',
  template: `<section
    class="from-background-light dark:from-background-dark dark:to-surface-variant-dark to-surface-variant-light grid min-h-screen place-items-start bg-gradient-to-b"
  >
    <div
      class="mx-auto grid max-w-screen-xl place-items-center px-4 py-8  lg:py-16"
    >
      <party-time-headline></party-time-headline>
      <div class="max-w pt-4 sm:pt-6 md:pt-10 lg:pt-16">
        <img
          class="rounded-xl object-cover shadow-xl"
          src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Bild von einer Party"
        />
      </div>
    </div>
  </section> `,
  styles: [],
})
export class LandingPageComponent {}
