import Layout from "@/components/layout";
import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const ProductForm = ({
	_id,
	name: existingName,
	description: existingDescription,
	price: existingPrice,
}) => {
	const [name, setName] = useState(existingName || "");
	const [description, setDescription] = useState(existingDescription || "");
	const [price, setPrice] = useState(existingPrice || "");
	const data = { name, description, price };
	const [goToProducts, setGoToProducts] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (_id) {
			await axios.put("/api/products/", { ...data, _id });
		} else {
			await axios.post("/api/products", data);
		}
		setGoToProducts(true);
	};

	if (goToProducts) {
		router.push("/products");
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label> Product Name </label>
				<input
					type="text"
					placeholder="Product name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label> Product Description </label>
				<textarea
					placeholder="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<label> Product Price </label>
				<input
					type="number"
					step={0.01}
					placeholder="price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<button className="btn-primary" type="submit">
					Save
				</button>
			</form>
		</div>
	);
};

export default ProductForm;
