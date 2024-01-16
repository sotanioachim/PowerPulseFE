import { Component} from '@angular/core';
import { StompService } from 'src/app/services/stomp.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  private colors: string[] = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];
  messages: { content: string, type: string, sender: string }[] = [];
  newMessage: string = '';
  userName?: string = 'Anonymus';

  constructor(private stompService: StompService, private _userService:UserService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem("userId");
    if(userId != null)
      this._userService.fetchUserById(Number(userId)).subscribe(res => this.userName = res.username);
    console.log(this.userName)
    this.connectToChat();
  }

  private connectToChat(): void {
    this.stompService.subscribe('/topic/public', this.onMessageReceived.bind(this));
  }

  onSubmit(): void {
    if (this.newMessage.trim() !== '') {
      const chatMessage = {
        content: this.newMessage,
        type: 'CHAT',
        sender: this.userName // Replace with the actual sender's username or retrieve from your authentication system
      };

      this.stompService.sendMessage('/app/chat.sendMessage', chatMessage);

      this.newMessage = '';
    }
  }

  private onMessageReceived(payload: any): void {
    this.messages.push(payload);
  }

  getAvatarColor(messageSender: string): string {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % this.colors.length);
    return this.colors[index];
  }

}
