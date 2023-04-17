import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'party-time-landing-page',
  template: `<section
    class="grid min-h-screen place-items-center bg-gradient-to-b from-background-light to-surface-variant-light dark:from-background-dark dark:to-surface-variant-dark"
  >
    <div class="md:h-screen">
      <party-time-headline></party-time-headline>
      <party-time-image></party-time-image>
    </div>
    <party-time-stepper></party-time-stepper>
  </section> `,
  styles: [],
})
export class LandingPageComponent implements AfterViewInit {
  partyImage!: HTMLElement;
  headline!: HTMLElement;
  subline!: HTMLElement;
  stepper!: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.headline = this.elementRef.nativeElement.querySelector('.headline');
    this.subline = this.elementRef.nativeElement.querySelector('.subline');
    this.partyImage =
      this.elementRef.nativeElement.querySelector('.partyImage');
    this.stepper = this.elementRef.nativeElement.querySelector('.stepper');
    this.animateTimeline();
    this.animateScrollTrigger();
  }
  animateScrollTrigger() {
    gsap.from(this.stepper, {
      scrollTrigger: {
        trigger: this.stepper,
        start: 'top 80%',
      },
      duration: 1,
      y: 100,
      opacity: 0,
      ease: 'power3.out',
    });
    gsap.from(this.stepper.children, {
      scrollTrigger: {
        trigger: this.stepper,
      },
      duration: 1,
      x: 100,
      opacity: 0,
      ease: 'power3.out',
      stagger: 0.2,
    });
  }

  animateTimeline() {
    gsap
      .timeline()
      .from(this.headline, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'back.out(1.7)',
      })
      .from(
        this.subline,
        { duration: 1, y: 100, opacity: 0, ease: 'power3.out' },
        '-=0.5'
      )
      .from(
        this.partyImage,
        {
          duration: 0.5,
          y: 100,
          opacity: 0,
          ease: 'power2.out',
        },
        '-=0.8'
      );
  }
}
