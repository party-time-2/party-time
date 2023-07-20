import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationService } from '../services/invitation.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ApiError } from '@party-time/models';
import { on } from '@ngrx/store';

@Component({
  selector: 'party-time-accept',
  standalone: true,
  imports: [CommonModule],
  template: `<section>
    <ng-container>
      <pre>{{ apiError?.error | json }}</pre>
    </ng-container>
  </section>`,
  styles: [],
  providers: [InvitationService],
})
export class AcceptComponent implements OnInit {
  eventId = this.route.snapshot.paramMap.get('eventId');
  apiError: ApiError | undefined;
  constructor(
    private invitationService: InvitationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invitationService
      .acceptInvitation(this.eventId as string)
      .subscribe((response: HttpErrorResponse) => {
        console.log(response);
        if (response.status === 400) {
          this.router.navigate([`/event`]);
        } else {
         // this.apiError = response as ApiError;
          console.log(this.apiError);
        }
      });
  }
}
