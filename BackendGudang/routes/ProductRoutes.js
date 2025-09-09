const express = require("express");
const multer = require("multer");
const {
    getProducts,
    createProduct,
    getDetailProduct,
    deleteProduct,
    updateProduct,
} = require("../controller/ProductController.js");

// Midleware untuk upload file dengan multer
const upload = multer({ dest: "uploads/products/" }) // Folder sementara di server

const router = express.Router();

// Endpoint API
router.get("/", getProducts);
router.get("/:id", getDetailProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", upload.single("thumbnail"), updateProduct);
router.post("/", upload.single("thumbnail"), createProduct);

module.exports = router;