import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-buyproduct',
  templateUrl: './buyproduct.component.html',
  styleUrls: ['./buyproduct.component.css']
})
export class BuyproductComponent implements OnInit {
  quantity: number;
  selectedProductId : any;
  constructor(
      public dialogRef: MatDialogRef<BuyproductComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {}
  }
