import React, { useContext } from "react";
import ProductCard from "../Components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const EmptyIcon = () => (
  <div className="flex flex-col items-center justify-center h-96">
    <img src="/public/empty-product.png" alt="No Product" className="w-32 h-32 opacity-50 mb-4" />
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