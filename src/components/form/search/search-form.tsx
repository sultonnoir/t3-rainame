"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Search } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";

type HTMLFormProps = React.HTMLProps<HTMLFormElement>;

export function SearchForm({ className }: HTMLFormProps) {
  const router = useRouter();
  const handleSearch = (formData: FormData) => {
    const raw = formData.get("search");

    if (typeof raw !== "string") {
      router.push("/collections?page=1");
      return;
    }

    const q = raw.trim();

    const params = new URLSearchParams();
    if (q) params.set("search", q);
    params.set("page", "1");

    router.push(`/collections?${params.toString()}`);
  };

  return (
    <Form className={cn(className)} action={handleSearch}>
      <Label htmlFor="Search product" className="sr-only">
        Search product
      </Label>
      <div className="relative">
        <Input
          id="Search product"
          className="peer focus-visible:ring-primary ps-9 pe-9 focus-visible:ring-2 focus-visible:outline-none"
          placeholder="Search..."
          name="search"
          type="search"
          onFocus={() => router.prefetch("/collections")}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </Form>
  );
}
