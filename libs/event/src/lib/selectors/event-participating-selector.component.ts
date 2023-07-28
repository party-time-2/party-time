// implements F016
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantEventDTO, ParticipantStatus } from '@party-time/models';

@Component({
  selector: 'party-time-event-participating-selector',
  standalone: true,
  imports: [CommonModule],
  template: ` <li
    class="w-full  rounded bg-primary-container-light p-5 text-on-primary-container-light  dark:bg-primary-container-dark dark:text-on-primary-container-dark "
  >
    <div>
      <div
        (click)="onSelectEvent()"
        class="flex cursor-pointer items-center  space-x-4 border-4 border-transparent p-5 hover:border-secondary-dark hover:dark:border-secondary-light"
      >
        <div class="min-w-0 flex-1">
          <p class="truncate text-lg font-medium">
            {{ event?.name }}
          </p>
          <p class="truncate text-sm">
            {{ event?.address?.addressLine }} | {{ event?.address?.zip }}
            {{ event?.address?.city }}
          </p>
          <p class="truncate text-sm">von {{ event?.organizer?.name }}</p>
        </div>
        <div class=" inline-flex items-center text-2xl font-semibold">
          {{ event?.dateTime | date : 'hh:mm' }}
        </div>
        <div class=" inline-flex items-center text-base font-semibold">
          <span class="flex flex-col">
            <p>
              {{ event?.dateTime | date : 'EEEE' }}
            </p>
            <p>
              {{ event?.dateTime | date : 'dd.MM.YYYY' }}
            </p>
          </span>
        </div>
      </div>
     
    </div>
  </li>`,
  styles: [],
})
export class EventParticipatingSelectorComponent {
  @Input() event: ParticipantEventDTO | undefined;
  @Output() selectEvent = new EventEmitter<ParticipantEventDTO>();
  @Output() changeParticipantStatus =  new EventEmitter<ParticipantStatus>();


  onParticipantStatusChaned(participantStatus: ParticipantStatus){
    this.changeParticipantStatus.emit(this.event?.status)
  }

  onSelectEvent() {
    this.selectEvent.emit(this.event);
  }
}
