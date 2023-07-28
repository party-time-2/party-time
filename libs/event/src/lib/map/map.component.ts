import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { Address } from '@party-time/models';
import { SafePipe } from '../pipes/safe.pipe';

@Component({
  selector: 'party-time-map',
  standalone: true,
  imports: [CommonModule, SafePipe],
  providers: [EventService],
  template: `
  <div *ngIf="showMap && adressUrl">
    <iframe class="p-5 w-full h-screen" [src]="adressUrl | safe"></iframe>
    </div>
    `,
  styles: [],
})
export class MapComponent implements OnInit{
  eventId = this.route.snapshot.paramMap.get('id');
  address: Address | undefined;
  showMap = false;
  adressUrl = "https://maps.google.com/maps?q=Obere%20Hauptstra%C3%9Fe%2048%20Freising+(Dr.%20Rainer%20Pfefferle)&amp;f=l&amp;t=h&amp;ie=UTF8&amp;output=embed"

  ngOnInit(): void {
    this.showMap = true;
  }

  constructor(private route: ActivatedRoute, private eventService: EventService) {
    // get event from api
    if (this.eventId) {
    eventService.getParticipantEvent(this.eventId).subscribe((event) => {
      this.address = event.address;
    });
  }
  }
}