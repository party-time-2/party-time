import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizedEventComponent } from './organized-Event.component';

describe('OrganizedEventComponent', () => {
  let component: OrganizedEventComponent;
  let fixture: ComponentFixture<OrganizedEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizedEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
