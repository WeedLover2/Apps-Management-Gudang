import React, { useState, useContext } from "react";
import Modal from "./Modal";
import { Form, Input, InputNumber, Button, Select, Upload, message } from "antd";
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
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

const AddProduct = ({ isOpen, onClose }) => {
  const { addProduct, loading, refreshProducts } = useContext(ProductContext);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = async (values) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("Stock", values.Stock);
      formData.append("Description", values.Description);
      formData.append("Category", values.Category);
      if (values.thumbnail && Array.isArray(values.thumbnail) && values.thumbnail[0]) {
        formData.append("thumbnail", values.thumbnail[0].originFileObj);
      }
      
      await addProduct(formData);
      message.success('Produk berhasil ditambahkan!');
      
      // Auto-refresh products dari server untuk menampilkan produk baru
      console.log('Halaman sedang direfresh...');
      await refreshProducts();
      console.log('Halaman berhasil direfresh!');

      form.resetFields();
      if (onClose) onClose();
    } catch (err) {
      setError(err.message);
      message.error('Gagal menambahkan produk: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6">
        <PlusOutlined className="text-green-600" />
        Tambah Produk
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="max-h-96 overflow-y-auto pr-2">
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
          <Input placeholder="Masukkan nama produk" className="rounded-lg" />
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
          label={<span className="text-gray-700 font-medium">Thumbnail</span>}
          name="thumbnail"
          rules={[{ required: true, message: "Upload thumbnail produk!" }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            accept="image/*"
            className="rounded-lg"
          >
            <Button icon={<UploadOutlined />} className="rounded-lg">
              Pilih Gambar
            </Button>
          </Upload>
        </Form.Item>

        {/* Action Buttons */}
        <Form.Item className="mb-0 mt-6">
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => {
                form.resetFields();
                onClose();
              }}
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
              className="px-6 bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 rounded-lg shadow-md hover:shadow-lg" 
              icon={<PlusOutlined />}
            >
              {isSubmitting ? 'Menambahkan...' : 'Tambah Produk'}
            </Button>
          </div>
        </Form.Item>
      </Form>
      </div>

      {/* Info Notice */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="text-sm text-green-800">
          <div className="font-semibold mb-1">💡 Tips Tambah Produk:</div>
          <div className="space-y-1 text-xs">
            <div>• Semua field wajib diisi</div>
            <div>• Upload gambar dengan format JPG, PNG, atau WEBP</div>
            <div>• Deskripsi maksimal 150 karakter</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
  