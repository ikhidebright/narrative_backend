import { FindAndCountOptions, Model } from "sequelize/types";

export interface PageableModel<M> {
  findAndCountAll<M extends Model>(
    options?: FindAndCountOptions<M["_attributes"]>
  ): Promise<{ rows: M[]; count: number }>;
}

export interface PageData {
  page?: number;
  limit?: number;
}

export interface Paginated<T> {
  numberOfPages: number;
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  data: T[];
}
