import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/model/Product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem!: Product;
  @Output() messageData: EventEmitter<string> = new EventEmitter();
  selectedItem: string = '1';
  productCount: string[] = ['1', '2', '3', '4', '5'];
  allProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.addOrderToCart().subscribe(products => {
      this.allProducts = products;
    });
  }

  selectedChange(value: string) {
    this.selectedItem = value;
  }

  addToCart(product: Product): void {
    const cartProducts: Product[] = this.allProducts;
    let productInCart = cartProducts.find((p) => {p.id === product.id});
    if (productInCart) {
      productInCart.quantity = this.selectedItem;
      productInCart ? this.productService.addProduct(cartProducts) : null;
    } else {
      cartProducts.push(Object.assign(product, { quantity: this.selectedItem }));
      this.productService.addProduct(cartProducts);
    }
    this.selectedItem = '1';
  }

  onSubmit(product: Product): void {
    const message = `${product.name} has been added to your cart.`;
    this.messageData.emit(message);
  }

}
