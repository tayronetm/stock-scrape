import { Component, OnInit } from '@angular/core';
import { CryptoService } from './services/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crypto-front';
  afterValue: any;
  valueBefore: any;
  currentValue: any;
  stocks = [];


constructor(
  private cryptoService: CryptoService
  ) {}

ngOnInit() {
  setInterval(() => {
    this.getStocks();
  }, 3000);
}

getStocks() {
  this.cryptoService.getStocks().pipe().subscribe(
    (res) => {
      if (res) {
        this.stocks = res;
        this.stocks.forEach( res => {
          console.log(res);
          this.currentValue = res.price;
          setTimeout(() => {
            this.afterValue = res.price;
          }, 2000);
          console.log('=>',res.price)
        });
      }
      console.log('antes', this.currentValue);
      console.log('depois', this.afterValue);
    }
  );
}

verifyStock() {
  if (this.currentValue < this.afterValue) {
    return true;
  } else if (this.currentValue > this.afterValue){
    return false;
  }
}


}
