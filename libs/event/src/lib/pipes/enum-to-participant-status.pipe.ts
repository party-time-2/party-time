import { Pipe, PipeTransform } from '@angular/core';
import { ParticipantStatus } from '@party-time/models';

@Pipe({
  name: 'enumToParticipantStatus',
  standalone: true,
})
export class EnumToParticipantStatusPipe implements PipeTransform {
  transform(value: ParticipantStatus | undefined): string {
    switch (value) {
      case ParticipantStatus.INVITED:
        return 'Eingeladen';
      case ParticipantStatus.PARTICIPATING:
        return 'Zugesagt';
      case ParticipantStatus.DECLINED:
        return 'Abgelehnt';
      default:
        return '';
    }
  }
}
