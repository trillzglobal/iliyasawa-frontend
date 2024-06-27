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
  quantity: number = 0;

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() createdSchool: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private notification: NzNotificationService,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {

  }

  submit() {
    this.processLoading = false;

    if (this.name === '') {
      this.errorMessage = "product name is required";
      this.processLoading = false;
      return
    }

    if (this.description === '') {
      this.errorMessage = "description is required";
      this.processLoading = false;
      return
    }

    const payload = {
      product_name: this.name.trim(),
      product_description: this.description.trim(),
      measurement_unit: this.unit,
      quantity: this.quantity
    }

    this.productService.createProductStore(payload).subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });
          this.errorMessage = ''
          this.unit = '';
          this.name = '';
          this.quantity = 0;
          this.createdSchool.emit();

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

  ngOnChanges() {
    this.errorMessage = "";
    this.processLoading = false;
  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
