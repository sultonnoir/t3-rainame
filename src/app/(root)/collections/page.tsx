import { FilterPage } from "@/components/filter/filter-page";
import { capitalizeWords } from "@/lib/capitalize";
import type { PageDynamic } from "@/types";
import { type Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: PageDynamic): Promise<Metadata> {
  const { search } = await searchParams;
  const title = search ? decodeURIComponent(search) : "All Products";
  const titleCapital = capitalizeWords(title);
  return {
    title: titleCapital,
  };
}

const Page = async (props: PageDynamic) => {
  const searchParams = await props.searchParams;

  const title = searchParams.search
    ? decodeURIComponent(searchParams.search)
    : "All Products";
  return <FilterPage searchParams={searchParams} title={title} />;
};

export default Page;
