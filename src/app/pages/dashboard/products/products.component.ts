import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedProduct: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  // Available doctors
  fetchingProducts: boolean = false;
  products: Array<any> = [];
  productsStart: number = 0;
  productsStop: number = 0;
  productsPage: number = 1;
  productsLimit: number = 25;
  totalProducts: number = 0;
  searchTerm: string = ""

  sample = [
    {
      "_id": "6600981563d8474d278f8920",
      "name": "WUSE 2 ",
      "quantity": "123",
      "description": "Very good product",
      "status": "Available",
      "isDeleted": false,
      "createdAt": "2024-03-24T21:16:05.669Z",
      "updatedAt": "2024-04-07T21:22:42.883Z",
      "__v": 0,
      "approvedAt": "2024-04-07T21:21:04.415Z",
      "createdBy": {
        "firstName": "Super",
        "surname": "Admin",
        "otherName": "",
        "emailAddress": "admin@healmemedconsult.org",
        "gender": "Male",
        "role": "SUPER_ADMIN",
      }
    },
    {
      "_id": "6600981563d8474d278f8920",
      "name": "Outlet 123",
      "quantity": "1234",
      "description": "some good product 3",
      "status": "Available",
      "isDeleted": false,
      "createdAt": "2024-03-24T21:16:05.669Z",
      "updatedAt": "2024-04-07T21:22:42.883Z",
      "__v": 0,
      "approvedAt": "2024-04-07T21:21:04.415Z",
      "createdBy": {
        "firstName": "Super",
        "surname": "Admin",
        "otherName": "",
        "emailAddress": "admin@healmemedconsult.org",
        "gender": "Male",
        "role": "SUPER_ADMIN",
      }
    },
    {
      "_id": "6600981563d8474d278f8920",
      "name": "Albert place",
      "quantity": "2222222",
      "description": "some good product 1",
      "status": "Available",
      "isDeleted": false,
      "createdAt": "2024-03-24T21:16:05.669Z",
      "updatedAt": "2024-04-07T21:22:42.883Z",
      "__v": 0,
      "approvedAt": "2024-04-07T21:21:04.415Z",
      "createdBy": {
        "firstName": "Super",
        "surname": "Admin",
        "otherName": "",
        "emailAddress": "admin@healmemedconsult.org",
        "gender": "Male",
        "role": "SUPER_ADMIN",
      }
    }
  ]

  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private productsService: ProductsService,
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getAllProducts()
  }


  search() {

    this.getAllProducts()

  }


  getAllProducts() {

    this.fetchingProducts = true;

    // this.outletService.getAllOutlet(this.productsPage - 1, this.productsLimit, 'Available', this.searchTerm, this.fromDate, this.toDate).subscribe(
    //   async (res: any) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.fetchingProducts = false;

    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );

    //       this.products = res.data
    //       this.totalProducts = res.pagination.total;
    //       this.productsStart = (this.productsPage - 1) * this.productsLimit;
    //       this.productsStop = this.productsStart + this.products.length;

    //     } else {
    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );
    //       this.errorMessage = '' + res.message;
    //       this.fetchingProducts = false;
    //       this.totalProducts = 0;
    //       this.productsStart = 0;
    //       this.productsStop = 0;
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.fetchingProducts = false;
    //     this.totalProducts = 0;
    //     this.productsStart = 0;
    //     this.productsStop = 0;
    //   }
    // )

    this.products = this.sample
    this.totalProducts = 50;
    this.productsPage = 1;

    this.fetchingProducts = false;

  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

  refreshList() {
    this.productsPage = 1;

    this.getAllProducts()
  }

  editProduct(data: any) {
    this.selectedProduct = data;

    this.toggleEditModal();
  }

  onCreated() {

  }

  onUpdated() {

  }
}
