import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalDeviceCardComponent } from './minimal-device-card.component';

describe('MinimalDeviceCardComponent', () => {
  let component: MinimalDeviceCardComponent;
  let fixture: ComponentFixture<MinimalDeviceCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinimalDeviceCardComponent]
    });
    fixture = TestBed.createComponent(MinimalDeviceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
