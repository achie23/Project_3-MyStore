import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderDetails } from 'src/model/OrderDetails';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  orderDetails!: OrderDetails;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.orderDetails = this.cartService.getorderDetails();
  }
}
