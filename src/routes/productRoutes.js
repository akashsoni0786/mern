const express = require("express");

const {
  createProduct,
  getProducts,
  getProductbyId,
  updateProduct,
  deleteProduct,
  getProductHandler,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductbyId);
router.get("/:id", updateProduct);
router.get("/:id", deleteProduct);
router.get("/", getProductHandler);

module.exports = router;
