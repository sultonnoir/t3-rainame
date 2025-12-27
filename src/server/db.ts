import { env } from "@/env";
import { PrismaClient } from "../../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
const connectionString = env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
export const db = new PrismaClient({ adapter });
