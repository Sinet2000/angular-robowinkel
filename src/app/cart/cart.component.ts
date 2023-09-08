import { Component, OnInit } from '@angular/core';
import { IProduct } from "../catalog/models/product.model";
import { CartService } from "./cart.service";
import {ILineItem} from "../catalog/models/line-item.model";

@Component({
  selector: 'bot-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  private cart: ILineItem[] = [];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (cart) => (this.cart = cart),
    });
  }

  get cartItems() {
    return this.cart;
  }

  /**
   * Calculate the total price of items in the shopping cart, accounting for quantities and discounts.
   * @returns The total price as a number, rounded to two decimal places.
   */
  get cartTotal(): number {
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

  removeFromCart(cartItem: ILineItem) {
    this.cartService.remove(cartItem);
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName;
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
}
