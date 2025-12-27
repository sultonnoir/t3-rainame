import { Spinner } from "../ui/spinner";

const CheckoutSkeleton = () => {
  return (
    <div className="bg-white/20data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur">
      <div className="flex size-full items-center justify-center">
        <div className="flex items-center justify-center">
          <Spinner className="size-56" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
