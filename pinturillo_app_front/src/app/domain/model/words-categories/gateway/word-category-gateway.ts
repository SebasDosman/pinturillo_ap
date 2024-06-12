import { Observable } from "rxjs";
import { WordCategory } from "../word-category";
import { CreateWordCategory } from "../create-word-category";

export abstract class WordCategoryGateway {
  abstract getAll() : Observable<WordCategory[]> | null;
  abstract findById(_id: number) : Observable<WordCategory> | null;
  abstract create(wordCategory: CreateWordCategory) : Observable<WordCategory> | null;
  abstract update(wordCategory: WordCategory) : Observable<WordCategory> | null;
  abstract delete(_id: number) : Observable<any> | null;
}
