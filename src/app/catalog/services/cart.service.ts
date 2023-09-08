import { Injectable } from '@angular/core';
import {IProduct} from "../models/product.model";
import {ILineItem} from "../models/line-item.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: ILineItem[] = [];
  constructor(private http: HttpClient) { }

  findLineItem(product: IProduct) {
    return this.cart.find((li) => li.product.id === product.id);
  }

  add(product: IProduct) {
    let lineItem = this.findLineItem(product);
    if (lineItem !== undefined) {
      lineItem.qty++;
    } else {
      lineItem = { product, qty: 1 };
      this.cart.push(lineItem);
    }

    this.http.post('/api/cart', this.cart).subscribe(() => {
      console.log(`Added ${product.name} to cart!`);
    })
  }
}
