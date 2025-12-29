import { Image } from "@unpic/react/nextjs";
import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import type { FunctionComponent } from "react";
import { Card } from "@/components/ui/card";
import type { ProductWithMedia } from "@/server/api/product/product-schema";
import Link from "next/link";
import { blurhashToDataUri } from "@unpic/placeholder";
interface ProductCardProps {
  product: ProductWithMedia;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  return (
    <Card className="relative isolate gap-2 overflow-hidden p-4">
      <div className="rounded-ele relative aspect-square w-full overflow-hidden pb-4">
        <Image
          alt="Wireless Bluetooth Headphones"
          className="h-full w-full shrink-0 overflow-hidden rounded-lg object-cover"
          src={product.media[0]?.url ?? ""}
          background={blurhashToDataUri(product.media[0]?.blur ?? "")}
          layout="constrained"
          width={600}
          height={600}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:ring-ring flex h-5 w-fit items-center justify-center gap-1.5 rounded-[calc(var(--radius)-4px)] border border-transparent px-2 text-xs font-medium capitalize shadow-sm/2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
            {product.category}
          </span>
          {product.discount > 0 && (
            <span className="bg-destructive hover:bg-destructive/80 focus-visible:ring-destructive flex h-5 w-fit items-center justify-center gap-1.5 rounded-[calc(var(--radius)-4px)] border border-transparent px-2 text-xs font-medium text-white shadow-sm/2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
              -{product.discount.toFixed(0)}%
            </span>
          )}
        </div>
      </div>
      <div className="flex h-fit flex-col justify-center">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="rounded-md capitalize">
              {product.subcategory}
            </Badge>
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <Star className="fill-amber-400 stroke-amber-400" size={16} />
              </div>
              <span className="text-sm font-semibold">
                {product.ratingAverage.toFixed(1)}
              </span>
              <span className="text-muted-foreground text-xs">
                ({product.ratingCount})
              </span>
            </div>
          </div>
          <h3 className="line-clamp-2 truncate text-sm leading-tight font-semibold transition-colors duration-200 sm:text-base">
            <Link
              href={`/products/${product.slug}`}
              prefetch={true}
              title={product.name}
            >
              <span className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
        </div>
      </div>
      <div className="flex w-full grow flex-col justify-end">
        <div className="items-left flex w-full flex-col justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold sm:text-xl">
              ${product.discountedPrice}
            </span>
            {product.discount > 0 && (
              <span className="text-muted-foreground text-sm line-through">
                ${product.normalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
