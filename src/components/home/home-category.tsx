import { Image } from "@unpic/react/nextjs";
import Link from "next/link";

const HomeCategory = () => {
  const lists = [
    {
      name: "Shoes",
      path: "/collections/accessories/shoes",
      bgImage: "/explore1.svg",
      image: "/2.jpg",
      totalProcuts: "155 products",
    },
    {
      name: "T-shirt",
      path: "/collections/t-shirt",
      bgImage: "/explore2.svg",
      image: "/4.jpg",
      totalProcuts: "141 products",
    },
    {
      name: "Outwear",
      path: "/collections/outwear",
      bgImage: "/explore3.svg",
      image: "/3.jpg",
      totalProcuts: "133 products",
    },
    {
      name: "Pants",
      path: "/collections/pants",
      bgImage: "/explore4.svg",
      image: "/5.jpg",
      totalProcuts: "142 products",
    },
    {
      name: "Shirt",
      path: "/collections/shirt",
      bgImage: "/explore5.svg",
      image: "/1.jpg",
      totalProcuts: "144 products",
    },
    {
      name: "Bag",
      path: "/collections/accessories/bags",
      bgImage: "/explore6.svg",
      image: "/6.jpg",
      totalProcuts: "149 products",
    },
  ];
  return (
    <div className="flex flex-col space-y-5">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2
          className={`font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl`}>
          Mix & Match your preferred category!
        </h2>
        <div className="bg-primary mt-2 h-1 w-12 rounded-full" />
        <p
          className={`text-muted-foreground mt-4 max-w-2xl text-center md:text-lg`}>
          Find the perfect device for your needs from our curated collections
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
        {lists.map((list) => (
          <div
            key={list.name}
            className="relative isolate z-10 flex flex-col gap-3 p-2"
            data-id={`card-${list.name}`}>
            <Image
              src={list.image}
              alt={list.name}
              width={250}
              height={250}
              priority
              className="aspect-square size-full rounded-lg"
            />
            <p className="text-center">
              <Link href={list.path}>
                <span className="absolute inset-0 z-10"></span>
                {list.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
