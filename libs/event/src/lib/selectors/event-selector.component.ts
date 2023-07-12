// implements F016
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDTO, ParticipantStatus } from '@party-time/models';

@Component({
  selector: 'party-time-event-selector',
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
      <div
        (click)="onSelectParticipants()"
        class="inline-flex cursor-alias items-center border-4 border-transparent p-5 text-base font-semibold hover:border-secondary-dark hover:dark:border-secondary-light"
      >
        <span class="flex flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
        </span>
        <div class=" inline-flex items-center text-base font-semibold">
          <span class="ml-1 flex flex-col">
            <div class="flex flex-row">
              Zusagen:
              <span class="pl-1">
                {{ getPaticipantsParticipatingCount(event) }}
              </span>
            </div>
          </span>
        </div>
      </div>
    </div>
  </li>`,
  styles: [],
})
export class EventSelectorComponent {
  @Input() event: EventDTO | undefined;
  @Output() selectEvent = new EventEmitter<EventDTO>();
  @Output() selectParticipants = new EventEmitter<EventDTO>();

  getPaticipantsParticipatingCount(event: EventDTO | undefined): number {
    if (!event) {
      return 0;
    }
    return event.participants.filter(
      (participant) => participant.status === ParticipantStatus.PARTICIPATING
    ).length;
  }

  onSelectParticipants() {
    this.selectParticipants.emit(this.event);
  }

  onSelectEvent() {
    this.selectEvent.emit(this.event);
  }
}
