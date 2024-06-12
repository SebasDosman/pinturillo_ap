import { Injectable, signal } from '@angular/core';
import { WordCategoryGateway } from '../../../domain/model/words-categories/gateway/word-category-gateway';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CreateWordCategory } from '../../../domain/model/words-categories/create-word-category';
import { WordCategory } from '../../../domain/model/words-categories/word-category';
import { env } from '../../../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class WordCategoryServiceService extends WordCategoryGateway {
  constructor(private http: HttpClient) {
    super();
  }

  private destroy$: Subject<void> = new Subject()
  url = signal(`${ env.SERVER_URL }/word-category`)

  override getAll(): Observable<WordCategory[]> | null {
    try {
      return this.http.get<WordCategory[]>(`${ this.url() }/getAll`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override findById(_id: number): Observable<WordCategory> | null {
    try {
      return this.http.get<WordCategory>(`${ this.url() }/findById/${ _id }`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override create(wordCategory: CreateWordCategory): Observable<WordCategory> | null {
    try {
      return this.http.post<WordCategory>(`${ this.url() }/create`, wordCategory);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override update(wordCategory: WordCategory): Observable<WordCategory> | null {
    try {
      return this.http.put<WordCategory>(`${ this.url() }/update`, wordCategory);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override delete(_id: number): Observable<any> | null {
    try {
      return this.http.delete(`${ this.url() }/delete/${ _id }`);
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
