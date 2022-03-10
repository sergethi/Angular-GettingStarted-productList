import { ValueTransformer } from "@angular/compiler/src/util";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    // selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    imageWidth = 50;
    imageMargin = 8;
    showImage = false;
    pageTitle: string = 'Product List';
    errorMessage: string= '';
    sub: Subscription | undefined

    private _listFilter: string = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      console.log('In setter:', value);
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];
    
    products: IProduct[] = [];

    constructor(private productService: ProductService){}

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) =>
          product.productName.toLowerCase().includes(filterBy));
    }

    toggleImage(): void{
          this.showImage = !this.showImage
    }

    ngOnInit(): void {
      this.productService.getProducts().subscribe({
        next: products => {
          this.products = products,
          this.filteredProducts = this.products
        },
        error: err => this.errorMessage = err
      })
      
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    onRatingClicked(message: string):void {
        this.pageTitle = 'Product List:' + message;
    }

}