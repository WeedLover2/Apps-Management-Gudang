import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import { Form, Input, InputNumber, Button, Select, Upload, message } from "antd";
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { ProductContext } from "../context/ProductContext";
import { getProductById } from "../api/ProductAPI";

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
  const { editProduct, loading } = useContext(ProductContext);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [initialLoading, setInitialLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Fetch product data when modal opens
  useEffect(() => {
    if (isOpen && productId) {
      fetchProductData();
    }
  }, [isOpen, productId]);

  const fetchProductData = async () => {
    setInitialLoading(true);
    try {
      const product = await getProductById(productId);
      setCurrentProduct(product);
      
      // Set form values
      form.setFieldsValue({
        name: product.name,
        Stock: product.Stock,
        Description: product.Description,
        Category: product.Category,
      });
    } catch (err) {
      message.error('Gagal mengambil data produk');
      setError(err.message);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleFinish = async (values) => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("Stock", values.Stock);
      formData.append("Description", values.Description);
      formData.append("Category", values.Category);
      
      // Only append thumbnail if a new file is selected
      if (values.thumbnail && Array.isArray(values.thumbnail) && values.thumbnail[0]) {
        formData.append("thumbnail", values.thumbnail[0].originFileObj);
      }
      
      await editProduct(productId, formData);
      message.success('Produk berhasil diperbarui!');
      handleCancel();
    } catch (err) {
      setError(err.message);
      message.error('Gagal memperbarui produk');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setCurrentProduct(null);
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      {/* Header */}
      <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6">
        <EditOutlined className="text-orange-600" />
        Edit Produk
      </div>

      {initialLoading ? (
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

            {/* Thumbnail */}
            <Form.Item
              label={<span className="text-gray-700 font-medium">Thumbnail Baru (Opsional)</span>}
              name="thumbnail"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
              extra="Biarkan kosong jika tidak ingin mengubah gambar"
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                accept="image/*"
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />} className="rounded-lg">
                  Pilih Gambar Baru
                </Button>
              </Upload>
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
                  loading={loading} 
                  size="large"
                  className="px-6 bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 rounded-lg shadow-md hover:shadow-lg"
                  icon={<EditOutlined />}
                >
                  {loading ? 'Memperbarui...' : 'Perbarui Produk'}
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
            <div>• Semua field wajib diisi kecuali thumbnail baru</div>
            <div>• Thumbnail akan tetap menggunakan gambar lama jika tidak diubah</div>
            <div>• Pastikan data yang dimasukkan sudah benar sebelum menyimpan</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProduct;
