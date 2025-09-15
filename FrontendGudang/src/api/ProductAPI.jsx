
import axios from 'axios';

export const BASEURL = 'http://localhost:5000';
const API_PRODUCT = `${BASEURL}/api/products`;

// Get all products
export const getProducts = async () => {
	const response = await axios.get(API_PRODUCT);
	return response.data;
};

// Get product by ID
export const getProductById = async (id) => {
	const response = await axios.get(`${API_PRODUCT}/${id}`);
	return response.data;
};

// Create new product (with thumbnail upload)
export const createProduct = async (formData) => {
	const response = await axios.post(API_PRODUCT, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return response.data;
};

// Update product (with thumbnail upload)
export const updateProduct = async (id, formData) => {
	const response = await axios.patch(`${API_PRODUCT}/${id}`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
	const response = await axios.delete(`${API_PRODUCT}/${id}`);
	return response.data;
};
