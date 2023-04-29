import Layout from "@/components/Layout";
import React from "react";

const catagories = () => {
	return (
		<Layout>
			<h1> Categories </h1>
			<label htmlFor=""> New CategoryName</label>
			<div className="flex gap-1">
				<input
					type="text"
					className=" mb-0"
					placeholder="Category Name"
				/>
				<button className=" btn-primary py-1">save</button>
			</div>
		</Layout>
	);
};

export default catagories;
