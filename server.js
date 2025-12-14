import app from "#app";
import db from "#db/client";

const PORT = process.env.PORT ?? 3000;

async function startServer() {
  try {
    await db.connect();
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
}

startServer();
