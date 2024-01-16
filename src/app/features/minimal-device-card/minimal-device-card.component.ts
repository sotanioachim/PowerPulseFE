import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from 'src/app/models/device.model';

@Component({
  selector: 'app-minimal-device-card',
  templateUrl: './minimal-device-card.component.html',
  styleUrls: ['./minimal-device-card.component.css']
})
export class MinimalDeviceCardComponent {
  @Input() device!: Device;
  @Output() deleteDevice = new EventEmitter<number>();
}
