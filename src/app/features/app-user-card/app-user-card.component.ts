import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-app-user-card',
  templateUrl: './app-user-card.component.html',
  styleUrls: ['./app-user-card.component.css']
})
export class AppUserCardComponent {
  @Input() user: User | undefined;
  @Output() deleteUser = new EventEmitter<number>();
}
