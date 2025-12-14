import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createProduct } from "#db/queries/products";
import { createOrder, addProductToOrder } from "#db/queries/orders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  console.log("Seeding database...");

  const user1 = await createUser("alice", "password123");
  const user2 = await createUser("bob", "password456");

  const product1 = await createProduct(
    "Notebook",
    "College ruled notebook",
    3.99
  );

  const product2 = await createProduct("Pen", "Black ink pen", 1.49);

  const product3 = await createProduct(
    "Backpack",
    "Large backpack with pockets",
    39.99
  );

  const order1 = await createOrder(user1.id, "School supplies order");

  await addProductToOrder(order1.id, product1.id, 2);
  await addProductToOrder(order1.id, product2.id, 5);
  await addProductToOrder(order1.id, product3.id, 1);

  console.log("Seeding complete!");
}
