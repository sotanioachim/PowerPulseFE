import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-create-dialog',
  templateUrl: './device-create-dialog.component.html',
  styleUrls: ['./device-create-dialog.component.css']
})
export class DeviceCreateDialogComponent {
  createForm!: FormGroup;
  userId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DeviceCreateDialogComponent>,
    private deviceService: DeviceService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.userId = data.userId;
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      maxConsumption: ["",Validators.required]
    });
  }

  onSubmit() {
    if (this.createForm.valid) {
      const device:Device = {
          deviceId: 0,
          name: this.createForm.get('name')?.value,
          type: this.createForm.get('type')?.value,
          maxConsumption: this.createForm.get('maxConsumption')?.value,
          user: {
            userId: this.userId
          }
      }
      this.deviceService.createDevice(device).subscribe((res) => {
        this.dialogRef.close(this.createForm.value);
      });
      
    }
  }
}
