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
import { EventSelectorComponent } from '../selector/selector.component';
import { Router } from '@angular/router';

@Component({
  selector: 'party-time-overview',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    MainHeaderComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
    EventSelectorComponent,
  ],
  templateUrl: './overview.component.html',
  providers: [OverviewStore, EventService],
  styles: [],
})
export class OverviewComponent {
  vm$ = this.overviewStore.vm$;

  constructor(private overviewStore: OverviewStore, private router: Router) {
    this.overviewStore.getEvents();
  }

  navigateToEdit(id: string) {
    this.router.navigate(['event/change', id]);
  }
}
