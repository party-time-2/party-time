//implments F003
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DeleteStore } from './+state/delete.state';
import { EventService } from '../services/event.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  PrimaryButtonComponent,
  MainHeaderComponent,
  PrimaryLabelComponent,
  PrimaryErrorComponent,
  SecondaryButtonComponent,
} from '@party-time/ui';

@Component({
  selector: 'party-time-delete-event',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    MainHeaderComponent,
    SecondaryButtonComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
  ],
  templateUrl: './delete-event.component.html',
  providers: [DeleteStore, EventService],
  styles: [],
})
export class DeleteEventComponent {
  eventId = this.route.snapshot.paramMap.get('id');
  vm$ = this.deleteStore.vm$;

  onDeleteEvent() {
    if (!this.eventId) {
      return;
    }
    this.deleteStore.deleteEvent(this.eventId);
  }

  constructor(
    private route: ActivatedRoute,
    private deleteStore: DeleteStore
  ) {}
}
