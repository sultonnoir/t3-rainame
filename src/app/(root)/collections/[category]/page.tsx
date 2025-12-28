import { FilterPage } from "@/components/filter/filter-page";
import { capitalizeWords } from "@/lib/capitalize";
import { formatName } from "@/lib/utils";
import { type PageDynamic } from "@/types";
import { type Metadata } from "next";

export async function generateMetadata({
  params,
}: PageDynamic): Promise<Metadata> {
  const { category } = await params;
  const title = formatName(category ?? "");
  const titleCapital = capitalizeWords(title);
  return {
    title: titleCapital,
  };
}

const Page = async (props: PageDynamic) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { category } = params;

  const title = formatName(category ?? "");
  return (
    <FilterPage
      params={{ category }}
      searchParams={searchParams}
      title={title}
    />
  );
};

export default Page;
