import React, { useState } from 'react';
import Modal from './Modal';
import { Form, Input, Select, Button, message } from 'antd';
import { UserAddOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { createUser } from '../api/UserAPI';

const { Option } = Select;

const CreateUser = ({ isOpen, onClose, onUserCreated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const newUser = await createUser(values);
      message.success('User berhasil dibuat!');
      form.resetFields();
      onClose();
      if (onUserCreated) {
        onUserCreated(newUser);
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Gagal membuat user');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      {/* Header */}
      <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6">
        <UserAddOutlined className="text-blue-600" />
        Buat User Baru
      </div>

      <div className="max-h-96 overflow-y-auto pr-2">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          className="space-y-4"
        >
          {/* Name Field */}
          <Form.Item
            label={
              <span className="text-gray-700 font-medium">
                Nama User
              </span>
            }
            name="name"
            rules={[
              { required: true, message: 'Nama user harus diisi!' },
              { min: 3, message: 'Nama minimal 3 karakter!' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Masukkan nama user"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Role Field */}
          <Form.Item
            label={
              <span className="text-gray-700 font-medium">
                Role User
              </span>
            }
            name="role"
            rules={[
              { required: true, message: 'Role harus dipilih!' }
            ]}
          >
            <Select
              placeholder="Pilih role user"
              size="large"
              className="rounded-lg"
            >
              <Option value="user">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  User
                </div>
              </Option>
              <Option value="admin">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Admin
                </div>
              </Option>
            </Select>
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label={
              <span className="text-gray-700 font-medium">
                Password
              </span>
            }
            name="password"
            rules={[
              { required: true, message: 'Password harus diisi!' },
              { min: 6, message: 'Password minimal 6 karakter!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Masukkan password"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            label={
              <span className="text-gray-700 font-medium">
                Konfirmasi Password
              </span>
            }
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Konfirmasi password harus diisi!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Password tidak cocok!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Konfirmasi password"
              size="large"
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
                loading={loading}
                size="large"
                className="px-6 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg shadow-md hover:shadow-lg"
                icon={<UserAddOutlined />}
              >
                {loading ? 'Membuat User...' : 'Buat User'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="text-sm text-green-800">
          <div className="font-semibold mb-1">Informasi Role:</div>
          <div className="space-y-1">
            <div>• <span className="font-medium">Admin:</span> Dapat mengelola produk dan user</div>
            <div>• <span className="font-medium">User:</span> Hanya dapat mengelola produk</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateUser;