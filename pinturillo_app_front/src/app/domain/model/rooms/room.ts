import { Category } from "../categories/category";

export class Room {
  id ?: number;
  name !: string;
  state !: string;
  idCategory !: number;
}
