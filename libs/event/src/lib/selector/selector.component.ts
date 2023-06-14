// implements F016
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDTO } from '@party-time/models';

@Component({
  selector: 'party-time-event-selector',
  standalone: true,
  imports: [CommonModule],
  template: ` <li
    (click)="onSelectEvent()"
    class="w-full cursor-pointer rounded border-4 border-transparent bg-primary-container-light p-5 text-on-primary-container-light hover:border-secondary-dark dark:bg-primary-container-dark dark:text-on-primary-container-dark hover:dark:border-secondary-light"
  >
    <div class="flex items-center space-x-4">
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
  </li>`,
  styles: [],
})
export class EventSelectorComponent {
  @Input() event: EventDTO | undefined;
  @Output() selectEvent = new EventEmitter<EventDTO>();

  onSelectEvent() {
    this.selectEvent.emit(this.event);
  }
}
