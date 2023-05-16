import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryErrorComponent } from './primary-error.component';

describe('PrimaryErrorComponent', () => {
  let component: PrimaryErrorComponent;
  let fixture: ComponentFixture<PrimaryErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
