// implements F016
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Address, EventDTO, ParticipantEventDTO } from '@party-time/models';

@Component({
  selector: 'party-time-map',
  standalone: true,
  imports: [CommonModule],
  template: ` <div>maps</div> `,
  styles: [],
})
export class MapComponent {
  @Input() mapsUrl: string | undefined;

  constructor() {
    console.log(this.mapsUrl);
  }
}
