import { Injectable } from '@angular/core';
import { Product } from 'src/model/Product';
import { OrderDetails } from 'src/model/OrderDetails';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts: Product[] = [];
  orderDetails!: OrderDetails;

  constructor() { }

  addOrderToCart(): Observable<Product[]> {
    const productsInCart = of(this.cartProducts);
    return productsInCart;
  }

  getorderDetails() {
    return this.orderDetails;
  }

  addorderDetails(data: any) {
    this.orderDetails = {
      fullName: data.fullName,
      totalAmount: data.totalAmount
    }
    return this.orderDetails;
  }

  clearCart(): void {
    this.cartProducts = [];
   }
}
