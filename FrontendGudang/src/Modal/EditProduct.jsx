import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASEURL } from "../api/ProductAPI";
import { ProductContext } from "../context/ProductContext";

const categoryOptions = [
  "Makanan & Minuman",
  "Elektronik",
  "Tekstil",
  "Alat Tulis Kantor",
  "Obat",
  "Gundam",
  "Perabotan",
  "Bahan Bangunan & Peralatan",
  "Otomotif",
  "Komputer",
  "Bahan Kimia",
  "Lainnya"
];

const EditProduct = ({ isOpen, onClose, productId }) => {
  const { refreshProducts } = useContext(ProductContext);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ngecek props ketika dimount
  useEffect(() => {
    console.log('EditProduct props:', { isOpen, productId });
  }, [isOpen, productId]);

  // Fetch product data saat modal dibuka dan productId berubah
  useEffect(() => {
    if (isOpen && productId) {
      fetchProductData();
    }
  }, [isOpen, productId]);

  const fetchProductData = async () => {
    if (!productId) {
      setError('ID produk tidak valid');
      message.error('ID produk tidak ditemukan');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Fetching product data for ID:', productId); // Debug log
      const response = await axios.get(`${BASEURL}/api/products/${productId}`);
      const product = response.data;
      if (!product) throw new Error('Produk tidak ditemukan');
      
      console.log('Fetched product data:', product); // Debug log
      setCurrentProduct(product);
      
      // Mengset value awal form dengan data produk yang ingin diedit
      form.setFieldsValue({
        name: product.name,
        Stock: product.Stock,
        Description: product.Description,
        Category: product.Category,
      });
    } catch (err) {
      console.error('Error fetching product:', err); // Debug log
      message.error('Gagal mengambil data produk: ' + (err.response?.data?.message || err.message));
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (values) => {
    setError(null);
    setIsSubmitting(true);
    try {
      console.log('Form values submitted:', values); // Debug log
      console.log('Product ID for update:', productId); // Debug log
      
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("Stock", values.Stock.toString());
      formData.append("Description", values.Description);
      formData.append("Category", values.Category);
      
      console.log('FormData contents:'); // Debug log
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      const response = await axios.patch(`${BASEURL}/api/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      message.success('Produk berhasil diperbarui!');
      setCurrentProduct(response.data);
      
      // Auto-refresh products dari server untuk menampilkan perubahan terbaru
      console.log('Refresh sedang dijalankan...');
      await refreshProducts();
      console.log('Halaman berhasil direfresh!');
      
      onClose();
    } catch (err) {
      console.error('Edit product error:', err); // Debug log
      console.error('Error response:', err.response?.data); // Debug log
      setError(err.response?.data?.message || err.message);
      message.error('Gagal memperbarui produk: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setCurrentProduct(null);
    setError(null);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      {/* Header */}
      <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6">
        <EditOutlined className="text-orange-600" />
        Edit Produk
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Memuat data produk...</div>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto pr-2">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
          
          {/* Current Product Info */}
          {currentProduct && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-700 mb-3">
                <span className="font-semibold">Produk yang akan diedit:</span>
              </div>
              <div className="flex gap-4">
                <img 
                  src={currentProduct.thumbnail} 
                  alt={currentProduct.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{currentProduct.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{currentProduct.Category}</div>
                  <div className="text-xs text-gray-600 mt-1">Stok: {currentProduct.Stock}</div>
                </div>
              </div>
            </div>
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className="space-y-4"
            autoComplete="off"
          >
            {/* Nama Produk */}
            <Form.Item
              label={<span className="text-gray-700 font-medium">Nama Produk</span>}
              name="name"
              rules={[{ required: true, message: "Masukkan nama produk!" }]}
            >
              <Input 
                placeholder="Masukkan nama produk"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Stok */}
            <Form.Item
              label={<span className="text-gray-700 font-medium">Stok</span>}
              name="Stock"
              rules={[{ required: true, message: "Masukkan jumlah stok!" }]}
            >
              <InputNumber 
                min={0} 
                className="w-full rounded-lg" 
                placeholder="Masukkan jumlah stok"
              />
            </Form.Item>

            {/* Deskripsi */}
            <Form.Item
              label={<span className="text-gray-700 font-medium">Deskripsi</span>}
              name="Description"
              rules={[
                { required: true, message: "Masukkan deskripsi produk!" },
                { max: 150, message: "Deskripsi maksimal 150 karakter!" }
              ]}
            >
              <Input.TextArea 
                rows={3} 
                placeholder="Masukkan deskripsi produk"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Kategori */}
            <Form.Item
              label={<span className="text-gray-700 font-medium">Kategori</span>}
              name="Category"
              rules={[{ required: true, message: "Pilih kategori produk!" }]}
            >
              <Select 
                options={categoryOptions.map(c => ({ label: c, value: c }))} 
                placeholder="Pilih kategori produk"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Action Buttons */}
            <Form.Item className="mb-0 mt-6">
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={handleCancel}
                  size="large"
                  className="px-6 rounded-lg border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800"
                >
                  Batal
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={isSubmitting}
                  size="large"
                  className="px-6 bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 rounded-lg shadow-md hover:shadow-lg"
                  icon={<EditOutlined />}
                >
                  {isSubmitting ? 'Memperbarui...' : 'Perbarui Produk'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      )}

      {/* Info Notice */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-800">
          <div className="font-semibold mb-1">💡 Tips Edit Produk:</div>
          <div className="space-y-1 text-xs">
            <div>• Semua field wajib diisi</div>
            <div>• Thumbnail tidak dapat diubah dalam mode ini</div>
            <div>• Pastikan data yang dimasukkan sudah benar sebelum menyimpan</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProduct;