import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeparationService {
  baseApiUrl = environment.apiUrl + 'separation/';

  constructor(private http: HttpClient) {}

  getAll(filters: SeparationFilter): Observable<PagedResult<any[]>> {
    let params = new HttpParams();
    const paginatedResult: PagedResult<any[]> = new PagedResult<any[]>();
    params = params.append(
      'pageNumber',
      filters.pageNumber != null ? filters.pageNumber.toString() : '1'
    );

    params = params.append(
      'pageSize',
      filters.pageSize != null ? filters.pageSize.toString() : null
    );
    params = params.append('name', filters.name);

    return this.http.get(this.baseApiUrl, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.entity = response.body;
        return paginatedResult;
      })
    );
  }

  getById(id): Observable<Separation> {
    return this.http.get<Separation>(this.baseApiUrl + id);
  }

  update(plant: Separation) {
    return this.http.put(this.baseApiUrl, plant);
  }

  delete(id) {
    return this.http.delete(this.baseApiUrl + id);
  }

  create(separation: Separation) {
    return this.http.post(this.baseApiUrl, separation);
  }
}
