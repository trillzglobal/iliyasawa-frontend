import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  name: string = "";
  location: string = "";
  address: string = "";

  @Input() visible: boolean = false;
  @Input() zones: any = [];
  @Input() product: any = [];
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() updatedProduct: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private notification: NzNotificationService,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {

  }

  update() {
    this.processLoading = false;


    if (this.product.name === '') {
      this.errorMessage = "product name is required";
      this.processLoading = false;
      return
    }

    if (this.product.description === '') {
      this.errorMessage = "description is required";
      this.processLoading = false;
      return
    }

    const payload = {
      name: this.product.name.trim(),
      description: this.product.description.trim(),
    }

    this.productService.updateProduct(payload, this.product.ulid).subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });
          this.errorMessage = ''
          this.updatedProduct.emit();

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

  ngOnChanges(changes: any) {

  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
