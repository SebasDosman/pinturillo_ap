import { Injectable } from "@angular/core";
import { WordCategoryGateway } from "../../model/words-categories/gateway/word-category-gateway";
import { Observable } from "rxjs";
import { WordCategory } from "../../model/words-categories/word-category";

@Injectable({
  providedIn: 'root'
})
export class GetWordCategoryUseCase {
  constructor(private _wordCategoryGateway: WordCategoryGateway) { }

  getAll(): Observable<WordCategory[]> | null {
    return this._wordCategoryGateway.getAll();
  }

  findById(_id: number): Observable<WordCategory> | null {
    return this._wordCategoryGateway.findById(_id);
  }
}
