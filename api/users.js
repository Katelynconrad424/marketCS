import express from "express";
import { createUser, getUserByUsername } from "#db/queries/users";
import { createToken } from "#utils/jwt";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password required",
    });
  }

  const user = await createUser(username, password);
  const token = createToken(user);

  res.json({
    user,
    token,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);

  if (!user || user.password !== password) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }

  const token = createToken(user);

  res.json({
    user,
    token,
  });
});

export default router;
