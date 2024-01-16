import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from 'src/app/models/device.model';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent {
  @Input() device!: Device;
  @Output() editDevice = new EventEmitter<number>();
  @Output() deleteDevice = new EventEmitter<number>();
}
