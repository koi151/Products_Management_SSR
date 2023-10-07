const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productsCategorySchema = new mongoose.Schema({
  title: String,
  description: String,
  parent_id: {
    type: String,
    default: ""
  },
  thumbnail: String,
  position: Number,
  slug: { 
    type: String, 
    slug: "title",
    unique: true 
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
  },
  { timestamps: true }
)

const ProductsCategory = mongoose.model("productsCategory", productsCategorySchema, "productsCategory");

module.exports = ProductsCategory;