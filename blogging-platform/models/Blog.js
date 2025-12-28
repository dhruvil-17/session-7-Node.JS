import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  thumbnailImage: {
    type: String
  },
  featuredImage: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema);