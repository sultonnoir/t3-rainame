/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id,size]` on the table `cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cart_user_id_product_id_size_key" ON "cart"("user_id", "product_id", "size");
