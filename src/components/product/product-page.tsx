"use client";
import ProductPrice from "./product-price";
import ProductSizes from "./product-size";
import ProductCounter from "./product-counter";
import ProductPayment from "./product-payment";
import ProductDetails from "./product-details";
import ProductBenefit from "./product-benefit";

import ImageCarouselBasic from "../ui/image-carousel-basic";
import StarRatingFractions from "../ui/star-rating-fractions";
import type { ProductPageProp } from "@/server/api/product/product-schema";

interface Props {
  product: ProductPageProp;
}

const ProductPage = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
      <div className="relative lg:w-[55%]">
        <ImageCarouselBasic images={product.media} />
      </div>
      <div className="space-y-4 lg:w-[45%]">
        <h1 className="text-2xl leading-none font-bold tracking-tight">
          {product.name}
        </h1>
        <StarRatingFractions
          value={product.ratingAverage}
          readOnly
          maxStars={5}
        />
        <ProductPrice
          discount={product.discount}
          price={product.normalPrice}
          priceAfterDiscount={product.discountedPrice}
          priceClassName="~text-lg/4xl"
          discountClassName="~text-sm/2xl"
        />
        <ProductSizes sizes={product.productVariant} />
        <ProductCounter />
        <ProductPayment productId={product.id} />
        <ProductDetails about={product.desc} />
        <ProductBenefit />
      </div>
    </div>
  );
};

export default ProductPage;
