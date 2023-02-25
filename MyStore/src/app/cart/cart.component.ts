import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/model/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderedProducts: Product[] = [];
  isCartEmpty: boolean = true;
  totalAmount: number | string = '';
  productCount: string[] = ['1', '2', '3', '4', '5'];
  selectedItem: string = '';
  fullName: string = '';
  address: string = '';
  creditCardNumber: string = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.addOrderToCart().subscribe(products => {
      this.orderedProducts = products;
    });
    this.calculateTotal();
    this.checkIfCartIsEmpty();
  }

  selectChange(value: string, product: Product) {
    const index = this.orderedProducts.indexOf(product);
    this.orderedProducts[index] = product;
    this.orderedProducts[index].quantity = value;
    localStorage.setItem('products', JSON.stringify(this.orderedProducts));
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.orderedProducts.reduce((acc, item) => {
      this.totalAmount = parseFloat(
        (acc + item.price * Number(item.quantity)).toFixed(2)
      );
      return this.totalAmount;
    }, 0);
  }

  checkIfCartIsEmpty() {
    if (this.orderedProducts.length > 0) {
      this.isCartEmpty = false;
    } else {
      this.isCartEmpty = true;
    }
  }

  deletedItem(id: number) {
    const products = this.cartService.addOrderToCart();
    products.subscribe(
      () => {this.orderedProducts = this.orderedProducts.filter((product: Product) => product.id !== id)}
    );
    window.localStorage.clear();
    localStorage.setItem('products', JSON.stringify(products));
    this.calculateTotal();
  }

  clearCartBtn(): void {
    this.cartService.clearCart();
    this.orderedProducts = [];
    this.calculateTotal();
    this.checkIfCartIsEmpty();
    alert("Cart Cleared!");
  }

  submitForm() {
    this.cartService.clearCart();
    this.confirmOrder();
    this.router.navigate(['/success']);
  }

  confirmOrder() {
    const data = {
      fullName: this.fullName,
      totalAmount: this.totalAmount
    }
    this.cartService.addorderDetails(data);
  }
}
