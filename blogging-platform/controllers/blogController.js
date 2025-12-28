import Blog from '../models/Blog.js';

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('category').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('category');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, description, category, publishDate, thumbnailImage, featuredImage } = req.body;
    
    const slug = generateSlug(title);
    
    const blog = new Blog({
      title,
      slug,
      description,
      category,
      publishDate: publishDate || new Date(),
      thumbnailImage,
      featuredImage
    });

    await blog.save();
    const populatedBlog = await Blog.findById(blog._id).populate('category');
    res.status(201).json(populatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, description, category, publishDate, thumbnailImage, featuredImage } = req.body;
    
    const updateData = {
      title,
      description,
      category,
      publishDate,
      thumbnailImage,
      featuredImage
    };

    if (title) {
      updateData.slug = generateSlug(title);
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('category');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const searchBlogs = async (req, res) => {
  try {
    const { q } = req.query;
    const blogs = await Blog.find({
      title: { $regex: q, $options: 'i' }
    }).populate('category').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};