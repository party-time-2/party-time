import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { HeadlineComponent } from '../headline/headline.component';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'party-time-landing-page',
  template: `<section
    class="grid min-h-screen place-items-start bg-gradient-to-b from-background-light to-surface-variant-light dark:from-background-dark dark:to-surface-variant-dark"
  >
    <div
      class="mx-auto grid max-w-screen-xl place-items-center px-4 py-8  lg:py-16"
    >
      <party-time-headline></party-time-headline>
      <div class="max-w pt-4 sm:pt-6 md:pt-10 lg:pt-16">
        <img
          #partyImage
          class="rounded-xl object-cover shadow-xl"
          src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Bild von einer Party"
        />
      </div>
    </div>
  </section> `,
  styles: [],
})
export class LandingPageComponent implements AfterViewInit {
  @ViewChild(HeadlineComponent) headlineComponent!: HeadlineComponent;
  @ViewChild('partyImage') partyImage!: ElementRef;

  headline!: HTMLElement;
  subline!: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.headline =
      this.headlineComponent.headlineSection.nativeElement.querySelector(
        '.headline'
      );
    this.subline =
      this.headlineComponent.headlineSection.nativeElement.querySelector(
        '.subline'
      );
    this.animateTimeline();
  }

  animateTimeline() {
    gsap
      .timeline()
      .from(this.headline, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
      })
      .from(
        this.subline,
        { duration: 1, x: -100, opacity: 0, ease: 'power3.out' },
        '-=0.5'
      )
      .from(
        this.partyImage.nativeElement,
        {
          duration: 1,
          y: 100,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=1'
      );
  }
}
