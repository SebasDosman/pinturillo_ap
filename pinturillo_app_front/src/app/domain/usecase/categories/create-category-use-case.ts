import { Injectable } from "@angular/core";
import { CategoryGateway } from "../../model/categories/gateway/caregory-gateway";
import { CreateCategory } from "../../model/categories/create-category";
import { Observable } from "rxjs";
import { Category } from "../../model/categories/category";


@Injectable({
  providedIn: 'root'
})
export class CreateCategoryUseCase {
  constructor(private _categoryGateway: CategoryGateway) {}

  create(category: CreateCategory): Observable<Category> | null {
    return this._categoryGateway.create(category);
  }
}
