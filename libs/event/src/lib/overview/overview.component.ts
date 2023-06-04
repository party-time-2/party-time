//implements F016
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MainHeaderComponent,
  PrimaryButtonComponent,
  PrimaryErrorComponent,
  PrimaryLabelComponent,
} from '@party-time/ui';
import { OverviewStore } from './+state/overview.state';
import { EventService } from '../services/event.service';

@Component({
  selector: 'party-time-overview',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    MainHeaderComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
  ],
  templateUrl: './overview.component.html',
  providers: [OverviewStore, EventService],
  styles: [],
})
export class OverviewComponent {
  vm$ = this.overviewStore.vm$;

  constructor(private overviewStore: OverviewStore) {
    this.overviewStore.getEvents();
  }
}
