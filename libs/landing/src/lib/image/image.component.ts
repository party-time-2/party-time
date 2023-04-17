import { Component } from '@angular/core';

@Component({
  selector: 'party-time-image',
  template: `
    <section class="partyImage">
      <img
        class="max-w-xl rounded-xl object-cover pt-4 shadow-xl sm:pt-6 md:pt-10 lg:pt-16"
        src="/assets/pexels-photo-3171837.webp"
        alt="Bild von einer Party"
      />
    </section>
  `,
  styles: [],
})
export class ImageComponent {}
