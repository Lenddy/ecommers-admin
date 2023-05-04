// const { Schema, model, models } = require("mongoose");
// const mongoose = require("mongoose");
import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
	name: { type: String, required: true }, //, unique: true
	parent: { type: mongoose.Types.ObjectId, ref: "Category" }, //ref: "Category"
	properties: [{ type: Object }], //ref: "Property"
});

export const Category = models.Category || model("Category", CategorySchema);
