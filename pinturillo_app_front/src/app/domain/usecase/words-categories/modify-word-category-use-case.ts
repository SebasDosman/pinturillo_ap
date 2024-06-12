import { Injectable } from "@angular/core";
import { WordCategoryGateway } from "../../model/words-categories/gateway/word-category-gateway";
import { WordCategory } from "../../model/words-categories/word-category";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModifyWordCategoryUseCase {
  constructor(private _wordCategoryGateway: WordCategoryGateway) { }

  update(wordCategory: WordCategory): Observable<WordCategory> | null {
    return this._wordCategoryGateway.update(wordCategory);
  }

  delete(_id: number): Observable<any> | null {
    return this._wordCategoryGateway.delete(_id);
  }
}
