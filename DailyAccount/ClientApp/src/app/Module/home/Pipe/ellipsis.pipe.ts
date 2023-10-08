import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxChars: number = 43): string {
    if (value.length > maxChars) {
      return value.substring(0, maxChars) + '...';
    }
    return value;
  }

}
