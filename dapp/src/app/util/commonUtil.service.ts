import {Web3Service} from './web3.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import {Product} from './product.interface';
// import {Store} from './store.interface';
// import {StoreOwner} from './storeOwner.interface';

declare let require: any;
const marketplace_artifacts = require('../../../../build/contracts/MarketPlace.json');


@Injectable()
export class CommonUtilService {
MarketPlace :any;
storeOwner :any;
  constructor(private web3Service: Web3Service){
      console.log('Constructor: ' + web3Service);
      console.log('OnInit: ' + this.web3Service);
      console.log(this);

      this.web3Service.artifactsToContract(marketplace_artifacts)
        .then((MktPlaceAbstraction) => {
          this.MarketPlace = MktPlaceAbstraction;
          this.getDetails();
        });
  }

  async getDetails() {
    console.log('Getting stores');

    try {
      const deployedStoreOwner = await this.MarketPlace.deployed();
      console.log(deployedStoreOwner);
      // console.log('Account', this.model.account);
      const StoreOwners = await deployedStoreOwner.getStoreOwners.call();
      console.log('Found store owners: ' + StoreOwners);
      this.storeOwner = StoreOwners;
    } catch (e) {
      console.log(e);
      // this.setStatus('Error getting balance; see log.');
    }
  }
}
