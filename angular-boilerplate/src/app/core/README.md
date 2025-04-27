## core folder

This folder contains all the core related folders and files.

## what is core

A core folder in an Angular project typically contains files and folders that are essential to the application's core functionality, such as authentication, error handling, and routing.

## Under app/core/auth, we can create auth-service.ts and auth-guard.ts files

[Components] – It will contain the components which are common throughout the application like Header, Navbar and Footer.

[Guards] – Guards are used to protect routes by preventing unauthorized access. They can also be used to control access to specific functionality within the application. The core folder typically contains guards that are used to restrict access to certain routes or features within the application.

[Interceptors] – They help to intercept or modify outgoing requests or incoming responses. Mainly two types of interceptors are being used – the HttpTokenInterceptor and the HttpErrorInterceptor.

[Layouts] – A single angular application can consist of various different views that are common for different parts of the application. We call them layouts. Not only they are very handy to add universal loaders, toast messages, the confirmation dialog boxes but also helps to get initial data from backend to populate the app i.e. it works as an entry component.

## Generate the core module in `app` directory

`ng g m core`
