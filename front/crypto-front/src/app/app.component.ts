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
  }, 5000);
}

getStocks() {
  this.cryptoService.getStocks().pipe().subscribe(
    (res: Array<any>) => {
        if (this.stocks.length == 0) {
          this.stocks = res;
        } else {
          res.forEach((moeda, index) => {
            if(this.stocks[index].price < moeda.price) {
              this.stocks[index].price = moeda.price;
              this.stocks[index].cssClass = 'red';
            } else if (this.stocks[index].price > moeda.price) {
              this.stocks[index].cssClass = 'blue';
            } else {
              this.stocks[index].cssClass = '';
            }
          });
        }
        // this.stocks = res;
        // if (res.name == "Bitcoin") {

        // }
        // this.stocks.forEach( res => {
        //   console.log(res);
        //   this.currentValue = res.price;
        //   setTimeout(() => {
        //     this.afterValue = res.price;
        //   }, 2000);
        //   console.log('=>',res.price)
        // });

      // console.log('antes', this.currentValue);
      // console.log('depois', this.afterValue);
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
