import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Constant } from '../enum/constant.enum';
import { Category } from '../interfaces/category';
import { ObjectRespone } from '../interfaces/object-respone';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiURL = Constant.apiURL;

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<ObjectRespone<Category>>{ 
    return this.http.get<ObjectRespone<Category>>(`${this.apiURL}/category/all`)
  }

  public addCategory(data: Category): Observable<ObjectRespone<Category>>{ 
    return this.http.post<ObjectRespone<Category>>(`${this.apiURL}/category/add`, data)
  }

}
