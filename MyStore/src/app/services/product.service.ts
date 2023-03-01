import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  myStorage = window.localStorage;
  private apiUrl: string = '../../assets/data.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.get<Product>(url);
  }

  addProduct(product: Product[]): void {
    this.myStorage.setItem('products', JSON.stringify(product));
  }
}
