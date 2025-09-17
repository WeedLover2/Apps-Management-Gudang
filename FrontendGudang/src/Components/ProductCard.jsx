import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductCard = () => {
  const { products, loading, removeProduct } = useContext(ProductContext);
  const [openId, setOpenId] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>Tidak ada produk.</div>;

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    alert('Edit produk: ' + id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      await removeProduct(id);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => {
        const expanded = openId === product._id;
        return (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 relative flex flex-col"
            style={{ minHeight: 320, height: expanded ? 480 : 320 }}
            onClick={() => handleToggle(product._id)}
          >
            {/* Thumbnail persegi */}
            <div className="w-full" style={{ height: '80%' }}>
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ aspectRatio: '1/1', objectFit: 'cover' }}
              />
            </div>

            {/* Info bawah 20% - always visible */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50" style={{ height: '20%' }}>
              <div className="flex-1">
                <div className="font-bold text-base break-words">{product.name}</div>
                <div className="text-xs text-gray-500 mt-1 break-words">{product.Category}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-700 font-semibold bg-white rounded px-2 py-1 shadow mt-1">Stok: {product.Stock}</div>
              </div>
            </div>

            {/* Deskripsi expand */}
            <div
              className={`absolute left-0 bottom-0 w-full bg-white z-20 transition-all duration-500 overflow-hidden shadow-lg ${expanded ? 'h-[50%] opacity-100' : 'h-0 opacity-0'}`}
              style={{ borderRadius: '0 0 0.75rem 0.75rem' }}
              onClick={e => e.stopPropagation()}
            >
              {expanded && (
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex justify-end gap-2 p-2 absolute top-0 right-0">
                    <button
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs font-semibold shadow flex items-center gap-1"
                      onClick={e => { e.stopPropagation(); handleEdit(product._id); }}
                    >
                      <EditOutlined /> Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-semibold shadow flex items-center gap-1"
                      onClick={e => { e.stopPropagation(); handleDelete(product._id); }}
                    >
                      <DeleteOutlined /> Hapus
                    </button>
                  </div>
                  <div className="p-4 pt-10 text-gray-700 text-sm">
                    <div className="font-bold text-base break-words">{product.name}</div>
                    <div className="text-xs text-gray-500 mt-1 break-words">{product.Category}</div>
                    <div className="text-xs text-gray-700 font-semibold bg-white rounded px-2 py-1 shadow mt-1 inline-block">Stok: {product.Stock}</div>
                    <div className="font-semibold mb-1 mt-4">Deskripsi:</div>
                    <div className="break-words whitespace-pre-line">{product.Description}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;