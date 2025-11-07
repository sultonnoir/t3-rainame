import type { category, subcategory } from "generated/prisma";

export interface Categories extends category {
  subcategory: subcategory[];
}
