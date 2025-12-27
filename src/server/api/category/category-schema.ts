import type { Category, Subcategory } from "generated/prisma";

export interface Categories extends Category {
  subcategories: Subcategory[];
}
