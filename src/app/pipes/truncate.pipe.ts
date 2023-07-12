import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value.length > 250){
      return value.slice(0,249) + '...'
    }
    return value;
  }

}
