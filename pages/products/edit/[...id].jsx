import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

const editProductsPage = () => {
	const [productInfo, setProductInfo] = useState(null);
	const router = useRouter();
	const { id } = router.query;
	console.log(router);
	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get("/api/products?id=" + id).then((res) => {
			setProductInfo(res.data);
		});
	}, [id]);

	console.log(router);
	return (
		<Layout>
			<h1>Edit Products</h1>
			{productInfo && <ProductForm {...productInfo} />}
		</Layout>
	);
};

export default editProductsPage;
