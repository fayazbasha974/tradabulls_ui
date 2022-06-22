import { Component, OnInit } from '@angular/core';

import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-equities-list',
  templateUrl: './equities-list.component.html',
  styleUrls: ['./equities-list.component.scss']
})
export class EquitiesListComponent implements OnInit {

  socket: any;
  equityData: any = [];
  equitiesList: any = [];
  selectedEquity: any = {};
  selectedTab: string = 'equity';

  constructor() { }

  ngOnInit(): void {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.getEquities();
  }

  getEquities() {
    this.socket.emit('disconnectEquities');
    this.socket.on('equities', (newData: any) => {
      this.equitiesList = Object.keys(newData);
      this.equityData = newData;
      if (!this.selectedEquity.equity) {
        this.selectedEquity = {
          equity: this.equitiesList[0],
          data: this.equityData[this.equitiesList[0]]
        }
      }
      console.log(newData);
    });
    this.socket.emit('getEquities');
  }

  onEquitySelect(equity: any) {
    console.log(equity);
    this.selectedEquity = equity;
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }

}
