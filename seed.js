import db from "./db/client.js";
import bcrypt from "bcrypt";

await db.connect();
await seed();
await db.end();

console.log("🌱 Database seeded successfully!");

async function seed() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const userResult = await db.query(
    `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
    `,
    ["demoUser", hashedPassword]
  );

  const user = userResult.rows[0];

  const productsResult = await db.query(
    `
    INSERT INTO products (title, description, price) VALUES
      ('Apple', 'Fresh red apple', 1.50),
      ('Banana', 'Ripe yellow banana', 0.99),
      ('Orange', 'Juicy orange', 1.25),
      ('Milk', 'Gallon of milk', 3.75),
      ('Bread', 'Whole wheat bread', 2.50),
      ('Eggs', 'Dozen eggs', 4.25),
      ('Cheese', 'Cheddar cheese block', 5.00),
      ('Chicken', 'Boneless chicken breast', 8.99),
      ('Rice', '5 lb bag of rice', 6.50),
      ('Pasta', 'Box of pasta', 2.00)
    RETURNING *
    `
  );

  const products = productsResult.rows;

  const orderResult = await db.query(
    `
    INSERT INTO orders (date, note, user_id)
    VALUES (CURRENT_DATE, $1, $2)
    RETURNING *
    `,
    ["First demo order", user.id]
  );

  const order = orderResult.rows[0];

  await db.query(
    `
    INSERT INTO orders_products (order_id, product_id, quantity) VALUES
      ($1, $2, 1),
      ($1, $3, 2),
      ($1, $4, 1),
      ($1, $5, 3),
      ($1, $6, 1)
    `,
    [
      order.id,
      products[0].id,
      products[1].id,
      products[2].id,
      products[3].id,
      products[4].id,
    ]
  );
}
