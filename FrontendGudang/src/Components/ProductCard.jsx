import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductCard = () => {
  const { products, loading } = useContext(ProductContext);
  const [openId, setOpenId] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>Tidak ada produk.</div>;

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300"
          onClick={() => handleToggle(product._id)}
        >
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
            <div className="text-gray-600 text-sm mb-1">Stok: {product.Stock}</div>
            <div className="text-gray-500 text-xs mb-2">Kategori: {product.Category}</div>
            {openId === product._id && (
              <div className="mt-2 text-gray-700 text-sm border-t pt-2">
                <div className="font-semibold mb-1">Deskripsi:</div>
                <div>{product.Description}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
