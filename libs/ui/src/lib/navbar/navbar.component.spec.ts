import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { ActivatedRoute } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.cta = {
      name: 'Get Started',
    };
    component.logo = {
      name: 'Logo',
      src: '',
      alt: '',
      href: '',
    };
    component.links = [
      {
        name: 'Link 1',
        href: '',
      },
      {
        name: 'Link 2',
        href: '',
      },
    ];
    component.showMenu = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
