import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TertiaryButtonComponent } from './tertiary-button.component';
import { ActivatedRoute } from '@angular/router';

describe('TertiaryButtonComponent', () => {
  let component: TertiaryButtonComponent;
  let fixture: ComponentFixture<TertiaryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TertiaryButtonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TertiaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
