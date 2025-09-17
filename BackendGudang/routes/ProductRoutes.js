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

// Endpoint API
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - Stock
 *         - Description
 *         - Category
 *         - thumbnail
 *       properties:
 *         name:
 *           type: string
 *           example: "Indomie Goreng"
 *         Stock:
 *           type: number
 *           example: 100
 *         Description:
 *           type: string
 *           example: "Mie instan rasa goreng lezat."
 *         Category:
 *           type: string
 *           enum:
 *             - Makanan & Minuman
 *             - Elektronik
 *             - Tekstil
 *             - Alat Tulis Kantor
 *             - Obat
 *             - Gundam
 *             - Perabotan
 *             - Bahan Bangunan & Peralatan
 *             - Otomotif
 *             - Komputer
 *             - Bahan Kimia
 *             - Lainnya
 *           example: "Makanan & Minuman"
 *         thumbnail:
 *           type: string
 *           example: "product-image.jpg"
 *         cloudinaryId:
 *           type: string
 *           example: "abc123xyz"
 */
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product detail by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

router.get("/", getProducts);
router.get("/search", getAllProducts);
router.get("/:id", getDetailProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", upload.single("thumbnail"), updateProduct);
router.post("/", upload.single("thumbnail"), createProduct);

module.exports = router;