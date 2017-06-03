import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flying',
})
export class FlyingPipe implements PipeTransform {
    transform(configs: any[]): any[] {
		console.log('pipe...');
        return configs;
    }
}
