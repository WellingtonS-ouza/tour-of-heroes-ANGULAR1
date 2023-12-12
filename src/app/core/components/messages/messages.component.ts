import { MessageService } from '../../service/message.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
 constructor(public messageService: MessageService){

 }


}
