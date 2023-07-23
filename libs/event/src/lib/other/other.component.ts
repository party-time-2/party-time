import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrimaryButtonComponent,
  MainHeaderComponent,
  PrimaryLabelComponent,
  PrimaryErrorComponent,
} from '@party-time/ui';
import { OtherStore } from './+state/other.state';
import { Router } from '@angular/router';
import { Address, ParticipantStatus } from '@party-time/models';

@Component({
  selector: 'party-time-other',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    MainHeaderComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
  ],
  templateUrl: './other.component.html',
  styles: [],
  providers: [OtherStore],
})
export class OtherComponent {
  vm$ = this.otherStore.vm$;

  constructor(private otherStore: OtherStore, private router: Router) {}

  navigateToRoute(adress: Address) {}

  changeParticipantStatus(participantStatus: ParticipantStatus) {}
}
