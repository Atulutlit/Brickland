// Import mongoose
const mongoose = require('mongoose');

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
    type: [String], // Array of strings
    required: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model
const Blog = mongoose.model('blogs', blogSchema);

// Export the model
module.exports = Blog;
