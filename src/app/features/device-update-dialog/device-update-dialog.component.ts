import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-update-dialog',
  templateUrl: './device-update-dialog.component.html',
  styleUrls: ['./device-update-dialog.component.css']
})
export class DeviceUpdateDialogComponent {
  updateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DeviceUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: [this.data.device.name, Validators.required],
      type: [this.data.device.type, Validators.required],
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const device:Device = {
          deviceId: this.data.device.deviceId,
          name: this.updateForm.get('name')?.value,
          type: this.updateForm.get('type')?.value
      }
      this.deviceService.updateDevice(device).subscribe((res) => {
        this.dialogRef.close(this.updateForm.value);
      });
      
    }
  }
}
