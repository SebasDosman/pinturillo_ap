import { Injectable } from "@angular/core";
import { CategoryGateway } from "../../model/categories/gateway/caregory-gateway";
import { Category } from "../../model/categories/category";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModifyCategoryUseCase {
  constructor(private _categoryGateway: CategoryGateway) { }

  update(category: Category): Observable<Category> | null {
    return this._categoryGateway.update(category);
  }

  delete(_id: number): Observable<any> | null {
    return this._categoryGateway.delete(_id);
  }
}
