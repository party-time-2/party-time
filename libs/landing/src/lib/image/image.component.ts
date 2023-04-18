import { Component } from '@angular/core';

@Component({
  selector: 'party-time-image',
  template: `
    <section class="partyImage">
      <img
        class="w-screen max-w-xl rounded-xl object-cover  shadow-xl "
        src="/assets/pexels-photo-3171837.webp"
        alt="Bild von einer Party"
      />
    </section>
  `,
  styles: [],
})
export class ImageComponent {}