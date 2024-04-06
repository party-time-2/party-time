// implements F016
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantEventDTO, ParticipantStatus } from '@party-time/models';
import { SecondaryButtonComponent } from '@party-time/ui';

@Component({
  selector: 'party-time-event-participating-selector',
  standalone: true,
  imports: [CommonModule, SecondaryButtonComponent],
  template: ` <li
    class="w-full  rounded bg-primary-container-light p-5 text-on-primary-container-light  dark:bg-primary-container-dark dark:text-on-primary-container-dark "
  >
    <div>
      <div class="flex items-center  space-x-4 border-4 border-transparent p-5">
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
        class="flex  items-center  space-x-4 border-4 border-transparent p-5 "
      >
        <div
          class="inline-flex min-w-0 flex-1 items-center text-base font-semibold"
        >
          <span class="ml-1 flex flex-col">
            <div
              *ngIf="
                getParticipantStatus() === ParticipantStatusValue.PARTICIPATING;
                else notParticipating
              "
            >
              <p class="truncate text-lg font-medium">
                Zugesagt |
                <button
                  (click)="
                    onParticipantStatusChaned(ParticipantStatusValue.DECLINED)
                  "
                >
                  Absagen
                </button>
              </p>
            </div>
            <ng-template #notParticipating>
              <p>
                Abgesagt |
                <button
                  (click)="
                    onParticipantStatusChaned(
                      ParticipantStatusValue.PARTICIPATING
                    )
                  "
                >
                  Zusagen
                </button>
              </p>
            </ng-template>
          </span>
        </div>

        <div class=" inline-flex items-center text-base font-semibold">
          <span class="flex cursor-pointer flex-col" (click)="onSelectEvent()">
            <p class="self-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                class="h-7"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                ></path>
              </svg>
            </p>
            <p>Adresse auf Karte ansehen</p>
          </span>
        </div>
      </div>
    </div>
  </li>`,
  styles: [],
})
export class EventParticipatingSelectorComponent {
  readonly ParticipantStatusValue = ParticipantStatus;
  @Input() event: ParticipantEventDTO | undefined;
  @Output() selectEvent = new EventEmitter<ParticipantEventDTO>();
  @Output() changeParticipantStatus = new EventEmitter<ParticipantStatus>();

  getParticipantStatus(): ParticipantStatus {
    if (this.event?.participatingStatus === ParticipantStatus.PARTICIPATING) {
      return ParticipantStatus.PARTICIPATING;
    }
    return this.event?.participatingStatus ?? ParticipantStatus.DECLINED;
  }

  onParticipantStatusChaned(participantStatus: ParticipantStatus) {
    this.changeParticipantStatus.emit(participantStatus);
  }

  onSelectEvent() {
    this.selectEvent.emit(this.event);
  }
}
