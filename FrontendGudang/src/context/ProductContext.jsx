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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ambil semua produk
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data); // Set filtered products same as all products initially
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk filter products 
  const filterProducts = (searchTerm, categoryFilter, stockFilter) => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product =>
        product.Category === categoryFilter
      );
    }

    if (stockFilter !== 'all') {
      if (stockFilter === 'inStock') {
        filtered = filtered.filter(product => product.Stock > 0);
      } else if (stockFilter === 'outOfStock') {
        filtered = filtered.filter(product => product.Stock === 0);
      }
    }

    setFilteredProducts(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilteredProducts(products);
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
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
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
      const updatedProducts = products.map((p) => (p._id === id ? updated : p));
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh produk (re-fetch from server)
  const refreshProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Hapus produk
  const removeProduct = async (id) => {
    setDeleteLoading(true);
    setError(null);
    
    // Timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: Penghapusan gagal, silakan coba lagi')), 10000);
    });
    
    try {
      await Promise.race([deleteProduct(id), timeoutPromise]);
      const updatedProducts = products.filter((p) => p._id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        deleteLoading,
        error,
        fetchProducts,
        filterProducts,
        resetFilters,
        addProduct,
        editProduct,
        removeProduct,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
