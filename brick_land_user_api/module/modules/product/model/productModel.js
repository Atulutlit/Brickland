const { model, Types, Schema } = require("mongoose");

const productModel = model(
  "products",
  new Schema(
    {
      productId: { type: String, index: true, unique: true },
      categoryId: { type: Types.ObjectId, required: true },
      // subCategoryId: { type: Types.ObjectId, required: true },
      productName: { type: String, index: true, unique: true, required: true },
      description: { type: String, index: true },
      url: { type: String, index: true },
      shortDescription: { type: String, index: true, required: true },
      productImg: [{ type: String }],
      price: { type: Number, required: true },
      specialPrice: { type: Number, required: true },
      benefits: { type: String },
      isBestSeller: { type: Boolean, default: false },
      vitamin: [{ type: String }],
      minerals: [{ type: String }],
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbohydrates: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      fiber: { type: Number, default: 0 },
      weight: { type: Number, default: 0 }, // in kg
      stock: { type: Number, default: 0 },
      totalSale: { type: Number, default: 0 },

      metaTitle: { type: String },
      metaDescription: { type: String },
      metaKeyword: { type: String },
      ratings: { type: Number, default: 0 },

      status: {
        type: String,
        enum: ["ACTIVE", "DEACTIVE"],
        default: "ACTIVE",
      },
      state: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING",
      },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { productModel };
