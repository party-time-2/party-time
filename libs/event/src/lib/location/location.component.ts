// implements F018
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { SafePipe } from '../pipes/safe.pipe';
import { MapComponent } from '../selectors/map.component';
import { LocationStore } from './+state/location.state';
import {
  LoadingCircleComponent,
  PrimaryButtonComponent,
  PrimaryErrorComponent,
} from '@party-time/ui';

@Component({
  selector: 'party-time-location',
  standalone: true,
  imports: [
    CommonModule,
    SafePipe,
    MapComponent,
    PrimaryButtonComponent,
    PrimaryErrorComponent,
    LoadingCircleComponent,
  ],
  providers: [LocationStore, EventService],
  templateUrl: './location.component.html',
  styles: [],
})
export class LocationComponent {
  eventId = this.route.snapshot.paramMap.get('id');
  vm$ = this.locationStore.vm$;
  constructor(
    private route: ActivatedRoute,
    private locationStore: LocationStore  ) {
    if (this.eventId) {
      this.locationStore.getEvent(this.eventId);
    }
  }
}
