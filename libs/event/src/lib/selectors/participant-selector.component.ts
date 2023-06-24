// implements F016
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantDTO } from '@party-time/models';
import { EnumToParticipantStatusPipe } from '../pipes/enum-to-participant-status.pipe';

@Component({
  selector: 'party-time-participant-selector',
  standalone: true,
  template: ` <li
    class="w-full  rounded bg-primary-container-light p-5 text-on-primary-container-light  dark:bg-primary-container-dark dark:text-on-primary-container-dark "
  >
    <div>
      <div class="flex  items-center  space-x-4  p-5 ">
        <div class="min-w-0 flex-1">
          <p class="truncate text-lg font-medium">
            {{ participant?.account?.email }}
          </p>
          <p class="truncate text-sm">
            {{ participant?.status | enumToParticipantStatus }}
          </p>
        </div>
        <div class=" inline-flex items-center text-base font-semibold">
          <span
            class="flex cursor-pointer flex-col"
            (click)="onparticipantStatusChanged(0)"
          >
            <p>{{ participant?.account?.name }} ausladen</p>
          </span>
        </div>
      </div>
    </div>
  </li>`,
  styles: [],
  imports: [CommonModule, EnumToParticipantStatusPipe],
})
export class ParticipantsSelectorComponent {
  @Input() participant: ParticipantDTO | undefined;
  @Output() participantStatusChanged = new EventEmitter<number>();

  onparticipantStatusChanged(status: number) {
    this.participantStatusChanged.emit(status);
  }
}
