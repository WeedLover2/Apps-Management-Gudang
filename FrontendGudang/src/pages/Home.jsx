import React, { useContext } from "react";
import ProductCard from "../Components/ProductCard";
import SearchBar from "../Components/SearchBar";
import { ProductContext } from "../context/ProductContext";
import { Spin } from 'antd';

const EmptyIcon = () => (
  <div className="flex flex-col items-center justify-center h-96">
    <img 
			src="https://i.pinimg.com/736x/6b/c2/7f/6bc27f9435b6d687fc5d0307ffbfbf82.jpg" 
			alt="No Product" 
			className="w-32 h-32 opacity-50 mb-4" />
    <div className="text-gray-400 text-lg">Belum ada produk</div>
  </div>
);

const Home = () => {
  const { filteredProducts, loading } = useContext(ProductContext);
  
  return (
    <>
      <SearchBar />
      <div className="container mx-auto py-8 px-5">
        {/* Loading indicator untuk auto-refresh */}
        {loading && (
          <div className="fixed top-20 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50">
            <div className="flex items-center gap-3">
              <Spin size="small" />
              <span className="text-sm text-gray-600 font-medium">Memperbarui data produk...</span>
            </div>
          </div>
        )}
        
        {filteredProducts && filteredProducts.length > 0 ? <ProductCard /> : <EmptyIcon />}
      </div>
    </> 
  );
};

export default Home;