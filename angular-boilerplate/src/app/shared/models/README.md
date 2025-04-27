## Models

In this folders we have collect all the model files.

We can generate Angular model using Angular CLI or manually writing code the way we create any object oriented class/interface.

Angular CLI option:

Because a model is a class, to generate it use --type option like this:

`ng generate class test --type=model`

This CLI command will generate empty model (without any properties) with name

test.model.ts

But, we should prefer manual way to generate model. Here is the code:

        export interface Test {
            name: string = 'test';
            age: number = 0;
        }

We can save file with name test.model.ts directly.
