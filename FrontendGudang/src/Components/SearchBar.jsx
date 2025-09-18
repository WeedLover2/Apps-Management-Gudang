import React, { useState, useContext } from 'react';
import { Input, Select, Button, Space } from 'antd';
import { SearchOutlined, ClearOutlined, FilterOutlined } from '@ant-design/icons';
import { ProductContext } from '../context/ProductContext';

const { Option } = Select;

const SearchBar = () => {
  const { products, filteredProducts, filterProducts, resetFilters } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  // Get unique categories from products
  const productCategories = [...new Set(products.map(product => product.Category))];

  const handleSearch = () => {
    filterProducts(searchTerm, categoryFilter, stockFilter);
  };

  const handleClear = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStockFilter('all');
    resetFilters(); // Reset to all products
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search Input */}
        <div className="flex-1 w-full md:w-auto">
          <Input
            placeholder="Cari produk berdasarkan nama atau deskripsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400" />}
            className="h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            size="large"
            onPressEnter={handleSearch}
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            className="w-full"
            size="large"
            placeholder="Pilih Kategori"
          >
            <Option value="all">
              <span className="flex items-center gap-2">
                <FilterOutlined /> Semua Kategori
              </span>
            </Option>
            {productCategories.map(category => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        {/* Stock Filter */}
        <div className="w-full md:w-48">
          <Select
            value={stockFilter}
            onChange={setStockFilter}
            className="w-full"
            size="large"
            placeholder="Filter Stok"
          >
            <Option value="all">Semua Stok</Option>
            <Option value="inStock">Stok Tersedia</Option>
            <Option value="outOfStock">Stok Habis</Option>
          </Select>
        </div>

        {/* Action Buttons */}
        <Space className="flex-shrink-0">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            size="large"
          >
            Cari
          </Button>
          <Button
            icon={<ClearOutlined />}
            onClick={handleClear}
            className="border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            size="large"
          >
            Reset
          </Button>
        </Space>
      </div>

      {/* Search Stats */}
      <div className="mt-4 text-sm text-gray-600">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </span>
      </div>
    </div>
  );
};

export default SearchBar;