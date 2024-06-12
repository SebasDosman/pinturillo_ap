import { Observable } from "rxjs";
import { Word } from "../word";
import { CreateWord } from "../create-word";

export abstract class WordGateway {
  abstract getAll() : Observable<Word[]> | null;
  abstract findById(_id: number) : Observable<Word> | null;
  abstract create(word: CreateWord) : Observable<Word> | null;
  abstract update(word: Word) : Observable<Word> | null;
  abstract delete(_id: number) : Observable<any> | null;
}
