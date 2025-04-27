## Services Folder

Service folder contains all the service files

## What Service

A component should use services for tasks that don't involve the view or application logic.

Services are good for tasks such as fetching data from the server, validating user input, or logging directly to the console.

By defining such processing tasks in an injectable service class, you make those tasks available to any component.

You can also make your application more adaptable by injecting different providers of the same kind of service, as appropriate in different circumstances.

## Create the Service

`ng generate service [ServiceName]`

The command generates a skeleton [ServiceName] class in src/app/[ServiceName].service.ts as follows:

        import { Injectable } from '@angular/core';

        @Injectable({
        providedIn: 'root',
        })
        export class [ServiceName] {

        constructor() { }

        }

## @Injectable() services

Dependency injection (DI) is the part of the Angular framework that provides components with access to services and other resources.

Angular provides the ability for you to inject a service into a component to give that component access to the service.

The @Injectable() decorator defines a class as a service in Angular and allows Angular to inject it into a component as a dependency. Likewise, the @Injectable() decorator indicates that a component, class, pipe, or NgModule has a dependency on a service.

Setting the providedIn property of the @Injectable() to "root" make a service a singleton in Angular. A singleton service is a service for which only one instance exists in an application.

We can directly access placeholder of this service in to component.

`constructor(private service: HeroService) { }`
