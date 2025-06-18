import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  // TODO: seeding methods goes here
}

main()
  .then(() => client.$disconnect())
  .catch(() => {
    client.$disconnect();
    process.exit(1);
  });
