import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/models/device.model';
import { User } from 'src/app/models/user.model';
import { DeviceService } from 'src/app/services/device.service';
import { UserService } from 'src/app/services/user.service';
import { DeviceCreateDialogComponent } from '../device-create-dialog/device-create-dialog.component';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  user!: User;
  devices!: Device[];

  constructor(
    private _userService:UserService, 
    private _route:ActivatedRoute,
    private _deviceService: DeviceService,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
  ){}

  ngOnInit(){
    this._userService.fetchUserById(this._route.snapshot.params['userId']).subscribe((response:User) => {
      this.user = response;
      console.log(this.user)
    })
    this._deviceService.fetchDevicesByUserId(this._route.snapshot.params['userId']).subscribe((response:Device[]) => {
      this.devices = response;
      console.log(this.devices)
    })
  }

  openUserUpdateDialog(userId: number | undefined) {
    if(userId)
      this._userService.fetchUserById(userId).subscribe((user:User) => {
        const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
          data: { user: user }
        });
        dialogRef.afterClosed().subscribe(() => {
          this.document.location.reload();
        });
      });
    else
      console.error("User id is undefined!");
  }

  deleteDevice(deviceId:number):void{
    this._deviceService.deleteDevice(deviceId).subscribe();
    this.document.location.reload();
  }

  openDeviceCreateDialog(){
    const dialogRef = this.dialog.open(DeviceCreateDialogComponent, {
      data: { userId: this.user.userId}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.document.location.reload();
    });
  }

}
