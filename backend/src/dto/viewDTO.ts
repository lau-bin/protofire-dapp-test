import { BusinessError } from "./errors";
import { TableDTO } from "./tableDTO";

export interface ViewDTO{
  table: TableDTO | null,
  error: BusinessError[] | null
}