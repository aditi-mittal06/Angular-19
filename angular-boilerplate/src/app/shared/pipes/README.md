## Pipes

In this folder we have collection of custom pipe files.

Pipes are an easy way to format data for rendering purposes.

`{{ person.birthDate | date: ‘M/dd/Y’ }}` - in-built Angular pipe

# Creating our own pipe

We can our create our own pipes that as per our internal requirement.

`ng g pipe samplePipe`

It automatically adds the pipe component

samplePipe.pipe.ts

........................................................
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name: 'samplePipe',
standalone: true
})
export class SamplePipePipe implements PipeTransform {

transform(value: unknown, ...args: unknown[]): unknown {
return null;
}

}
...................................................
