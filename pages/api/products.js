import { Product } from "@/models/products";
import { mongooseConnect } from "@/lib/mongoose";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

// Description: This is the API route for products
export default async function handle(req, res) {
	const { method } = req;
	// mongoose.Promise = clientPromise;
	await mongooseConnect();
	await isAdminRequest(req, res);

	if (method === "GET") {
		if (req.query?.id) {
			res.json(await Product.findOne({ _id: req.query.id }));
		} else {
			res.json(await Product.find());
		}
	}

	if (method === "POST") {
		const { name, price, description, images, category, properties } =
			req.body;
		const productDoc = await Product.create({
			name,
			price,
			description,
			images,
			category,
			properties,
		});
		res.json(productDoc);
	}

	if (method === "PUT") {
		const { name, price, description, images, category, properties, _id } =
			req.body;
		const productDoc = await Product.updateOne(
			{ _id: _id },
			{ name, price, description, images, category, properties }
			// { new: true, runValidators: true }
		);
		res.json(true, productDoc);
	}

	if (method === "DELETE") {
		if (req.query?.id) {
			await Product.deleteOne({ _id: req.query.id });
			res.json(true);
		}
	}
}

// export default handle;
