import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(list: Product[], searchValue: string): Product[] | null {
    
    return list.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
