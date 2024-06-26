import { Pipe, PipeTransform } from '@angular/core';
import { dataPhone } from '../interface/phoneNumbers';

@Pipe({
  name: 'search',
  standalone: true,
  pure: false
})
export class SearchPipe implements PipeTransform {
  transform(value: dataPhone[], parentSearchTerm: string): dataPhone[] {
    if (parentSearchTerm === ''|| !value) {
      return value;
    }
    const normalizedParentField = parentSearchTerm.toLowerCase();
    const result = value.filter(info =>
      info.firstName.toLowerCase().includes(normalizedParentField) ||
      info.lastName.toLowerCase().includes(normalizedParentField) ||
      info.phoneNumber.toLowerCase().includes(normalizedParentField)
    );
    return result;
  }
 
}
