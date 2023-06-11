import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { MainHeaderComponent } from '@party-time/ui';
import { EditStore } from './+state/edit.state';

@Component({
  selector: 'party-time-edit-event',
  standalone: true,
  imports: [CommonModule,MainHeaderComponent],
  templateUrl: './edit-event.component.html',
  styles: [],

  providers: [EditStore, EventService],
})
export class EditEventComponent {
  vm$ = this.editStore.vm$;
  eventId = this.route.snapshot.paramMap.get('id');
  

  constructor(private editStore: EditStore, private route: ActivatedRoute) {
    this.editStore.getEvent(this.eventId as string);
  }
}
