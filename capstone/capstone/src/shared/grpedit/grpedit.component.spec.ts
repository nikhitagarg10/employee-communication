import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpeditComponent } from './grpedit.component';

describe('GrpeditComponent', () => {
  let component: GrpeditComponent;
  let fixture: ComponentFixture<GrpeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrpeditComponent]
    });
    fixture = TestBed.createComponent(GrpeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
