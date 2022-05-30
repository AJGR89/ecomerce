import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sku: {
    type: Number,
    required: true,
    unique: true,
  },
},{
  timestamps: true,
  versionKey: false,
}
);

export default model("Product", productSchema);
