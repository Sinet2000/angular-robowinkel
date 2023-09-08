# NnRobotwinkel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Directives and Pipes

Angular provides powerful tools called **directives** and **pipes**:

- **Directives** are instructions in the DOM that tell Angular how to transform and manipulate the DOM elements and their behavior. Angular provides structural and attribute directives like `ngIf`, `ngFor`, `ngClass`, and more. These directives help you create dynamic views and control element visibility, styling, and behavior.

- **Pipes** are used for transforming and formatting data in Angular templates. You can use built-in pipes like `DatePipe`, `UpperCasePipe`, `CurrencyPipe`, and others to format and manipulate data before displaying it. You can also create custom pipes to meet specific formatting or transformation requirements.

## Directives in Angular

Angular provides powerful tools called **directives** that allow you to manipulate and control the behavior and appearance of DOM elements within your application's templates.

### Structural Directives

Angular offers structural directives that conditionally modify the structure of the DOM. Here are a few examples:

- **ngIf**: Conditionally renders or removes elements based on a given condition.

```angular2html
<div *ngIf="isLoggedIn">Welcome, {{ username }}</div>
```
- **ngIf**: Iterates over a list and generates multiple instances of an element or component.
```angular2html
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>
```
- **ngSwitch**: Conditionally displays content based on the matching case expression.
```angular2html
<div [ngSwitch]="status">
  <div *ngSwitchCase="'active'">User is active</div>
  <div *ngSwitchCase="'inactive'">User is inactive</div>
  <div *ngSwitchDefault>User status is unknown</div>
</div>
```
- **ngSubmit**: Used in forms to capture the form submission event and trigger a function in the component when the form is submitted.
```angular2html
<form (ngSubmit)="onFormSubmit()">
  <!-- form inputs -->
  <button type="submit">Submit</button>
</form>
```
- **ngTemplateOutlet** Allows you to dynamically render templates based on conditions.
```angular2html
<ng-container *ngTemplateOutlet="isLoading ? loadingTemplate : contentTemplate"></ng-container>
```

### Attribute Directives
Angular also provides attribute directives that modify the appearance or behavior of DOM elements. Here's an example:

- **ngClass**: Dynamically adds or removes CSS classes to/from elements based on conditions.
```angular2html
<div [ngClass]="{ 'highlight': isHighlighted, 'error': hasError }">Dynamic Styling</div>
```

### Property Binding with [ ]

Property binding, denoted by square brackets `[ ]`, allows you to set the value of a DOM element's property based on a component's property. It binds a component property to an element property.

Example of property binding:

```angular2html
<img [src]="imageUrl">
```

### Event Binding with ( )
Event binding, denoted by parentheses ( ), allows you to listen for and respond to DOM events, such as clicks, key presses, and mouse movements. It binds a component's method to an element's event.

Example of event binding:
```angular2html
<button (click)="onButtonClick()">Click me</button>
```

### Two-Way Binding with [( )]
Two-way binding, denoted by square brackets and parentheses [( )], is a combination of property and event binding. It allows data synchronization between a form input element and a component property.

Example of two-way binding using ngModel:
```angular2html
<input [(ngModel)]="username">
```
---
## Pipes in Angular

Angular **pipes** are used for transforming and formatting data in templates. They allow you to modify the appearance of data before displaying it.

### Built-in Pipes

Angular provides several built-in pipes:

- **DatePipe**: Formats dates.
- **UpperCasePipe** and **LowerCasePipe**: Converts text to uppercase or lowercase.
- **CurrencyPipe**: Formats numbers as currency.
- **DecimalPipe**: Formats numbers as decimals.
- **PercentPipe**: Formats numbers as percentages.
- **JsonPipe**: Converts JavaScript objects to JSON strings.
- **SlicePipe**: Returns a slice of an array.

Here are some examples of using built-in pipes:

```html
<p>{{ currentDate | date: 'dd/MM/yyyy' }}</p>
<p>{{ textToTransform | uppercase }}</p>
<p>{{ amount | currency: 'USD':true }}</p>
<p>{{ decimalNumber | number: '2.2-2' }}</p>
<p>{{ percentage | percent }}</p>
<p>{{ complexObject | json }}</p>
<p>{{ arrayData | slice:0:5 }}</p>
```

### Creating Custom Pipes
You can also create custom pipes to meet specific formatting or transformation requirements. To create a custom pipe, implement the PipeTransform interface and define your transformation logic.

Here's an example of creating a custom pipe to truncate text:
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }
    return value;
  }
}
```
You can use this custom pipe in your templates:
```angular2html
<p>{{ longText | truncate: 50 }}</p>
```

### Async Pipe
The async pipe is a special pipe in Angular used for handling asynchronous operations. It unwraps the value from an Observable or Promise and updates the view when the value changes.

_Example with the async pipe_
```angular2html
<p>{{ asyncData$ | async }}</p>
```

### Chaining Pipes
You can chain multiple pipes together to perform complex transformations. Pipes are executed from left to right.

_Example of chaining pipes:_
```angular2html
<p>{{ rawValue | transform1 | transform2 | transform3 }}</p>
```

----
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
