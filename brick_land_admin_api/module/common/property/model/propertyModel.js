const mongoose = require("mongoose");

const propertyModel = mongoose.model(
  "properties", new mongoose.Schema(
    {
      // RER_NO:
      propertyId: { type: String, index: true, unique: true, required: false },
      url: { type: String, required: false},
      propertyName: { type: String, required: false },
      propertyImg: { type: [String], required:false,
        validate: { validator: function(value) {
            return value.length > 0; // Array must have at least one element
          },
          message: 'propertyImg must have at least one string.'
        }
      },
      category: { type: String , required:false},
      propertyType: { type: String, required: false },
      description: { type: String, required: false },
      shortDescription: { type: String, required: false },
      price: { type: String, required: false },
      specialPrice: { type: String ,required: false },
      features: { type: [String] },
      isBestSeller: { type: Boolean, default: false },
      bedrooms: { type: Number, required: false },
      bathrooms: { type: Number, required: false },
      kitchen: { type: Number, required: false },
      parking: { type: Number, required: false },
      address: { type: String, required: false },
      area: { type: String, required: false },
      floorPlan : { type:String, required:false },
      isFurnished: { type: Boolean, default: false },
      accommodation: { type: String, required: false },
      locationAdvantage: { type:[String],required: true},
      status: { type: String, enum: ["UNDER_CONSTRUCTION", "READY_TO_MOVE","NEW_LAUNCH"], default: "ACTIVE" },
      state: { type: String, enum: ["APPROVED", "PENDING", "REJECTED"], default: "APPROVED" },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  )
);

module.exports = { propertyModel };
