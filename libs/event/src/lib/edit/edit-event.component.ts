//implements F002
import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import {
  MainHeaderComponent,
  PrimaryButtonComponent,
  PrimaryErrorComponent,
  PrimaryLabelComponent,
  SecondaryButtonComponent,
} from '@party-time/ui';
import { EditStore } from './+state/edit.state';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventDTO } from '@party-time/models';

@Component({
  selector: 'party-time-edit-event',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    MainHeaderComponent,
    PrimaryLabelComponent,
  
  SecondaryButtonComponent,  PrimaryErrorComponent,
  ],
  templateUrl: './edit-event.component.html',
  styles: [],

  providers: [EditStore, EventService, DatePipe],
})
export class EditEventComponent {
  vm$ = this.editStore.vm$;
  eventId = this.route.snapshot.paramMap.get('id');
  event: EventDTO | undefined;

  /// form group for the create event form
  editEventForm = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    address: new FormGroup({
      addressLine: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      zip: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern('^[0-9]*$'),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),

      country: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    }),

    dateTime: new FormControl(
      this.datePipe.transform(new Date() as Date, 'yyyy-MM-dd HH:mm'),
      Validators.required
    ),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.editEventForm.controls;
  }

  get addressControls(): { [key: string]: AbstractControl } {
    return this.editEventForm.controls.address.controls;
  }

  onSubmit(): void {
    if (this.editEventForm.valid) {
      this.editEventForm.controls.dateTime.setValue(
        this.datePipe.transform(
          this.editEventForm.controls.dateTime.getRawValue(),
          'yyyy-MM-dd HH:mm:ss'
        )
      );
      this.editStore.editEvent({
        ...this.event,
        ...this.editEventForm.getRawValue(),
      } as EventDTO);
    }
  }

  constructor(
    private editStore: EditStore,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.editStore.getEvent(this.eventId as string);
    this.editStore.vm$.subscribe((vm) => {
      if (vm.event) {
        this.event = vm.event;
        this.editEventForm.controls.name.setValue(this.event.name);
        this.editEventForm.controls.address.controls.addressLine.setValue(
          this.event.address.addressLine
        );
        this.editEventForm.controls.address.controls.zip.setValue(
          this.event.address.zip
        );
        this.editEventForm.controls.address.controls.city.setValue(
          this.event.address.city
        );
        this.editEventForm.controls.address.controls.country.setValue(
          this.event.address.country
        );
        this.editEventForm.controls.dateTime.setValue(
          this.datePipe.transform(
            this.event.dateTime,
            'yyyy-MM-dd HH:mm' as string
          )
        );
      }
    });
  }
}
