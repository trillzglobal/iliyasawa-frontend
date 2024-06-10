import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  pages: number = 0;
  pagesToShow: Array<number> = [1, 2, 3, 4, 5];
  @Input() totalItems: number = 0;
  @Input() pageSize: any = 25;
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter();
  @Input() currentPage: number = 1;
  @Output() currentPageChange: EventEmitter<number> = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
    this.pages = Math.ceil(this.totalItems / this.pageSize );
    if(this.pages < 5) {
      this.pagesToShow = [];
      for (let index = 0; index < this.pages; index++) {
        this.pagesToShow.push(index + 1);
      }
    }
    else {
      if(this.currentPage > this.pagesToShow[this.pagesToShow.length - 1]) {
        this.pagesToShow = [this.currentPage-4, this.currentPage-3, this.currentPage-2, this.currentPage-1, this.currentPage]
      }
    }
    
  }

  goBack() {
    if(this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.gotToPage(this.currentPage);
    }
  }

  goForward() {
    if(this.currentPage < this.pages) {
      this.currentPage =this.currentPage + 1;
      this.gotToPage(this.currentPage);
    }
  }

  gotToPage(n:number) {
    this.currentPage = n;
    if(this.currentPage > this.pagesToShow[this.pagesToShow.length - 1]) {
      this.pagesToShow = [this.currentPage-4, this.currentPage-3, this.currentPage-2, this.currentPage-1, this.currentPage]
    }
    else if(this.currentPage < this.pagesToShow[0]) {
      this.pagesToShow = [this.currentPage, this.currentPage+1, this.currentPage+2, this.currentPage+3, this.currentPage+4]
    }
    this.currentPageChange.emit(this.currentPage);
  }

  changePageSize() {
    this.resetPages();
    this.pageSizeChange.emit(parseInt(this.pageSize));
  }

  resetPages() {
    this.pages = Math.ceil(this.totalItems / this.pageSize );
    if(this.pages < 5) {
      this.pagesToShow = [];
      for (let index = 0; index < this.pages; index++) {
        this.pagesToShow.push(index + 1);
      }
    }
  }

  calculatePages() {
    
  }
}
