import { Schema, model } from "mongoose";

const carritoSchema = new Schema({
  products: {
    type: Array,
    default: [],
  }, 
},{
    timestamps: true,
    versionKey: false,
  }
);

export default model("Carrito", carritoSchema);
