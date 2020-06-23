import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialChar',
})
export class RemoveSpecialCharPipe implements PipeTransform {
  transform(value: any, character: any) {
    return value.replace(character, '');
  }
}
