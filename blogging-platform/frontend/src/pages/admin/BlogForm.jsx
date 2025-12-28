import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogAPI, categoryAPI } from '../../services/api';
import AdminLayout from '../../components/Layout/AdminLayout';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    publishDate: '',
    thumbnailImage: '',
    featuredImage: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchBlog();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      const blog = response.data.find(b => b._id === id);
      if (blog) {
        setFormData({
          title: blog.title,
          description: blog.description,
          category: blog.category._id,
          publishDate: new Date(blog.publishDate).toISOString().split('T')[0],
          thumbnailImage: blog.thumbnailImage || '',
          featuredImage: blog.featuredImage || ''
        });
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Error loading blog');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await blogAPI.updateBlog(id, formData);
      } else {
        await blogAPI.createBlog(formData);
      }
      navigate('/admin/blogs');
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          {isEdit ? 'Edit Blog' : 'Add New Blog'}
        </h1>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="form-input"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="publishDate" className="form-label">
                Publish Date
              </label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                className="form-input"
                value={formData.publishDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="thumbnailImage" className="form-label">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                id="thumbnailImage"
                name="thumbnailImage"
                className="form-input"
                value={formData.thumbnailImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="featuredImage" className="form-label">
                Featured Image URL
              </label>
              <input
                type="url"
                id="featuredImage"
                name="featuredImage"
                className="form-input"
                value={formData.featuredImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => navigate('/admin/blogs')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Blog' : 'Create Blog')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogForm;