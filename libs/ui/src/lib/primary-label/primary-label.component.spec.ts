import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryLabelComponent } from './primary-label.component';

describe('PrimaryLabelComponent', () => {
  let component: PrimaryLabelComponent;
  let fixture: ComponentFixture<PrimaryLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
