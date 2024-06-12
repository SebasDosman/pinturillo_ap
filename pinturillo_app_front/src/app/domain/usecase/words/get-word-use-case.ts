import { Injectable } from "@angular/core";
import { WordGateway } from "../../model/words/gateway/word-gateway";
import { Observable } from "rxjs";
import { Word } from "../../model/words/word";

@Injectable({
  providedIn: 'root'
})
export class GetWordUseCase {
  constructor(private _wordGateway: WordGateway) { }

  getAll(): Observable<Word[]> | null {
    return this._wordGateway.getAll();
  }

  findById(_id: number): Observable<Word> | null {
    return this._wordGateway.findById(_id);
  }
}
