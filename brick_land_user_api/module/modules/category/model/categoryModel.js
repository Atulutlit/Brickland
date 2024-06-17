const { model, Types, Schema } = require("mongoose");

const categoryModel = model(
  "categories",
  new Schema(
    {
      parentId: { type: Types.ObjectId },
      categoryId: { type: String, required: true, index: true },
      categoryName: { type: String, index: true, required: true, trim: true },
      categoryImg: { type: String },
      description: { type: String },
      url: { type: String },
      slug: { type: String },
      type: {
        type: String,
        enum: ["ROOT", "PARENT", "CHILD", "SUBCHILD"],
        default: "ROOT",
      },

      status: {
        type: String,
        enum: ["ACTIVE", "DEACTIVE"],
        default: "ACTIVE",
      },

      metaTitle: String,
      metaDescription: String,
      metaKeyword: String,

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { categoryModel };
