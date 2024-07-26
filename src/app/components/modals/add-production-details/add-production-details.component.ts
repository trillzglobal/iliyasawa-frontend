import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { StaffService } from '../../../services/staff.service';
import { OutletService } from '../../../services/outlet.service';
import { ProductsService } from '../../../services/products.service';
import { SalesService } from '../../../services/sales.service';

@Component({
  selector: 'app-add-production-details',
  templateUrl: './add-production-details.component.html',
  styleUrls: ['./add-production-details.component.scss']
})
export class AddProductionDetailsComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  firstName: string = "";
  lastName: string = "";
  otherName: string = "";
  email: string = "";
  phone: string = "";
  type: string = "";
  outlet_id: string = "";
  description: string = "";

  usedProducts: any = []
  isSelectAll: boolean = false;
  fetchingProducts: boolean = false
  outlets: any = []
  products: any = []
  choosenProducts: any = [
    {
      product_id: "",
      price: 0,
      quantity: 1
    }
  ]

  @Input() visible: boolean = false;
  @Input() tab: string = "production";
  @Input() transaction: any = {};
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() created: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private staffService: StaffService,
    private productsService: ProductsService,
    private outletService: OutletService,
    private salesService: SalesService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getAllOutlets()
    this.getAllProducts()
  }

  ngOnChanges(changes: any) {
    this.errorMessage = "";
    this.processLoading = false;

    console.log(changes)

    // if (changes?.tab?.currentValue == "raw") {
    //   this.getAllProducts('RAW_MATERIAL')
    // }

    if (changes?.transaction?.currentValue.hasOwnProperty('id')) {

      const details = changes?.transaction?.currentValue.transaction_details;

      details.forEach((el: any) => {
        el['message'] = "";
        el['damages'] = 0;
      });

      this.usedProducts = details
    }
  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }


  addProduct() {
    this.choosenProducts.unshift(
      {
        product_id: "",
        price: 0,
        quantity: 1
      }
    )
  }

  removeProduct(index: any) {

    if (index > 0) { // only splice roles when item is found
      this.choosenProducts.splice(index, 1); // 2nd parameter means remove one item only
    }

  }

  getAllProducts(type: string = "FINISHED_PRODUCT") {
    this.fetchingProducts = true;

    this.productsService.getAllProducts(1, type).subscribe(
      async (res: any) => {
        if (res.status === "success") {
          this.fetchingProducts = false;
          this.products = res.data.data

        } else {

          this.errorMessage = '' + res.message;
          this.fetchingProducts = false;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingProducts = false;
      }
    )

  }

  getAllOutlets() {
    this.outletService.getOutlets().subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          this.outlets = res.data
          this.errorMessage = ''

        } else {
          this.processLoading = false;
          this.outlets = [];
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    )
  }

  create() {
    if (this.processLoading) return

    this.processLoading = true;

    if (this.choosenProducts.length > 0) {
      let error = false
      this.choosenProducts.forEach((item: any) => {
        if (item.product_id == "") {
          error = true
          this.processLoading = false;
          this.errorMessage = "Item product is not selected"
        }

        if (item.quantity <= 0) {
          error = true
          this.processLoading = false;
          this.errorMessage = "Item quantity must be atleast 1"
        }
      })

      if (error) return
    }

    if (this.usedProducts.length > 0) {
      let error = false
      this.choosenProducts.forEach((item: any) => {
        if (item.message == "") {
          error = true
          this.processLoading = false;
          this.errorMessage = "Item message cannot be empty"
        } else {
          this.errorMessage = "";
        }

        if (item.damages == "") {
          error = true
          this.processLoading = false;
          this.errorMessage = "Item damages cannot be emapty"
        } else {
          this.errorMessage = "";
        }
      })

      if (error) return
    }

    if (this.description === '') {
      this.errorMessage = "Description is required";
      this.processLoading = false;
      return
    } else {
      this.errorMessage = "";
    }

    const products: any = [];
    const products_details: any = [];

    this.usedProducts.forEach((el: any) => {
      const products_details_item = {
        product_detail_id: el.ulid,
        damages: el.damages,
        message: el.message
      };

      products_details.push(products_details_item);
    })

    const payload = {
      transaction_id: this.transaction.ulid,
      products: this.choosenProducts,
      product_details: products_details,
      reference: "PROD_" + this.generalService.getUniqueTwelveDigits(),
      description: this.description,
    }

    this.salesService.createTransactionReport(payload).subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });
          this.errorMessage = ''
          this.choosenProducts = [
            {
              product_id: "",
              price: 0,
              quantity: 1
            }
          ]
          this.outlet_id = ""
          this.type = ""
          this.description = ""

          this.created.emit();

        } else {
          this.processLoading = false;
          this.notification.error(res.message, '', {
            nzClass: 'notification1',
          });
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    )
  }
}
