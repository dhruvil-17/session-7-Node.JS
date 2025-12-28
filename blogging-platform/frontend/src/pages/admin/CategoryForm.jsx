import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryAPI } from '../../services/api';
import AdminLayout from '../../components/Layout/AdminLayout';

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      const category = response.data.find(c => c._id === id);
      if (category) {
        setFormData({
          name: category.name
        });
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      setError('Error loading category');
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
        await categoryAPI.updateCategory(id, formData);
      } else {
        await categoryAPI.createCategory(formData);
      }
      navigate('/admin/categories');
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isEdit ? 'Edit Category' : 'Add New Category'}
        </h1>

        <div className="bg-white shadow rounded-lg p-6 max-w-md">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Category Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/categories')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Category' : 'Create Category')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryForm;