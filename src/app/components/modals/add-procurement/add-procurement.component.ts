import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { StaffService } from '../../../services/staff.service';
import { ProductsService } from '../../../services/products.service';
import { OutletService } from '../../../services/outlet.service';
import { SalesService } from '../../../services/sales.service';

@Component({
  selector: 'app-add-procurement',
  templateUrl: './add-procurement.component.html',
  styleUrls: ['./add-procurement.component.scss']
})
export class AddProcurementComponent implements OnInit {
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

  ngOnChanges() {
    this.errorMessage = "";
    this.processLoading = false;
  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  permissionCheckAll(data: any) {
    data.forEach((el: any) => {
      el.isSelected = this.isSelectAll
    });
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
    console.log(index)

    if (index > 0) { // only splice roles when item is found
      this.choosenProducts.splice(index, 1); // 2nd parameter means remove one item only
    }

  }

  getAllProducts() {
    this.fetchingProducts = true;

    this.productsService.getAllProducts(1, "RAW_MATERIAL").subscribe(
      async (res: any) => {
        console.log(res);
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


    if (this.type === '') {
      this.errorMessage = "Transaction type is required";
      this.processLoading = false;
      return
    } else {
      this.errorMessage = "";
    }

    if (this.description === '') {
      this.errorMessage = "Phone number is required";
      this.processLoading = false;
      return
    } else {
      this.errorMessage = "";
    }


    const payload = {
      products: this.choosenProducts,
      reference: "PROCMT_" + this.generalService.getUniqueTwelveDigits(),
      product_type: "RAW_MATERIAL",
      subtype: "PROCUREMENT",
      type: this.type,
      description: this.description,
    }


    console.log(payload)


    this.salesService.createSales(payload).subscribe(
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
        console.log(error)
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    )
  }
}
