import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDTO } from '@party-time/models';

@Component({
  selector: 'party-time-event-selector',
  standalone: true,
  imports: [CommonModule],
  template: ` <li class="pb-3 sm:pb-4">
    <div class="flex items-center space-x-4">
      <div class="min-w-0 flex-1">
        <p class="text-gray-900 dark:text-white truncate text-sm font-medium">
          {{ event?.name }}
        </p>
        <p class="text-gray-500 dark:text-gray-400 truncate text-sm">
          {{ event?.organizer?.name }}
        </p>
      </div>
      <div
        class="text-gray-900 dark:text-white inline-flex items-center text-base font-semibold"
      >
        {{ event?.dateTime | date : 'hh:mm' }}
      </div>
      <div
        class="text-gray-900 dark:text-white inline-flex items-center text-base font-semibold"
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
