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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isEdit ? 'Edit Blog' : 'Add New Blog'}
        </h1>

        <div className="bg-white shadow rounded-lg p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={10}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your blog content here..."
              />
            </div>

            <div>
              <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700">
                Publish Date
              </label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.publishDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="thumbnailImage" className="block text-sm font-medium text-gray-700">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                id="thumbnailImage"
                name="thumbnailImage"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.thumbnailImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">
                Featured Image URL
              </label>
              <input
                type="url"
                id="featuredImage"
                name="featuredImage"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.featuredImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/blogs')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
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