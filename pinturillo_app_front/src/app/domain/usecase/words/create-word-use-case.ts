import { Injectable } from "@angular/core";
import { WordGateway } from "../../model/words/gateway/word-gateway";
import { CreateWord } from "../../model/words/create-word";
import { Observable } from "rxjs";
import { Word } from "../../model/words/word";

@Injectable({
  providedIn: 'root'
})
export class CreateWordUseCase {
  constructor(private _wordGateway: WordGateway) { }

  create(word: CreateWord): Observable<Word> | null {
    return this._wordGateway.create(word);
  }
}
