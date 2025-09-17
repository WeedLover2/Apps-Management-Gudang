import React, { useContext } from "react";
import ProductCard from "../Components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const EmptyIcon = () => (
  <div className="flex flex-col items-center justify-center h-96">
    <img 
			src="https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvMjI5My8yMjkzNjE0LnBuZw==&ts=1758084311&sig=72d8ee1174d1c64d37a9667f7c6eca71b2ece15f9927d4d0d41d02caf4282142" 
			alt="No Product" 
			className="w-32 h-32 opacity-50 mb-4" />
    <div className="text-gray-400 text-lg">Belum ada produk</div>
  </div>
);

const Home = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="container mx-auto py-8">
      {products && products.length > 0 ? <ProductCard /> : <EmptyIcon />}
    </div>
  );
};

export default Home;