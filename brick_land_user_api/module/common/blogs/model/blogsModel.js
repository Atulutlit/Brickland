// models/blogsModel.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  active:{
    type: Boolean,
    default : false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Define the feature schema
const featureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  paragraph: {
    type: String,
    required: true
  }
});

// Define the schema
const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true,
    trim: true // Removes whitespace from the beginning and end
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tag: {
    type: [String], // Array of strings
    required: false
  },
  mainImg: {
    type: String,
    required: true
  },
  authorImg: {
    type: String,
    required: false
  },
  adminImg: {
    type: String,
    required: false
  },
  relatedImg1: {
    type: String,
    required: false
  },
  relatedImg2: {
    type: String,
    required: false
  },
  conclusionTitle: {
    type: String,
    required: false
  },
  conclusionInner: {
    type: String,
    required: false
  },
  features: {
    type: [featureSchema], // Array of strings
    required: false
  },
  comment:{
   type :[commentSchema],
   required: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model
const blogsModel = mongoose.model('blogs', blogSchema);

// Export the model
module.exports = blogsModel;
