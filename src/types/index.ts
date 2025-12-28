type Params = Promise<Record<string, string>>;
type SearchParams = Promise<Record<string, string | undefined>>;

export type PageDynamic = {
  searchParams: SearchParams;
  params: Params;
};
