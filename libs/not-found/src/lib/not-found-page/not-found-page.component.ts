/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
} from '@angular/core';
import { PrimaryButtonComponent } from '@party-time/ui';
import { gsap } from 'gsap';

@Component({
  selector: 'party-time-not-found-page',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent],
  template: `<section
    class="grid min-h-screen place-items-center  sm:py-32 lg:px-8"
  >
    <div
      class="container rounded-3xl bg-error-container-light text-center text-on-surface-light dark:bg-error-container-dark dark:text-on-surface-dark"
    >
      <div class="p-5 text-on-error-light dark:text-error-dark">
        <p class="text-base font-semibold ">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Seite nicht gefunden
        </h1>
        <p class="mt-6 text-base leading-7">Sorry, die Seite haben wir nicht</p>
        <div class="home-button mt-10 flex items-center justify-center gap-x-6">
          <party-time-primary-button
            name="zur Startseite "
            routerLink="/"
          ></party-time-primary-button>
        </div>
      </div>
    </div>
  </section>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent implements AfterViewInit {
  container!: HTMLElement;
  homeButton!: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.container = this.elementRef.nativeElement.querySelector('.container');
    this.homeButton =
      this.elementRef.nativeElement.querySelector('.home-button');
    this.animateTimeline();
  }

  animateTimeline() {
    gsap
      .timeline()
      .from(this.container, {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: 'back.out(1.7)',
      })
      .from(
        this.homeButton,
        { duration: 1, y: 100, opacity: 0, ease: 'power3.out' },
        '-=0.5'
      );
  }
}
