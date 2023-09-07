import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from "../catalog/product.model";

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

  getImageUrl(product: IProduct | null): string {
    return '/assets/images/robot-parts/' + product?.imageName;
  }

  getProductPriceWithDiscount(product: IProduct | null): number | null {
    return product
      ? (product.price * (1 - product.discount))
      : null;
  }

  getPriceDiscountedClasses(product: IProduct | null) {
    return this.isProductDiscounted(product)
      ? ['strike-through']
      : [];
  }

  isProductDiscounted(product: IProduct | null): boolean {
    return product !== null && product !== undefined && product.discount > 0;
  }

  buyButtonClicked(product: IProduct) {
    this.buy.emit();
  }
}
