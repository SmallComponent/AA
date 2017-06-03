import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flying',
})
export class FlyingPipe implements PipeTransform {
    transform(configs): number {
		console.log('pipe...');
        return configs;
    }
}
