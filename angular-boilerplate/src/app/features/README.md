# features folder

under this folder, components,feature module,feature routing will be create.

## Components

The core/key idea behind Angular is to build application using reusable parts/chunks i.e. components.

Components are main building blocks of UI and an/any angular application. (Show graphical representation).

Angular Application Root (bootstrapped) component is AppComponent (app.component.ts)

## A component is self contained, reusable piece of UI made up of 3 important parts:

Template - View, HTML code (User Interface for application also known as view).

Class - Business logic/Application logic for the view, TypeScript/JavaScript code, (Data, Methods & properties).

Decorator/Metadata - Metadata, a @function which provide more information for angular class.
example: app.component.ts:
Syntax & Example: app.component.ts

@Component({
selector: 'app-root',
imports: [
CommonModule,
RouterOutlet,
],
templateUrl: './app.component.html',
styleUrl: './app.component.css',
})

## Creating component:

It's advisable to use angular CLI to create a component using angular CLI , it will create the standalone component automatically.

`ng generate component componentName` OR `ng g c components/component-demo1`

It generates 4 new files: `.css-styles, .html-markup, .spec.ts-test, .ts-class`

Also, if you want to use any component in another component ,a component must be a member of/belongs to imports array in order for it to be usable by another component

for example: let say Example1Component and ExampleComponent2 are two sibling components and you want to use the Example2Component in Example1Component

example2.component.ts

import { Component } from '@angular/core';
import { Example1Component} from '../example1/example1.component';

@Component({
selector: 'app-example2',
imports: [Example1Component],
templateUrl: './example2.component.html',
styleUrl: './example2.component.css',
})
export class Example2Component {}

-- no need to put it in the imports array of app.component.ts like we do previously in app.module.ts file

## Lazy-loading feature modules

Sometimes in app development, you end up with a lot of components that you need to reference in your app, but some of those don't need to be loaded right away for various reasons.

In that case, we can load some of those resources later with deferrable views.

Wrap the comment component with a @defer block to defer load it.By default @defer will load the comments component when the browser is idle.

@defer {
<comments />
}

Add a @placeholder block to the @defer block. The @placeholder block is where you put html that will show before the deferred loading starts. The content in @placeholder blocks is eagerly loaded.

@defer {
<comments />
} @placeholder {

  <p>Future comments</p>
}
