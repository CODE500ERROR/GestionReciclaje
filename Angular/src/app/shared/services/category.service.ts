import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CategoryFilter } from '../../models/categoryFilter';
import { PagedResult } from '../../models/pagination';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApiUrl = environment.apiUrl + 'category/';

  constructor(private http: HttpClient) {}


  getAll(filters: CategoryFilter): Observable<PagedResult<any[]>> {
    let params = new HttpParams();
    const paginatedResult: PagedResult<any[]> = new PagedResult<any[]>();
    params = params.append('pageNumber', filters.pageNumber != null ? filters.pageNumber .toString() :  null );

    params = params.append('pageSize',  filters.pageSize != null ? filters.pageSize .toString() :  null);
    params = params.append('name', filters.name);

    return this.http.get(this.baseApiUrl , { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.entity = response.body['list'];
        paginatedResult.filters.totalRecords = response.body['totalRecords'];
        return paginatedResult;
      }));
  }

  getById(id): Observable<Category> {
    return this.http.get<Category>(this.baseApiUrl + id);
  }

  getAllParent(): Observable<Category> {
    return this.http.get<Category>(this.baseApiUrl + 'GetAllParent');
  }

  getByParent(parentId: string) : Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'GetCategoryByParent/' + parentId);
  }

  update(category: Category) {
    return this.http.put(this.baseApiUrl, category);
  }

  delete(id) {
    return this.http.delete(this.baseApiUrl + id);
  }

  create(category: Category) {
    return this.http.post(this.baseApiUrl, category);
  }
}
