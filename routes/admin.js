const { Router } = require("express");
const { getOverDueLoans } = require("../controllers/admin");
const { authenticateToken } = require("../middleware/authorization");

const router = Router();

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 */

router.get("/overdue", authenticateToken, getOverDueLoans);

module.exports = router;
