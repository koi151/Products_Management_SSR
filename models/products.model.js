const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  featured: String,
  product_category_id: {
    type: String,
    default: ""
  },
  slug: { 
    type: String, 
    slug: "title",
    unique: true 
  },
  deleted: {
    type: Boolean,
    default: false
  },
  createdBy: {
    account_id: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  updatedBy: [
    {
    account_id: String,
    updatedAt: Date
    }
  ],
  deletedBy: {
    account_id: String,
    deletedAt: Date
  },
},
  // { timestamps: true }
)

const Product = mongoose.model("products", productsSchema, "products");

module.exports = Product;