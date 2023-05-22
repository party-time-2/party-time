//implements F001
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  PrimaryButtonComponent,
  MainHeaderComponent,
  PrimaryLabelComponent,
  PrimaryErrorComponent,
} from '@party-time/ui';
import { CreateStore } from './+state/create.state';
import { EventCreateDTO } from '@party-time/models';

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
  providers: [CreateStore],
  templateUrl: './create-event.component.html',
})
export class CreateEventComponent {
  vm$ = this.createStore.vm$;

  /// form group for the create event form
  createEventForm = this.formBuilder.group({
    name: [''],
    address: [
      this.formBuilder.group({
        addressLine: [''],
        zip: [''],
        city: [''],
        country: [''],
      }),
    ],
    date: [''],
    dateTime: [''],
  });

  get f(): { [key: string]: AbstractControl } {
    return this.createEventForm.controls;
  }

  // submit the create event form
  onSubmit(): void {
    if (this.createEventForm.valid) {
      this.createStore.getEventDTO(
        this.createEventForm.getRawValue() as EventCreateDTO
      );
    }
  }

  constructor(
    private createStore: CreateStore,
    private formBuilder: FormBuilder
  ) {}
}
