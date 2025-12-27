import { Skeleton } from "../ui/skeleton";

const CartSkeleton = () => (
  <div className="space-y-3 py-4">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="flex gap-2">
        <Skeleton className="h-37.5 w-25 rounded-md" />
        <div className="flex flex-1 flex-col">
          <Skeleton className="my-0.5 h-4 max-w-54" />
          <div className="flex max-w-54 items-center gap-1">
            <Skeleton className="my-0.5 h-4 w-1/2" />
            <Skeleton className="my-0.5 h-4 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-7 w-19 sm:h-6 sm:w-17" />
      </div>
    ))}
  </div>
);

export default CartSkeleton;
