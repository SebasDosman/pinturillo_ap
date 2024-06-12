import { Observable } from "rxjs";
import { Category } from "../category";
import { CreateCategory } from "../create-category";

export abstract class CategoryGateway {
  abstract getAll() : Observable<Category[]> | null;
  abstract findById(_id: number) : Observable<Category> | null;
  abstract create(category: CreateCategory) : Observable<Category> | null;
  abstract update(category: Category) : Observable<Category> | null;
  abstract delete(_id: number) : Observable<any> | null;
}
