import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI, categoryAPI } from '../../services/api';
import AdminLayout from '../../components/Layout/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalCategories: 0
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [blogsResponse, categoriesResponse] = await Promise.all([
        blogAPI.getAllBlogs(),
        categoryAPI.getAllCategories()
      ]);

      setStats({
        totalBlogs: blogsResponse.data.length,
        totalCategories: categoriesResponse.data.length
      });

      setRecentBlogs(blogsResponse.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBlogs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Categories</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCategories}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Blogs</h2>
          </div>
          <div className="p-6">
            {recentBlogs.length === 0 ? (
              <p className="text-gray-500">No blogs found.</p>
            ) : (
              <div className="space-y-4">
                {recentBlogs.map((blog) => (
                  <div key={blog._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{blog.title}</h3>
                      <p className="text-sm text-gray-500">{blog.category?.name}</p>
                    </div>
                    <Link
                      to={`/admin/blogs/${blog._id}/edit`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;