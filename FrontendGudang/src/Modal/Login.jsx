import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { signIn } from "../api/SignInAPI";
import { Form, Input, Button } from "antd";
import { AuthContext } from "../context/AuthContext";

const Login = ({ isOpen = true, onClose }) => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const onFinish = async (values) => {
		setLoading(true);
		setError("");
		try {
			const data = await signIn({
				name: values.name,
				password: values.password.trim()
			});
			login(data); // simpan ke global state
			setLoading(false);
			if (onClose) onClose();
			console.log("Login berhasil:", data);
			navigate("/");
		} catch (err) {
			setLoading(false);
			setError(
				err.response?.data?.message || "Login gagal. Cek name dan password."
			);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h2 className="text-xl font-bold mb-4">Login</h2>
			{error && <div className="mb-2 text-red-500 text-sm">{error}</div>}
			<Form
				layout="vertical"
				onFinish={onFinish}
				className="space-y-4"
				autoComplete="off"
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: "Masukkan name!" }]}
				>
					<Input autoFocus />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: "Masukkan password!" }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						className="w-full bg-blue-600 hover:bg-blue-700"
						style={{ borderRadius: 6 }}
					>
						Login
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default Login;