import { Image } from "@unpic/react";
import { ArrowRight } from "lucide-react";

export default function HomeEmailSubscription() {
  return (
    <div className="dark:bg-accent relative mt-24 flex flex-col rounded-2xl bg-slate-50 p-4 pb-0 sm:rounded-[40px] sm:p-5 md:flex-row lg:p-24">
      <div className="relative lg:w-[50%]">
        <h2 className="text-4xl font-semibold md:text-5xl">
          Don&apos;t miss out on special offers
        </h2>
        <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
          Register to receive news about the latest, savings combos, discount
          codes...
        </span>
        <ul className="mt-10 space-y-4">
          <li className="flex items-center space-x-4">
            <span className="nc-Badge relative inline-flex rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800">
              01
            </span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Savings combos
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="nc-Badge relative inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
              02
            </span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Freeship
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="nc-Badge relative inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
              03
            </span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Premium magazines
            </span>
          </li>
        </ul>
        <div className="relative mt-10 w-full md:max-w-sm">
          <input
            className="border-default focus:border-primary-300 focus:ring-primary-200 disabled:bg-primary-200 dark:border-primary-700 dark:bg-default-900 dark:focus:ring-primary-600 dark:disabled:bg-primary-800 focus:ring-opacity-50 dark:focus:ring-opacity-25 placeholder:text-muted-foreground block h-11 w-full rounded-full border bg-white px-4 py-3 text-sm font-normal outline-none focus:ring"
            placeholder="Enter your email"
            type="email"
          />
          <button
            aria-label="button subscription email"
            className="bg-primary hover:bg-primary/90 disabled:bg-opacity-70 absolute top-1/2 right-1 flex h-9 w-9 -translate-y-1/2 transform items-center justify-center rounded-full text-slate-50 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-0"
            type="submit"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="relative mt-10 block max-w-lg lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:max-w-[calc(50%-240px)]">
        <Image alt="promo" width={651} height={824} src="/promo3.png" />
      </div>
    </div>
  );
}
