import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { SafePipe } from '../pipes/safe.pipe';
import { MapComponent } from '../selectors/map.component';
import { LocationStore } from './+state/location.state';

@Component({
  selector: 'party-time-location',
  standalone: true,
  imports: [CommonModule, SafePipe, MapComponent],
  providers: [LocationStore, EventService],
  template: `<ng-container *ngIf="vm$ | async as vm">
    <section *ngIf="vm.mapsUrl">
      <iframe
        class="h-[calc(100vh-74px)] w-full"
        [src]="vm.mapsUrl | safe : 'resourceUrl'"
        loading="lazy"
      ></iframe>
    </section>
  </ng-container>`,
  styles: [],
})
export class LocationComponent {
  eventId = this.route.snapshot.paramMap.get('id');
  vm$ = this.locationStore.vm$;
  constructor(
    private route: ActivatedRoute,
    private locationStore: LocationStore
  ) {
    if (this.eventId) {
      this.locationStore.getEventId(this.eventId);
    }
  }
}
