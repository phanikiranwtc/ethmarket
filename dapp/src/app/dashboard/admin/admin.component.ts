import { Component, OnInit,Inject } from '@angular/core';
import {EthcontractService} from '../../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog} from '@angular/material';
import {AddadminComponent} from './addadmin/addadmin.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
admins : any[]=[];
account : any;
activeAccount : any;

constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService, public dialog: MatDialog) { }

  ngOnInit() {

    this.activeAccount= this.ethcontractService.getValidAccount();
    if(this.activeAccount ==undefined){
       this.router.navigate(['/login']);
    }
    else{
    this.ethcontractService.getAdminUsers().then(admins=>{
      console.log(admins);
      this.admins= admins;
    });
  }
  }



  openDialog(): void {
      const dialogRef = this.dialog.open(AddadminComponent, {
        width: '450px',
        data: { account: this.account}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result!= undefined){
        this.account = result;
        this.ethcontractService.createAdminUser(result).then(status=>{
          console.log(status);
          this.admins.push(result);
          // this.accessAccounts[index].access[1]=true;
          // this.accessAccounts= access;
        });
      }

      });
    }

}
