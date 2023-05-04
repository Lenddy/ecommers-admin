import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/categories";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();

	await isAdminRequest(req, res);

	// console.log("session", session);

	if (method === "GET") {
		res.json(await Category.find().populate("parent"));
	}

	if (method === "POST") {
		const { name, parentCategory, properties } = req.body;
		const categoryDoc = await Category.create({
			name,
			parent: parentCategory || undefined,
			properties,
		});
		res.json(categoryDoc);
	}

	if (method === "PUT") {
		const { name, parentCategory, properties, _id } = req.body;
		const categoryDoc = await Category.updateOne(
			{ _id },
			{
				name,
				parent: parentCategory || undefined,
				properties,
			},
			{ new: true }
		);
		res.json(categoryDoc);
	}

	if (method === "DELETE") {
		const { _id } = req.query;
		const categoryDoc = await Category.deleteOne({ _id });
		res.json("ok", categoryDoc);
	}
}
