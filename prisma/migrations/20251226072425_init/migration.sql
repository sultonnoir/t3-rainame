-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "image" VARCHAR NOT NULL DEFAULT 'https://res.cloudinary.com/dv6cln4gs/image/upload/v1745806830/k97ej5xme96j913p5ntbex30y97e1hfq/u9mvefelkhohmaufuw8x.png',
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_anonymous" BOOLEAN DEFAULT false,
    "role" VARCHAR,
    "banned" BOOLEAN,
    "ban_reason" TEXT,
    "ban_expires" TIMESTAMP(6),
    "image_blur" VARCHAR NOT NULL DEFAULT 'U8R3TWt7~qxu%MfQayj[?bj[D*ayoffQWBay',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "user_id" TEXT NOT NULL,
    "impersonatedBy" TEXT,
    "token" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "id_token" TEXT,
    "access_token_expires_at" TIMESTAMP(3),
    "refresh_token_expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scope" TEXT,
    "password" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buyer_analytic" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_purchase" INTEGER DEFAULT 0,
    "total_spent" INTEGER DEFAULT 0,

    CONSTRAINT "buyer_analytic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" VARCHAR NOT NULL,
    "desc" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout" (
    "id" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" VARCHAR NOT NULL DEFAULT 'pending',
    "user_id" VARCHAR,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_item" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "size" VARCHAR NOT NULL,
    "product_id" VARCHAR NOT NULL,
    "checkout_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkout_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "code" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "amount" INTEGER,
    "min_order" INTEGER NOT NULL DEFAULT 0,
    "desc" VARCHAR NOT NULL,
    "tac" VARCHAR NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0.1,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon_consume" (
    "coupon_id" VARCHAR NOT NULL,
    "user_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupon_consume_couponId_userId_pk" PRIMARY KEY ("coupon_id","user_id")
);

