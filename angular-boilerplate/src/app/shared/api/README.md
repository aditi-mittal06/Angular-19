## API Folder

API folder contains all the api related service files.

## API

Most front-end applications need to communicate with a server over the HTTP protocol,to download or upload data and access other back-end services.

Angular provides a client HTTP API for Angular applications, the `HttpClient` service class in `@angular/common/http`.

## File name - [ModuleName]-api.service.ts

## Setup for server communication

Before you can use HttpClient, you need to import the Angular HttpClientModule.

## app/app.component.ts

content_copy
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
selector: 'app-root',
standalone: true,
imports: [
CommonModule,
RouterOutlet,
HttpClientModule
],
templateUrl: './app.component.html',
styleUrl: './app.component.css',
})
export class AppComponent {

}

You can then inject the HttpClient service as a dependency of an application class, as shown in the following ConfigService example.

## app/config/config.service.ts (excerpt)

    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    @Injectable()
    export class ConfigService {
    constructor(private http: HttpClient) { }
    }
