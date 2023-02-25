import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/model/Product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  productsList: Product[] = [];
  product!: Product;
  id!: number;
  selectedItem: string = '1';
  productCount: string[] = ['1', '2', '3', '4', '5'];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.productsList = products;
    });

    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });

    this.productService.getProducts().subscribe(() => {
        this.product = this.getProductDetails(this.id);
      });

    this.cartService.addOrderToCart().subscribe(products => {
      this.productsList = products;
    });
  }

  getProductDetails(id: any) {
    return this.productsList.filter((item) => item.id === id)[0];
  }

  selectedChange(value: string) {
    this.selectedItem = value;
  }

  addToCart(product: Product): void {
    const cartProducts: Product[] = this.productsList;
    let productInCart = cartProducts.find((p) => {p.id === product.id});
    if (productInCart) {
      productInCart.quantity = this.selectedItem;
      productInCart ? this.productService.addProduct(cartProducts) : null;
    } else {
      cartProducts.push(Object.assign(product, { quantity: this.selectedItem }));
      this.productService.addProduct(cartProducts);
    }
    this.selectedItem = '1';
    this.router.navigate(['/cart']);
  }

  onSubmit(product: Product): void {
    const message = `${product.name} has been added to your cart.`;
    alert(message);
  }

}
