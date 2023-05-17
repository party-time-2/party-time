import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteStore } from './+state/delete.state';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimaryButtonComponent,
  MainHeaderComponent,
  PrimaryErrorComponent,
  PrimaryLabelComponent,
} from '@party-time/ui';
import { LoginResponseDTO } from '@party-time/models';
import { DeleteService } from '../services/delete.service';

@Component({
  selector: 'party-time-delete',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    MainHeaderComponent,
    PrimaryErrorComponent,
    PrimaryLabelComponent,
  ],
  templateUrl: './delete.component.html',
  providers: [DeleteStore, DeleteService],
  styles: [],
})
export class DeleteComponent {
  vm$ = this.deleteStore.vm$;

  deleteForm = this.formBuilder.group({
    currentPassword: ['', Validators.required],
  });

  get f(): { [key: string]: any } {
    return this.deleteForm.controls;
  }

  onSubmit(): void {
    if (this.deleteForm.valid) {
      this.deleteStore.getAccountDeleted(
        this.deleteForm.getRawValue().currentPassword as string
      );
    }
  }

  constructor(
    private deleteStore: DeleteStore,
    private formBuilder: FormBuilder
  ) {}
}
