import { DOCUMENT } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';
import { DeviceCreateDialogComponent } from '../device-create-dialog/device-create-dialog.component';
import { DeviceUpdateDialogComponent } from '../device-update-dialog/device-update-dialog.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit{
  devices: Device[] = [];
  displayedColumns: string[] = ['Name', 'Type', 'UserId', 'actions'];

  constructor(
    private deviceService: DeviceService,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;

    if (userId !== null) {
      this.deviceService.fetchDevicesByUserId(userId).subscribe((data: Device[]) => {
        this.devices = data;
      });
    } else {
      // Handle the case where userId is null
      console.error('User ID is null.');
    }

    // this.webSocketService.connect();
    // this.webSocketService.subscribeToTopic("messages");
    // this.webSocketService.receiveMessages().subscribe((message) => {
    //   console.log('Received message:', message);
    // });
  }

  openDeviceEditDialog(deviceId: number) {
    this.deviceService.fetchDeviceById(deviceId).subscribe((device:Device) => {
      const dialogRef = this.dialog.open(DeviceUpdateDialogComponent, {
        data: { device: device }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.document.location.reload();
      });
    });
  }

  openDeviceCreateDialog(){
    const dialogRef = this.dialog.open(DeviceCreateDialogComponent, {
      data: { userId: localStorage.getItem('userId')}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.document.location.reload();
    });
  }

  deleteDevice(deviceId:number):void{
    this.deviceService.deleteDevice(deviceId).subscribe();
    this.document.location.reload();
  }
  
}
