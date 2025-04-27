## modules folder

Module folder contains all the feature modules files.

## Feature modules

Feature modules are NgModules for the purpose of organizing code.

## Feature modules vs. root modules

A feature module is an organizational best practice, as opposed to a concept of the core Angular API.

A feature module delivers a cohesive set of functionality focused on a specific application need such as a user workflow, routing, or forms.

While you can do everything within the root module, feature modules help you partition the application into focused areas.

A feature module collaborates with the root module and with other modules through the services it provides and the components, directives, and pipes that it shares.

## How to make a feature module

We can created with the Angular CLI, create a feature module using the CLI by entering the following command in the root project directory.

`ng generate module CustomerDashboard` or `ng generate component customer-dashboard/CustomerDashboard`

## Importing modules

(import your module file in app.component.ts )

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, RouterOutlet, CustomerDashboardModule],
templateUrl: './app.component.html',
styleUrl: './app.component.css',
})
export class AppComponent {
title = 'angular18';
}
