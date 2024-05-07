import { PrismaClient } from "@prisma/client";

const prismaSingleton = (): PrismaClient => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  }
  return new PrismaClient({ log: ["query"] });

}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaSingleton>;
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaSingleton();
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma