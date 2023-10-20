const { Router } = require("express");
const {
  signUp,
  getAllUsers,
  logIn,
  deleteUser,
  getUserProfile,
  borrow,
} = require("../controllers/user.js");
const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserProfile);
router.post("/", signUp);
router.post("/login", logIn);
router.post("/borrow", borrow);
router.delete("/:id", deleteUser);
//router.put("/:id", updateProfile);

module.exports = router;
