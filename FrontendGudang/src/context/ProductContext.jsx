import React, { createContext, useState, useEffect } from "react";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../api/ProductAPI";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ambil semua produk
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get Produk waktu komponen dimount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Tambah produk baru
  const addProduct = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await createProduct(formData);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Edit produk
  const editProduct = async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateProduct(id, formData);
      setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Hapus produk
  const removeProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
