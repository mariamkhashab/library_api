const { Router } = require("express");
const { getOverDueLoans } = require("../controllers/admin");
const { authenticateToken } = require("../middleware/authorization");

const router = Router();

router.get("/overdue", authenticateToken, getOverDueLoans);

module.exports = router;
