import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CanvasJS } from '@canvasjs/angular-charts';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements  OnDestroy {
  dataPoints1: any[] = [];
  dataPoints2: any[] = [];
  dataPoints3: any[] = [];
  dataPoints4: any[] = [];
  private socket!: Socket;
  chart: any;

  chartOptions = {
    theme: 'light2',
    title: {
      text: 'Live Data',
    },
    data: [
      {
        type: 'line',
        showInLegend: true,
        legendText: 'open',
        name: 'open',
        dataPoints: this.dataPoints1,
      },
      {
        type: 'line',
        showInLegend: true,
        legendText: 'close',
        name: 'close',
        dataPoints: this.dataPoints2,
      },
      {
        type: 'line',
        showInLegend: true,
        legendText: 'High',
        name: 'High',
        dataPoints: this.dataPoints3,
      },
      {
        type: 'line',
        showInLegend: true,
        legendText: 'Low',
        name: 'Low',
        dataPoints: this.dataPoints4,
      },
    ],
  };

  constructor(private _snackBar: MatSnackBar) {}

  getChartInstance(chart: object) {
    this.chart = chart;
    this.setupSocket();
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }


  setupSocket(): void {
    this.socket = io('http://localhost:3000');
    this.socket.on('Increase', (Increase) => {
      console.log(Increase);
      this._snackBar.open(Increase.value);
    });
    this.socket.on('newRow', (msg) => {
      console.log(msg);

      this.dataPoints1.push({
        x: new Date(msg.date),
        y: parseFloat(msg.open),
      });

      this.dataPoints2.push({
          x: new Date(msg.date),
          y: parseFloat(msg.close),
      });
      this.dataPoints3.push({
        x: new Date(msg.date),
        y: parseFloat(msg.high),
      });

      this.dataPoints4.push({
          x: new Date(msg.date),
          y: parseFloat(msg.low),
      });
      this.chart.render();
    });
  }
}
