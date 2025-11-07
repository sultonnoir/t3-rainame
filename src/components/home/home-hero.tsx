import { Image } from "@unpic/react/nextjs";
import Link from "next/link";

export const HomeHero = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
  ];

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Left Content */}
      <div className="flex items-center px-4 py-12 sm:px-6 lg:px-8 lg:py-0">
        <div className="mx-auto max-w-xl space-y-8 lg:mx-0">
          <div>
            <p className="font-medium tracking-wide text-sky-700 dark:text-sky-500">
              NEW COLLECTION 2025
            </p>
            <h1 className="mt-3 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
              Elevate Your Style This Season
            </h1>
            <p className="text-muted-foreground mt-6 max-w-lg text-lg">
              Discover our curated collection of premium fashion pieces designed
              to make you stand out.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/collections"
              className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-full px-8 py-4 transition duration-300"
            >
              Start shopping now
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <p className="text-3xl font-bold">50+</p>
              <p className="text-muted-foreground mt-1 text-sm">Brands</p>
            </div>
            <div>
              <p className="text-3xl font-bold">200+</p>
              <p className="text-muted-foreground mt-1 text-sm">New Items</p>
            </div>
            <div>
              <p className="text-3xl font-bold">48h</p>
              <p className="text-muted-foreground mt-1 text-sm">Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Grid */}
      <div className="relative grid grid-cols-2 gap-4 p-4 sm:p-6 lg:p-8">
        <div className="relative aspect-3/4">
          <Image
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
            alt="Fashion model in winter coat"
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
            width={370}
            aspectRatio={3 / 4}
            layout="constrained"
            loading="eager"
            priority={true}
          />
        </div>
        <div className="relative mt-12 aspect-3/4">
          <Image
            src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80"
            alt="Fashion model in summer dress"
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
            layout="constrained"
            loading="eager"
            width={370}
            aspectRatio={3 / 4}
            priority
          />
        </div>
        <div className="bg-accent absolute -bottom-6 left-1/2 w-[calc(100%-3rem)] -translate-x-1/2 rounded-xl p-6 shadow-xl sm:w-auto lg:bottom-36">
          <div className="flex items-center gap-4 whitespace-nowrap">
            <div className="flex -space-x-3">
              {avatars.map((avatar, i) => (
                <div
                  key={i}
                  className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-white"
                >
                  <Image
                    src={avatar}
                    alt={`Customer ${i + 1}`}
                    height={40}
                    width={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold">Join 10k+ others</p>
              <p className="text-sm text-gray-600">Satisfied customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
