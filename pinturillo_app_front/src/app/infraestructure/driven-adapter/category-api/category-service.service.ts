import { Injectable, signal } from '@angular/core';
import { CategoryGateway } from '../../../domain/model/categories/gateway/caregory-gateway';
import { Observable, Subject } from 'rxjs';
import { Category } from '../../../domain/model/categories/category';
import { CreateCategory } from '../../../domain/model/categories/create-category';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService extends CategoryGateway {
  constructor(private http: HttpClient) {
    super();
  }

  private destroy$: Subject<void> = new Subject()
  url = signal(`${ env.SERVER_URL }/category`)

  override getAll(): Observable<Category[]> | null {
    try {
      return this.http.get<Category[]>(`${ this.url() }/getAll`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override findById(_id: number): Observable<Category> | null {
    try {
      return this.http.get<Category>(`${ this.url() }/findById/${ _id }`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override create(category: CreateCategory): Observable<Category> | null {
    try {
      return this.http.post<Category>(`${ this.url() }/create`, category);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override update(category: Category): Observable<Category> | null {
    try {
      return this.http.put<Category>(`${ this.url() }/update`, category);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override delete(_id: number): Observable<any> | null {
    try {
      return this.http.delete<any>(`${ this.url() }/delete/${ _id }`);
    } catch (error) {
      console.error(error);
      return null;
    } 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
