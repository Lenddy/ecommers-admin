import mongoose, { Schema, model, models } from "mongoose";

const ProductsSchema = new Schema(
	{
		name: {
			type: String,
			require: [true, "this product needs a name"],
			minLength: [2, "title must be at least 2 characters long"],
		},

		price: {
			type: Number,
			require: [true, "this product needs a price"],
		},

		description: {
			type: String,
			// require: [true,"this product needs a description"],
		},
		images: [{ type: String }],
		category: { type: mongoose.Types.ObjectId, ref: "Category" },
		properties: {type:Object},
	},
	{ timestamps: true }
);

export const Product = models.Product || model("Product", ProductsSchema);

// module.exports = Product;
