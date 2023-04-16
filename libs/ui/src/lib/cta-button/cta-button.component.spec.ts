import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtaButtonComponent } from './cta-button.component';
import { ActivatedRoute } from '@angular/router';

describe('CtaButtonComponent', () => {
  let component: CtaButtonComponent;
  let fixture: ComponentFixture<CtaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaButtonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
