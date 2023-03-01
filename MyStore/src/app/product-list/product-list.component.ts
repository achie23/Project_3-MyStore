import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList: Product[] = [];
  message: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.productsList = data;
    });
  }

  alertMessage(message: string) {
    this.message = message;
    alert(this.message);
  }
}
