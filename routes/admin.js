const { Router } = require("express");
const { getOverDueLoans } = require("../controllers/admin");
const router = Router();

router.get("/overdue", getOverDueLoans);

module.exports = router;
