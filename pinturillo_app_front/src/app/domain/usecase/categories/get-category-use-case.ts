import { Injectable } from "@angular/core";
import { CategoryGateway } from "../../model/categories/gateway/caregory-gateway";
import { Observable } from "rxjs";
import { Category } from "../../model/categories/category";

@Injectable({
  providedIn: 'root'
})
export class GetCategoryUseCase {
  constructor(private _categoryGateway: CategoryGateway) {}

  getAll(): Observable<Category[]> | null {
    return this._categoryGateway.getAll();
  }

  findById(_id: number): Observable<Category> | null {
    return this._categoryGateway.findById(_id);
  }
}
