import { PageableModel, PageData, Paginated } from "@/types/pagination";
import { FindAndCountOptions, Model as SeqModel } from "sequelize/types";

/**
 *
 * @param model
 * @param options
 * @param pageData containing limit and number of pages. If the value of pageData.limit is -1 this function returns all rows that match
 * @returns Promise<Paginated>
 */
export async function paginate<M extends SeqModel>(
  model: PageableModel<M>,
  options: FindAndCountOptions<M["_attributes"]>,
  pageData: PageData
): Promise<Paginated<M>> {
  const { page } = pageData;
  const normalized =
    pageData.limit == -1
      ? ({} as { limit: number; offset: number })
      : normalizePageData(pageData);
  const { rows, count } = await model.findAndCountAll({
    ...normalized,
    ...options,
  });
  const total = normalized.limit ? totalPages(count, normalized.limit) : count;
  return {
    data: rows as any,
    ...pageMeta(page, total),
  };
}

function pageMeta(page: number, total: number) {
  const nextPage = page < total ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;
  return {
    nextPage,
    previousPage,
    currentPage: page,
    numberOfPages: total,
  };
}

function totalPages(count: number, limit: number) {
  return Math.ceil(count / limit);
}

function normalizePageData({ limit, page }: PageData) {
  page = page - 1 < 0 ? 1 : page;
  const normalLimit = limit || 10;
  return {
    limit: normalLimit,
    offset: (page - 1) * normalLimit,
  };
}
