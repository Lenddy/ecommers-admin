import { Product } from "@/models/products";
import { mongooseConnect } from "@/lib/mongoose";

// Description: This is the API route for products
export default async function handle(req, res) {
	const { method } = req;
	// mongoose.Promise = clientPromise;
	await mongooseConnect();

	if (method === "GET") {
		if (req.query?.id) {
			res.json(await Product.findOne({ _id: req.query.id }));
		} else {
			res.json(await Product.find());
		}
	}

	if (method === "POST") {
		const { name, price, description } = req.body;
		const productDoc = await Product.create({ name, price, description });
		res.json(productDoc);
	}

	if (method === "PUT") {
		const { name, price, description, _id } = req.body;
		const productDoc = await Product.updateOne(
			{ _id: _id },
			{ name, price, description }
			// { new: true, runValidators: true }
		);
		res.json(true, productDoc);
	}
}

// export default handle;
