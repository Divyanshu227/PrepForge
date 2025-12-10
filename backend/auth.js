import express from "express";
import { auth } from "./firebase.js";

const router = express.Router();
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await auth.createUser({ email, password });
    res.json({ success: true, uid: user.uid });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await auth.getUserByEmail(email);
    res.json({ success: true, uid: user.uid });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
