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

  /**
   * Calculate the total price of items in the shopping cart, accounting for quantities and discounts.
   * @returns The total price as a number, rounded to two decimal places.
   */
  getTotalPrice(): number {
    // Use the reduce method to iterate through the cart and accumulate the total price.
    const totalPrice = this.cart.reduce<number>((prev, cartItem) => {
      // Calculate the item price after applying the discount.
      const itemPrice = this.calculateItemPrice(cartItem);

      // Add the item price to the accumulator.
      return prev + itemPrice;
    }, 0);

    // Round the total price to two decimal places.
    return this.roundToTwoDecimalPlaces(totalPrice);
  }

  /**
   * Calculate the price of a single item after applying the discount.
   * @param cartItem The item in the cart.
   * @returns The item price as a number.
   */
  private calculateItemPrice(cartItem: ILineItem): number {
    const { qty, product } = cartItem;

    // Calculate the item price after applying the discount.
    const discountedPrice = product.price * (1 - product.discount);

    // Multiply by the quantity to get the total item price.
    return qty * discountedPrice;
  }

  /**
   * Round a number to two decimal places.
   * @param num The number to round.
   * @returns The rounded number.
   */
  private roundToTwoDecimalPlaces(num: number): number {
    return Math.round(num * 100) / 100;
  }

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
      console.log(`Total Price: $ ${this.getTotalPrice()}`);
    })
  }
}
