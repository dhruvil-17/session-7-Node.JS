import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryAPI } from '../../services/api';
import AdminLayout from '../../components/Layout/AdminLayout';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryAPI.deleteCategory(id);
        setCategories(categories.filter(category => category._id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error deleting category');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading">
          <div>Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>All Categories</h1>
          <Link to="/admin/categories/new" className="btn btn-primary">
            Add New Category
          </Link>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', color: '#6b7280' }}>
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id}>
                    <td>
                      <div style={{ fontWeight: '500' }}>
                        {category.name}
                      </div>
                    </td>
                    <td style={{ color: '#6b7280' }}>
                      {formatDate(category.createdAt)}
                    </td>
                    <td>
                      <Link
                        to={`/admin/categories/${category._id}/edit`}
                        className="btn btn-primary"
                        style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', marginRight: '0.5rem' }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="btn btn-danger"
                        style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryList;