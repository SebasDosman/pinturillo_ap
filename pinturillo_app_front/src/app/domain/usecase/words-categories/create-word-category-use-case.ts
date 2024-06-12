import { Injectable } from "@angular/core";
import { WordCategoryGateway } from "../../model/words-categories/gateway/word-category-gateway";
import { CreateWordCategory } from '../../model/words-categories/create-word-category';
import { Observable } from "rxjs";
import { WordCategory } from "../../model/words-categories/word-category";

@Injectable({
  providedIn: 'root'
})
export class CreateWordCategoryUseCase {
  constructor(private _wordCategoryGateway: WordCategoryGateway) { }

  create(wordCategory: CreateWordCategory): Observable<WordCategory> | null {
    return this._wordCategoryGateway.create(wordCategory);
  }
}
