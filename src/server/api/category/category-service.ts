import { db } from "@/server/db";

export class CategoryService {
  async list() {
    return db.category.findMany({
      include: {
        subcategory: true,
      },
    });
  }
}
