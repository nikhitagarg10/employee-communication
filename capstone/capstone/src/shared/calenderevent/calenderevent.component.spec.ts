import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendereventComponent } from './calenderevent.component';

describe('CalendereventComponent', () => {
  let component: CalendereventComponent;
  let fixture: ComponentFixture<CalendereventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendereventComponent]
    });
    fixture = TestBed.createComponent(CalendereventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
