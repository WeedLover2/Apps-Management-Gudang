import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';

const ProductCard = () => {
  const { filteredProducts, removeProduct, deleteLoading } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const [openId, setOpenId] = useState(null);

  // Cek apakah user sudah login
  const isLoggedIn = user !== null;

  if (!filteredProducts.length) return <div>Tidak ada produk.</div>;

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await removeProduct(id);
        message.success('Produk berhasil dihapus');
      } catch (err) {
        message.error(err.message);
      }
    }
  };

  // Membagi products menjadi satu baris, dengan panjang maksimal 4 produk per baris
  const rows = [];
  for (let i = 0; i < filteredProducts.length; i += 4) {
    rows.push(filteredProducts.slice(i, i + 4));
  }

  return (
    <>
      {/* Loading Overlay untuk Delete */}
      {deleteLoading && (
        <div 
          className="fixed inset-0 bg-black opacity-75 flex items-center justify-center z-50"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white rounded-lg p-6 flex flex-col items-center">
            <Spin size="large" />
            <div className="mt-4 text-lg font-semibold">Menghapus produk...</div>
            <div className="mt-2 text-sm text-gray-600">Mohon tunggu sebentar</div>
          </div>
        </div>
      )}

      {/* Menampilkan produk dengan menggunakan .map */}
      <div className="flex flex-col gap-6">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-6 justify-center">
            {row.map((product) => {
              const expanded = openId === product._id;
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 relative flex flex-col"
                  style={{ minHeight: 320, height: 440, minWidth: 240 }}
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

                  {/* Info produk */}
                  <div
                    className="flex items-center justify-between px-4 py-2 bg-gray-50"
                    style={{ height: '20%', opacity: expanded ? 0 : 1 }}
                  >
                    <div className="flex-1">
                      <div className="font-bold text-base break-words">{product.name}</div>
                      <div className="text-xs text-gray-500 mt-1 break-words">{product.Category}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-gray-700 font-semibold bg-white rounded px-2 py-1 shadow mt-1">Stok: {product.Stock}</div>
                    </div>
                  </div>

                  {/* Info produk bila di-expand */}
                  <div
                    className={`absolute left-0 bottom-0 w-full bg-white z-20 transition-all duration-500 overflow-hidden shadow-lg ${expanded ? 'h-[50%] opacity-100' : 'h-0 opacity-0'}`}
                    style={{ borderRadius: '0 0 0.75rem 0.75rem' }}
                    onClick={e => e.stopPropagation()}
                  >
                    {expanded && (
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="flex flex-col items-end gap-2 p-2 absolute top-0 right-0">
                          <div className="text-xs text-gray-700 font-semibold bg-white rounded px-2 py-1 shadow mt-10">Stok: {product.Stock}</div>
                          
                          {/* Tombol Edit dan Hapus hanya tampil jika user sudah login */}
                          {isLoggedIn && (
                            <div className="flex gap-1">
                              <Link to={`/edit-product/${product._id}`}>
                                <button
                                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs font-semibold shadow flex items-center gap-1 hover:cursor-pointer"
                                >
                                  <EditOutlined /> Edit
                                </button>
                              </Link>
                              <button
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-semibold shadow flex items-center gap-1 hover:cursor-pointer"
                                onClick={e => { e.stopPropagation(); handleDelete(product._id); }}
                              >
                                <DeleteOutlined /> Hapus
                              </button>
                            </div>
                          )}
                          
                          {/* Pesan untuk user yang belum login */}
                          {!isLoggedIn && (
                            <div className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-1 text-center">
                              Login untuk mengedit
                            </div>
                          )}
                        </div>
                        <div className="p-4 pt-10 text-gray-700 text-sm">
                          <div className="font-bold text-base break-words">{product.name}</div>
                          <div className="text-xs text-gray-500 mt-1 break-words">{product.Category}</div>
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
        ))}
      </div>
    </>
  );
};

export default ProductCard;