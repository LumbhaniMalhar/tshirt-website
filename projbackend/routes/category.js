const express = require("express");
const router = express.Router();

const {getUserById} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory} = require("../controllers/category");

// middlewares
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//create route
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);
//read route
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);
//update route
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
//delete route
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router
