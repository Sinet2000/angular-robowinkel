import {Component, inject} from '@angular/core';
import {IProduct} from "./models/product.model";
import {CartService} from "./services/cart.service";
import {ProductService} from "./services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {

  // private cartSvc: CartService = inject(CartService);

  products: IProduct[] = [];
  selectedCategory: string | null = null;

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    });

    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['filter'] ?? null;
    })
    // this.route.params.subscribe((params) => {
    //   this.selectedCategory = params['filter'] ?? null;
    // })
    // this.selectedCategory = this.route.snapshot.params['filter'];
  }

  get filteredProducts(): IProduct[] {
    if (this.products === null) {
      return [];
    }

    return this.selectedCategory
      ? this.products.filter(product => product && product.category === this.selectedCategory)
      : this.products;
  }

  // this.products.map(product => product.category):
  // This part of the code uses the map method to transform the products array into a new array containing only the category property of each product.
  // So, it creates an array of category strings like ['Heads', 'Bases', 'Arms', ...].
  //
  // new Set(...):
  // The Set is a built-in JavaScript data structure that only stores unique values.
  // By wrapping the result of the map operation in a Set, you ensure that it contains only unique category values. This eliminates any duplicate categories.
  //
  // [...new Set(...)]:
  // The spread operator ([...]) is used to convert the Set back into an array.
  // This step is necessary because the Set object itself is not an array, but an iterable. By spreading it into an array, you get an array of unique categories.
  uniqueCategories(): string[] | null {
    if (this.products === null) {
      return null;
    }

    const categories = this.products
      .filter(product => product !== null && product !== undefined) // Filter out null and undefined
      .map(product => product!.category); // Use the non-null assertion operator (!) here

    return [...new Set(categories)];
  }

  addToCard(product: IProduct) {
    this.cartSvc.add(product)
    this.router.navigate(['/cart']);
  }
}