-- CreateTable
CREATE TABLE "details" (
    "product_id" VARCHAR NOT NULL,
    "category_id" VARCHAR NOT NULL,
    "subcategory_id" VARCHAR NOT NULL,

    CONSTRAINT "details_product_id_subcategory_id_category_id_pk" PRIMARY KEY ("product_id","subcategory_id","category_id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "url" VARCHAR NOT NULL,
    "thumbnail" VARCHAR NOT NULL,
    "product_id" VARCHAR NOT NULL,
    "caption" VARCHAR,
    "blur" VARCHAR NOT NULL DEFAULT 'U8R3TWt7~qxu%MfQayj[?bj[D*ayoffQWBay',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifi" (
    "id" TEXT NOT NULL,
    "status" VARCHAR NOT NULL DEFAULT 'OrderPending',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" VARCHAR NOT NULL,
    "checkout_id" VARCHAR,
    "user_id" VARCHAR,
    "link" VARCHAR,

    CONSTRAINT "notifi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifi_read" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "notifi_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifi_read_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "summary" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "desc" VARCHAR NOT NULL,
    "normal_price" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0,
    "discounted_price" REAL NOT NULL DEFAULT 0,
    "category" VARCHAR(255) NOT NULL,
    "subcategory" VARCHAR(255) NOT NULL,
    "rating_average" REAL NOT NULL DEFAULT 0,
    "rating_count" INTEGER NOT NULL DEFAULT 0,
    "selling" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quatity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_analytic" (
    "id" TEXT NOT NULL,
    "product_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sold_count" INTEGER DEFAULT 0,
    "failed_count" INTEGER DEFAULT 0,
    "refund_count" INTEGER DEFAULT 0,

    CONSTRAINT "product_analytic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" VARCHAR NOT NULL,

    CONSTRAINT "product_variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR NOT NULL,
    "image" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "desc" VARCHAR NOT NULL,
    "discount" REAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promo_and_product" (
    "promo_id" VARCHAR NOT NULL,
    "product_id" VARCHAR NOT NULL,

    CONSTRAINT "promo_and_product_productId_promoId_pk" PRIMARY KEY ("product_id","promo_id")
);

-- CreateTable
CREATE TABLE "rating" (
    "id" TEXT NOT NULL,
    "value" SMALLINT NOT NULL,
    "message" VARCHAR NOT NULL,
    "product_id" VARCHAR NOT NULL,
    "user_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue_analytic" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revenue" REAL DEFAULT 0,

    CONSTRAINT "revenue_analytic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcategory" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "desc" TEXT,
    "category_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "session_user_id_idx" ON "session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_user_id_idx" ON "account"("user_id");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "buyer_analytic_id_idx" ON "buyer_analytic"("id");

-- CreateIndex
CREATE INDEX "buyer_analytic_created_at_idx" ON "buyer_analytic"("created_at");

-- CreateIndex
CREATE INDEX "buyer_analytic_user_id_idx" ON "buyer_analytic"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_unique" ON "category"("slug");

-- CreateIndex
CREATE INDEX "category_id_idx" ON "category"("id");

-- CreateIndex
CREATE INDEX "category_name_idx" ON "category"("name");

-- CreateIndex
CREATE INDEX "category_slug_idx" ON "category"("slug");

-- CreateIndex
CREATE INDEX "checkout_id_idx" ON "checkout"("id");

-- CreateIndex
CREATE INDEX "checkout_user_id_idx" ON "checkout"("user_id");

-- CreateIndex
CREATE INDEX "checkout_item_checkout_id_idx" ON "checkout_item"("checkout_id");

-- CreateIndex
CREATE INDEX "checkout_item_id_idx" ON "checkout_item"("id");

-- CreateIndex
CREATE INDEX "checkout_item_product_id_idx" ON "checkout_item"("product_id");

-- CreateIndex
CREATE INDEX "Coupon_code_idx" ON "Coupon"("code");

-- CreateIndex
CREATE INDEX "coupon_name_idx" ON "Coupon"("title");

-- CreateIndex
CREATE INDEX "media_id_idx" ON "media"("id");

-- CreateIndex
CREATE INDEX "media_product_id_idx" ON "media"("product_id");

-- CreateIndex
CREATE INDEX "notifi_checkout_id" ON "notifi"("checkout_id");

-- CreateIndex
CREATE INDEX "notifi_id_idx" ON "notifi"("id");

-- CreateIndex
CREATE INDEX "notifi_user_id_idx" ON "notifi"("user_id");

-- CreateIndex
CREATE INDEX "notifi_read_id_idx" ON "notifi_read"("id");

-- CreateIndex
CREATE INDEX "notifi_read_notifi_id_idx" ON "notifi_read"("notifi_id");

-- CreateIndex
CREATE INDEX "notifi_read_user_id_idx" ON "notifi_read"("user_id");

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "posts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_unique" ON "product"("slug");

-- CreateIndex
CREATE INDEX "product_discount_idx" ON "product"("discount");

-- CreateIndex
CREATE INDEX "product_name_idx" ON "product"("name");

-- CreateIndex
CREATE INDEX "product_price_idx" ON "product"("discounted_price");

-- CreateIndex
CREATE INDEX "product_slug_idx" ON "product"("slug");

-- CreateIndex
CREATE INDEX "cart_id_idx" ON "cart"("id");

-- CreateIndex
CREATE INDEX "cart_user_id_idx" ON "cart"("user_id");

-- CreateIndex
CREATE INDEX "cart_product_id_idx" ON "cart"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_user_id_product_id_key" ON "wishlist"("user_id", "product_id");

-- CreateIndex
CREATE INDEX "product_analytic_id_idx" ON "product_analytic"("id");

-- CreateIndex
CREATE INDEX "product_analytic_period_idx" ON "product_analytic"("created_at");

-- CreateIndex
CREATE INDEX "product_analytic_product_id_idx" ON "product_analytic"("product_id");

-- CreateIndex
CREATE INDEX "product_variant_name_idx" ON "product_variant"("name");

-- CreateIndex
CREATE INDEX "product_variant_product_id_idx" ON "product_variant"("product_id");

-- CreateIndex
CREATE INDEX "promo_slug_idx" ON "promo"("slug");

-- CreateIndex
CREATE INDEX "revenue_analytic_id_idx" ON "revenue_analytic"("id");

-- CreateIndex
CREATE INDEX "revenue_analytic_period_idx" ON "revenue_analytic"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "subcategory_name_unique" ON "subcategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subcategory_slug_unique" ON "subcategory"("slug");

-- CreateIndex
CREATE INDEX "subcategory_category_id_idx" ON "subcategory"("category_id");

-- CreateIndex
CREATE INDEX "subcategory_name_idx" ON "subcategory"("name");

-- CreateIndex
CREATE INDEX "subcategory_slug_idx" ON "subcategory"("slug");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buyer_analytic" ADD CONSTRAINT "buyer_analytic_userId_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "checkout" ADD CONSTRAINT "checkout_userId_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "checkout_item" ADD CONSTRAINT "checkout_item_checkout_id_fkey" FOREIGN KEY ("checkout_id") REFERENCES "checkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_item" ADD CONSTRAINT "checkout_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_consume" ADD CONSTRAINT "coupon_consume_couponId_coupon_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coupon_consume" ADD CONSTRAINT "coupon_consume_userId_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_subcategory_id_subcategory_id_fk" FOREIGN KEY ("subcategory_id") REFERENCES "subcategory"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_productId_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifi" ADD CONSTRAINT "notifi_checkoutId_checkout_id_fk" FOREIGN KEY ("checkout_id") REFERENCES "checkout"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifi" ADD CONSTRAINT "notifi_userId_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifi_read" ADD CONSTRAINT "notifiRead_notifiId_notifi_id_fk" FOREIGN KEY ("notifi_id") REFERENCES "notifi"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifi_read" ADD CONSTRAINT "notifiRead_userId_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "product_cart_productId_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_productId_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promo_and_product" ADD CONSTRAINT "promo_and_product_productId_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promo_and_product" ADD CONSTRAINT "promo_and_product_promoId_promo_id_fk" FOREIGN KEY ("promo_id") REFERENCES "promo"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_productId_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_userId_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_categoryId_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
