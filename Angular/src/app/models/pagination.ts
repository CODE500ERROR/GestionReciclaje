export  class FilterBase {
    pageNumber = 1;
    totalRecords: number;
    pageTotal: number;
    pageSize = 10;
}

export class PagedResult<T> {
    entity: any;
    filters: FilterBase;

    constructor() {
        this.filters = new FilterBase();
    }
}
