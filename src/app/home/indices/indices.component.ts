import { Component, OnInit } from '@angular/core';

import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.scss']
})
export class IndicesComponent implements OnInit {

  socket: any;
  equityData: any = [];
  equitiesList: any = [];
  equities: any = {
    256265: 'NIFTY 50', 270857: 'NIFTY NEXT 50', 268041: 'NIFTY 500', 263433: 'NIFTY AUTO', 262409: 'NIFTY PHARMA', 260105: 'NIFTY BANK', 261385: 'NIFTY INFRA', 259849: 'NIFTY IT'
  }

  constructor() {
  }

  getDifference(equity: any) {
    const result = Number((equity.last_price - equity.ohlc.open).toFixed(2));
    return result >= 0 ? `+${result}` : result;
  }

  ngOnInit(): void {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('disconnectIndices');
    this.socket.on('indices', (newData: any) => {
      this.equitiesList = Object.keys(newData);
      this.equityData = newData;
      console.log(newData);
    });
    this.socket.emit('getIndices');
  }

}
