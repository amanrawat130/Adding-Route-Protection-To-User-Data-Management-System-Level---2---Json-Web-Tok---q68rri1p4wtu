const express = require("express");

const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userControllers");

const grantAccessTo = require("../middlewares/grantAccessTo");
const protectUserRoutes = require("../middlewares/protectRouteUser");
const protectAdminRoutes = require("../middlewares/protectRouteAdmin");

const router = express.Router();

router.get("/:id", protectUserRoutes, grantAccessTo(["user", "admin", "superadmin"]), getUserByID);
router.patch("/:id", protectUserRoutes, grantAccessTo(["user", "admin", "superadmin"]), updateUser);

// Protect these routes with the protectAdminRoutes middleware
router.post("/", grantAccessTo(["guest", "user", "admin", "superadmin"]), createUser);
router.get("/", protectAdminRoutes, grantAccessTo(["admin", "superadmin"]), getAllUsers);
router.delete("/:id", protectAdminRoutes, grantAccessTo(['superadmin']), deleteUser);

module.exports = router;
