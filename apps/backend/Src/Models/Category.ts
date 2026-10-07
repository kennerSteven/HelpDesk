import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  nameCategory: {
    type: String,
    required: true,
  },
  descriptionCategory: {
    type: String,
    required: false,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
