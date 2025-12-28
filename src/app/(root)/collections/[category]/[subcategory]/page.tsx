import { FilterPage } from "@/components/filter/filter-page";
import { capitalizeWords } from "@/lib/capitalize";
import { type PageDynamic } from "@/types";
import { type Metadata } from "next";

export async function generateMetadata({
  params,
}: PageDynamic): Promise<Metadata> {
  const { subcategory } = await params;
  const title = decodeURIComponent(subcategory ?? "");
  const titleCapital = capitalizeWords(title);
  return {
    title: titleCapital,
  };
}

const Page = async (props: PageDynamic) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { subcategory } = params;

  const title = decodeURIComponent(subcategory ?? "");
  return (
    <FilterPage
      params={{ subcategory }}
      searchParams={searchParams}
      title={title}
    />
  );
};

export default Page;
