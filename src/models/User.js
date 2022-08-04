const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  firstname: { type: String, required: true, max: 100 },
  address: { type: String, required: true, max: 200 },
  phonenumber: { type: String, required: true, max: 100 },
  age: { type: Number, required: true, max: 100 },
});

export default model("User", userSchema);
