import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

import {ILineItem} from "../catalog/models/line-item.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject<ILineItem[]> = new BehaviorSubject<ILineItem[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<ILineItem[]>('/api/cart').subscribe({
      next: (cart) => this.cart.next(cart),
    });
  }

  getCart(): Observable<ILineItem[]> {
    return this.cart.asObservable();
  }

  add(cartItem: ILineItem) {
    const newCart = [...this.cart.getValue(), cartItem];
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('added ' + cartItem.product.name + ' to cart!');
    });
  }

  remove(product: ILineItem) {
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('removed ' + product.product.name + ' from cart!');
    });
  }
}
