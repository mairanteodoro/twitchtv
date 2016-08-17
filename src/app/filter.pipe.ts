import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // if length of array is zero do nothing
    // (just return the same array)
    if (args[0] === undefined) {
      return value;
    }
    // otherwise, apply filter
    let resultArray = value.filter(item => item[0].toLowerCase().indexOf(args) !== -1);
    return resultArray.length > 0? resultArray: [];
  }

}
