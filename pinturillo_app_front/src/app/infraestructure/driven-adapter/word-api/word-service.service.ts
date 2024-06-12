import { Injectable, signal } from '@angular/core';
import { WordGateway } from '../../../domain/model/words/gateway/word-gateway';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CreateWord } from '../../../domain/model/words/create-word';
import { Word } from '../../../domain/model/words/word';
import { env } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class WordServiceService extends WordGateway {
  constructor(private http: HttpClient) {
    super();
  }

  private destroy$: Subject<void> = new Subject()
  url = signal(`${ env.SERVER_URL }/word`)

  override getAll(): Observable<Word[]> | null {
    try {
      return this.http.get<Word[]>(`${ this.url() }/getAll`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override findById(_id: number): Observable<Word> | null {
    try {
      return this.http.get<Word>(`${ this.url() }/findById/${ _id }`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override create(word: CreateWord): Observable<Word> | null {
    try {
      return this.http.post<Word>(`${ this.url() }/create`, word);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override update(word: Word): Observable<Word> | null {
    try {
      return this.http.put<Word>(`${ this.url() }/update`, word);
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
