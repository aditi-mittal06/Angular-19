## Components folder

Component folder contains all the common components.

## Creating component:

It's advisable to use angular CLI to create a component using angular CLI and it generates standalone components by default:

`ng generate component componentName` OR `ng g c components/component-demo1`

It generates 4 new files: `.css-styles, .html-markup, .spec.ts-test, .ts-class`

# Common components

A common component pattern in Angular is sharing data between a parent component and one or more child components. You can implement this pattern by using the @[Input]() and @[Output]() directives.

We can call this component by using their selector names.

<app-data-list (calCount)="calCount($event)" [data]="data1" [showCount]="true"></app-data-list>

# .ts file

    import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

    @Component({
    selector: 'app-data-list',
    standalone: true,
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.css']
    })
    export class DataListComponent implements OnInit {

    @Input() data : [];
    @Input() showCount = false;
    @Output() calCount = new EventEmitter<Number>();

    constructor() { }

    ngOnInit(): void {
        this.calCount.emit(this.data.length);
    }

    }
