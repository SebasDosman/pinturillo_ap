import { Injectable } from "@angular/core";
import { WordGateway } from "../../model/words/gateway/word-gateway";
import { Word } from "../../model/words/word";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModifyWordUseCase {
  constructor(private _wordGateway: WordGateway) { }

  update(word: Word): Observable<Word> | null {
    return this._wordGateway.update(word);
  }

  delete(_id: number): Observable<any> | null {
    return this._wordGateway.delete(_id);
  }
}
