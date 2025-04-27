Models are created using classes or interfaces to define the structure of data. These models are used to represent data in various components and services within an Angular application.
We can create a model using angular CLI or manually in typescript.

- ng generate interface Employee --type=model or
- ng g interface Employee --type=model
  This creates Employee.model.ts typescript empty file in src/model.

# Interface in the model defines what type of data holds but is not able to create an instance of an interface

# model file name would be singular like report.model.ts, client.model.ts

For example:
export interface Client {
clientId: string;
clientName: string;
description: string;
edit: string;
}
