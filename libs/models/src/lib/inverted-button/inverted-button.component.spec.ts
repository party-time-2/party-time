import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvertedButtonComponent } from './inverted-button.component';

describe('InvertedButtonComponent', () => {
  let component: InvertedButtonComponent;
  let fixture: ComponentFixture<InvertedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvertedButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvertedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
