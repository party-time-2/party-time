import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDTO } from '@party-time/models';

@Component({
  selector: 'party-time-event-selector',
  standalone: true,
  imports: [CommonModule],
  template: ` <li
    class="p-5 w-full border-4 border-transparent hover:border-secondary-dark hover:dark:border-secondary-light rounded bg-primary-container-light text-on-primary-container-light dark:bg-primary-container-dark dark:text-on-primary-container-dark"
  >
    <div class="flex items-center space-x-4">
      <div class="min-w-0 flex-1">
        <p class="truncate text-lg font-medium">
          {{ event?.name }}
        </p>
        <p class="truncate text-sm">
          {{ event?.organizer?.name }}
        </p>
      </div>
      <div
        class=" inline-flex items-center text-base font-semibold"
      >
        {{ event?.dateTime | date : 'hh:mm' }}
      </div>
      <div
        class=" inline-flex items-center text-base font-semibold"
      >
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
}
