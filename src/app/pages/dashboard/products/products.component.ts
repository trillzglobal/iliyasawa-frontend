import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';

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

  fetchingProducts: boolean = false;
  products: Array<any> = [];
  productsStart: number = 0;
  productsStop: number = 0;
  productsPage: number = 1;
  productsLimit: number = 20;
  totalProducts: number = 0;
  searchTerm: string = ""
  type: string = ""

  fetchingData: boolean = false;
  currentUser: any = {};
  userRole: any = "";

  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private productsService: ProductsService,
    private generalService: GeneralService,
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getAllProducts()
    this.getUserData()
  }


  search() {
    this.getAllProducts()
  }

  filterProduct() {
    this.getAllProducts()
  }


  getAllProducts() {

    this.fetchingProducts = true;

    this.productsService.getAllProducts(this.productsPage, this.type, this.searchTerm).subscribe(
      async (res: any) => {
        // console.log(res);
        if (res.status === "success") {
          this.fetchingProducts = false;
          this.products = res.data.data
          this.totalProducts = res.data.total;
          this.productsStart = (this.productsPage) * this.productsLimit;
          this.productsStop = this.productsStart + this.products.length;

        } else {

          this.errorMessage = '' + res.message;
          this.fetchingProducts = false;
          this.totalProducts = 0;
          this.productsStart = 0;
          this.productsStop = 0;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingProducts = false;
        this.totalProducts = 0;
        this.productsStart = 0;
        this.productsStop = 0;
      }
    )

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

    // this.toggleEditModal();
  }

  onCreated() {
    this.toggleAddModal()
    this.getAllProducts()
  }

  onUpdated() {
    this.toggleEditModal()
    this.getAllProducts()
  }

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.getUserData();
    this.userRole = this.currentUser.current_role;
    this.fetchingData = false;
  }
}
