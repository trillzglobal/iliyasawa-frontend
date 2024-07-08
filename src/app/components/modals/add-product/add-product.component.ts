import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  description: string = "";
  name: string = "";
  unit: string = "";
  quantity: number = 1;
  price: string = ""
  type: string = ""

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() createdProduct: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private notification: NzNotificationService,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.processLoading) return
    this.processLoading = true;

    if (this.name === '') {
      this.errorMessage = "product name is required";
      this.processLoading = false;
      return
    }

    if (this.unit === '') {
      this.errorMessage = "product unit is required";
      this.processLoading = false;
      return
    }

    if (this.type === '') {
      this.errorMessage = "type is required";
      this.processLoading = false;
      return
    }

    if (this.type == 'FINISHED_PRODUCT' && this.price === '') {
      this.errorMessage = "price is required";
      this.processLoading = false;
      return
    }

    if (this.description === '') {
      this.errorMessage = "description is required";
      this.processLoading = false;
      return
    }

    const payload = {
      name: this.name.trim(),
      description: this.description,
      measurement_unit: this.unit,
      quantity: this.quantity,
      price: this.price,
      product_type: this.type
    }

    this.productService.createProduct(payload).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.processLoading = false;

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });
          this.errorMessage = ''
          this.unit = '';
          this.name = '';
          this.description = '';
          this.quantity = 0;
          this.type = "";
          this.price = "";
          this.createdProduct.emit();

        } else {
          this.processLoading = false;
          this.errorMessage = res.message;
          this.notification.error(res.message, '', {
            nzClass: 'notification1',
          });
        }
      },
      (error: any) => {
        this.errorMessage = "error occured please try again";
        this.processLoading = false;
      }
    )
  }

  ngOnChanges() {
    this.errorMessage = "";
    this.processLoading = false;
  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
