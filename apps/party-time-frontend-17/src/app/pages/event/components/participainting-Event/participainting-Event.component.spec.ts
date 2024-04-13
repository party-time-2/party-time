import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipaintingEventComponent } from './participainting-Event.component';

describe('ParticipaintingEventComponent', () => {
  let component: ParticipaintingEventComponent;
  let fixture: ComponentFixture<ParticipaintingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipaintingEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipaintingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
