import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContacts'
})
export class FilterContactsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let retval;
    if (!args) {
      retval = value;
      return retval;
    }

    args = args.toLowerCase().trim();

    retval =  value.filter(element => {
      return element.firstName.toLowerCase().includes(args) ||
        element.lastName.toLowerCase().includes(args) ||
        element.email.toLowerCase().includes(args);
    });
    console.log(retval);

    return retval;
  }



}
