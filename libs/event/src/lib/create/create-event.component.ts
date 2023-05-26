//implements F001
import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  PrimaryButtonComponent,
  MainHeaderComponent,
  PrimaryLabelComponent,
  PrimaryErrorComponent,
} from '@party-time/ui';
import { CreateStore } from './+state/create.state';
import { EventCreateDTO } from '@party-time/models';
import { EventService } from '../services/event.service';

@Component({
  selector: 'party-time-create-event',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    MainHeaderComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
  ],
  providers: [CreateStore, EventService, DatePipe],
  templateUrl: './create-event.component.html',
})
export class CreateEventComponent {
  vm$ = this.createStore.vm$;

  /// form group for the create event form
  createEventForm = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    address: new FormGroup({
      addressLine: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
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
    return this.createEventForm.controls;
  }

  get addressControls(): { [key: string]: AbstractControl } {
    return this.createEventForm.controls.address.controls;
  }

  // submit the create event form
  onSubmit(): void {
    if (this.createEventForm.valid) {
      console.log(this.createEventForm.getRawValue() as EventCreateDTO);
      this.createStore.getEventDTO(
        this.createEventForm.getRawValue() as EventCreateDTO
      );
    }
  }

  constructor(
    private createStore: CreateStore,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    console.log();
  }
}
