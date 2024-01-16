import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class StompService {

  socket = new SockJS(environment.baseWebSocketURL);
  stompClient = Stomp.over(this.socket);

  subscribe(topic:string, callback: any): void {
    const connected: boolean = this.stompClient.connected;
    if(connected){
      this.subscribeToTopic(topic,callback);
      return;
    }

    this.stompClient.connect({},():any => {
      this.subscribeToTopic(topic,callback);
    })
  }

  private subscribeToTopic(topic: string, callback: any): void{
    this.stompClient.subscribe(topic,(payload: any)=>{
      callback(JSON.parse(payload.body));
    });
  }

  sendMessage(url:string,message:any):void{
    this.stompClient.send(url,{},JSON.stringify(message));
  }
  
}
