const express = require("express");
const multer = require("multer");
const {
    getProducts,
    createProduct,
    getDetailProduct,
    deleteProduct,
    updateProduct,
    getAllProducts
} = require("../controller/ProductController.js");

// Midleware untuk upload file dengan multer
const upload = multer({ dest: "uploads/products/" }) // Folder sementara di server

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API untuk mengelola produk
 */

/**
 * @swagger
 * get: /products
 * tags: [Products]
 * summary: Mengambil semua produk
 */

// Endpoint API
router.get("/", getProducts);
router.get("/:id", getDetailProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", upload.single("thumbnail"), updateProduct);
router.post("/", upload.single("thumbnail"), createProduct);
router.get("/search", getAllProducts);

module.exports = router;