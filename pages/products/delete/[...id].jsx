import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

const DeleteProductPage = () => {
	const router = useRouter();
	const goBack = () => {
		router.push("/products");
	};
	return (
		<Layout>
			<h1> Do you really want to delete this product? </h1>
			<button>Yes</button>
			<button onClick={goBack}> No</button>
		</Layout>
	);
};

export default DeleteProductPage;
