import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementStatsComponent } from './measurement-stats.component';

describe('MeasurementStatsComponent', () => {
  let component: MeasurementStatsComponent;
  let fixture: ComponentFixture<MeasurementStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeasurementStatsComponent]
    });
    fixture = TestBed.createComponent(MeasurementStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
