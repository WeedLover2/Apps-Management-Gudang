import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { signIn } from "../api/SignInAPI";


const Login = ({ isOpen = true, onClose, onSuccess }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const data = await signIn({ username, password });
			setLoading(false);
			if (onSuccess) onSuccess(data);
			if (onClose) onClose();
			// Navigasi ke halaman utama setelah login sukses
			navigate("/");
		} catch (err) {
			setLoading(false);
			setError(
				err.response?.data?.message || "Login gagal. Cek username dan password."
			);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h2 className="text-xl font-bold mb-4">Login</h2>
			{error && (
				<div className="mb-2 text-red-500 text-sm">{error}</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1">Username</label>
					<input
						type="text"
						className="w-full border rounded px-3 py-2"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label className="block mb-1">Password</label>
					<input
						type="password"
						className="w-full border rounded px-3 py-2"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
					disabled={loading}
				>
					{loading ? "Loading..." : "Login"}
				</button>
			</form>
		</Modal>
	);
};

export default Login;
