import React, { useState, useContext } from "react";
import Modal from "./Modal";
import { Form, Input, InputNumber, Button, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
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
  const { addProduct, loading } = useContext(ProductContext);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    setError(null);
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
      form.resetFields();
      if (onClose) onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Tambah Produk</h2>
      {error && <div className="mb-2 text-red-500 text-sm">{error}</div>}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4"
        autoComplete="off"
      >
        {/* Nama Produk */}
        <Form.Item
          label="Nama Produk"
          name="name"
          rules={[{ required: true, message: "Masukkan nama produk!" }]}
        >
          <Input />
        </Form.Item>

        {/* Stok */}
        <Form.Item
          label="Stok"
          name="Stock"
          rules={[{ required: true, message: "Masukkan jumlah stok!" }]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        {/* Deskripsi */}
        <Form.Item
          label="Deskripsi"
          name="Description"
          rules={[
            { required: true, message: "Masukkan deskripsi produk!" },
            { max: 250, message: "Deskripsi maksimal 250 karakter!" }
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* Kategori */}
        <Form.Item
          label="Kategori"
          name="Category"
          rules={[{ required: true, message: "Pilih kategori produk!" }]}
        >
          <Select options={categoryOptions.map(c => ({ label: c, value: c }))} />
        </Form.Item>

        {/* Thumbnail */}
        <Form.Item
          label="Thumbnail"
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
          >
            <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            className="w-full bg-green-600 hover:bg-green-700 hover:cursor-pointer" 
            style={{ borderRadius: 6 }}
          >
            Tambah Produk
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
  