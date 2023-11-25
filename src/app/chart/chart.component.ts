import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit
{
  private socket!: Socket;
    messages: string[] = [];
    messageInput: string = '';

    ngOnInit(): void {
        this.socket = io('http://localhost:3000');
        this.socket.on('newRow', (msg: {}) => {
            console.log(msg);
        });
    }

    sendMessage() {
        this.socket.emit('chat message', this.messageInput);
        this.messageInput = '';
    }
}
