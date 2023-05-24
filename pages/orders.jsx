import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		axios.get("/api/orders").then((res) => {
			setOrders(res.data);
		});
	}, []);
	return (
		<Layout>
			<h1>Orders</h1>
			<table className="basic">
				<thead>
					<tr>
						<th>ID</th>
						<th>Recipient</th>
						<th>Products</th>
					</tr>
					<tbody>
						{orders.length > 0 &&
							orders.map((order) => (
								<tr>
									<td>{order._id}</td>
									<td>
										{order.name} {order.email} <br />
										<br />
										{order.city} {order.postalCode}{" "}
										{order.country} <br />
										{order.streetAddress}
									</td>
									<td>hello</td>
								</tr>
							))}
					</tbody>
				</thead>
			</table>
		</Layout>
	);
};

export default OrdersPage;
