import Layout from "@/components/layout";
import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
	_id,
	name: existingName,
	description: existingDescription,
	price: existingPrice,
	images: existingImages,
}) => {
	const [name, setName] = useState(existingName || "");
	const [description, setDescription] = useState(existingDescription || "");
	const [price, setPrice] = useState(existingPrice || "");
	const [images, setImages] = useState(existingImages || []);
	const [goToProducts, setGoToProducts] = useState(false);
	const [uploadingFiles, setUploadingFiles] = useState(false);
	const router = useRouter();
	const data = { name, description, price, images };

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (_id) {
			await axios.put("/api/products", { ...data, _id });
		} else {
			await axios.post("/api/products", data);
		}
		setGoToProducts(true);
	};

	if (goToProducts) {
		router.push("/products");
	}

	const uploadImages = async (e) => {
		// console.log("entering the uploadImages function");
		const files = e.target?.files;

		if (files?.length > 0) {
			setUploadingFiles(true);
			const data = new FormData();
			for (const file of files) {
				data.append("file", file);
			}
			const res = await axios.post("/api/upload", data);
			setImages((oldImages) => {
				return [...oldImages, ...res.data.links];
			});
			setUploadingFiles(false);
		}
	};

	const updateImagesOrder = (images) => {
		setImages(images);
	};

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

				<label> Photos </label>
				<div className=" mb-2 flex flex-wrap gap-2">
					<ReactSortable
						className="flex flex-wrap gap-1"
						list={images}
						setList={updateImagesOrder}
					>
						{!!images?.length &&
							images.map((link) => (
								<div key={link} className=" h-24 ">
									<img
										src={link}
										alt=""
										className=" rounded-md"
									/>
								</div>
							))}
					</ReactSortable>
					{uploadingFiles && (
						<div className="h-24 bg-gray-200 p-1 flex items-center rounded-md">
							{" "}
							<Spinner />
						</div>
					)}
					{/* {!images?.length && <p>No photos of this product</p>} */}
					<label className=" cursor-pointer w-24 h-24   text-center flex items-center justify-center text-sm gap-1 text-gray-700 rounded-lg bg-gray-300 ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
							/>
						</svg>
						<div>Upload</div>

						<input
							type="file"
							className="hidden"
							onChange={uploadImages}
						/>
					</label>
				</div>

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
