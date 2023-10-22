const { Router } = require("express");
const { getOverDueLoans } = require("../controllers/admin");
const { authenticateToken } = require("../middleware/authorization");

const router = Router();

/**
 * @apiDefine UnauthError
 * @apiError Unauthorized User does not have access to this API
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *          "status": "error",
 *          "message": "The user is not authenticated"
 *      }
 */

/**
 * @apiDefine ForbiddenError
 * @apiError Forbidden User does not have permission to use this API
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 403 Forbidden
 *      {
 *          "status": "error",
 *          "message": "The user is not authorized"
 *      }
 */

/**
 * @apiDefine UserNotFoundError
 * @apiError UserNotFound No user is found by that user ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No user is found by that user ID"
 *      }
 */

/**
 * @api {get} /overdue List overdue book loans
 * @apiName getOverDueLoans
 * @apiGroup admin
 * @apiHeader {string} Bearer Authenticaton Token
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *               "name": "Mariam",
 *               "title": "Harry Potter",
 *               "transaction_date": "2023-09-30T22:00:00.000Z",
 *               "transaction_state": 1
 *           },
 *           {
 *               "name": "Mariam",
 *               "title": "Harry Potter",
 *               "transaction_date": "2023-09-30T22:00:00.000Z",
 *               "transaction_state": 1
 *           }
 *       ]
 *   @apiUse UnauthError
 *   @apiUse ForbiddenError
 */

router.get("/overdue", authenticateToken, getOverDueLoans);

module.exports = router;
