import { Image } from "@unpic/react";
import { HeartIcon, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { FunctionComponent } from "react";
import { Card } from "@/components/ui/card";
import type { ProductWithMedia } from "@/server/api/routers/products/product-schema";
interface ProductCardProps {
  product: ProductWithMedia;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  return (
    <Card className="p-4">
      <div className="relative flex flex-col gap-4 overflow-hidden">
        <div className="rounded-ele relative aspect-square w-full overflow-hidden pb-4">
          <Image
            alt="Wireless Bluetooth Headphones"
            className="rounded-ele h-full w-full shrink-0 overflow-hidden object-cover"
            src={product.media[0]?.url ?? ""}
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
                  {product.rating_average.toFixed(1)}
                </span>
                <span className="text-muted-foreground text-xs">
                  ({product.rating_count})
                </span>
              </div>{" "}
            </div>
            <h3 className="ext-sm line-clamp-2 leading-tight font-semibold transition-colors duration-200 sm:text-base">
              {product.name}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex w-full grow flex-col justify-end">
        <div className="items-left flex w-full flex-col justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold sm:text-xl">
              ${product.discounted_price}
            </span>
            {product.discount > 0 && (
              <span className="text-muted-foreground text-sm line-through">
                ${product.normal_price}
              </span>
            )}
          </div>
          <div className="flex w-full items-center gap-2">
            <Button size="icon" variant="outline">
              <HeartIcon />
            </Button>
            <Button className="grow">
              <ShoppingCart />
              <span className="max-[324px]:hidden">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
