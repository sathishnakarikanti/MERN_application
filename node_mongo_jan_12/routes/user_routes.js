const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const userAuth = require("../authentication/user_auth")


router.get("/getCustomers", userController.getUser)
router.post("/insertCustomer", userController.insertCustomer)
router.put("/updateCustomer", userController.updateCustomer)
router.delete("/deleteCustomer", userController.deleteCustomer)
router.post("/verifyuser", userAuth.verifyuser)
router.post("/verifyotp", userAuth.verifyotp)

module.exports = router;
