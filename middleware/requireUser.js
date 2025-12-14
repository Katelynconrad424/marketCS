import jwt from "jsonwebtoken";
import db from "#db/client";

export default async function requireUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await db.query("SELECT * FROM users WHERE id = $1", [
      decoded.id,
    ]);

    req.user = result.rows[0];
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}
