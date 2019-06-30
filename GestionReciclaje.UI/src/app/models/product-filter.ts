import { FilterBase } from './pagination';

export  class ProductFilter extends FilterBase {
    name = '';
    pageNumber = 1;
    pageSize = 10;
}
