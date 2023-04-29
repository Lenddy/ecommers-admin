import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import axios from "axios";

const DeleteProductPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [productInfo, setProductInfo] = useState();

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get("/api/products?id=" + id).then((res) => {
			setProductInfo(res.data);
		});
	}, [id]);

	const goBack = () => {
		router.push("/products");
	};

	const deleteProduct = async () => {
		await axios.delete("/api/products?id=" + id);
		goBack();
	};

	return (
		<Layout>
			<h1 className="text-center">
				Do you really want to delete "{productInfo?.name}"?
			</h1>
			<div className=" flex gap-1 justify-center">
				<button className="btn-red" onClick={deleteProduct}>
					Yes
				</button>
				<button onClick={goBack} className="btn-default">
					{" "}
					No
				</button>
			</div>
		</Layout>
	);
};

export default DeleteProductPage;
