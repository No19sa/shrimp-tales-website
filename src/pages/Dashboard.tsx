import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useDashboardData } from '@/lib/useDashboardData';
import { supabase } from '@/lib/supabaseClient';
import NavBar from '@/components/NavBar';

const Dashboard = () => {
  const user = useAuthUser();
  const navigate = useNavigate();
  const { overview, orders, products, loading, setProducts, setOrders } = useDashboardData();
  const [orderDetails, setOrderDetails] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: '',
    species: '',
    price: '',
    discount_price: '',
    category: '',
    color: '',
    is_featured: false,
    is_new_arrival: false,
    stock: ''
  });
  const [editProduct, setEditProduct] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: '', description: '', image: '', species: '', price: '', discount_price: '', category: '', color: '', is_featured: false, is_new_arrival: false, stock: ''
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user && user.user_metadata?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleOrderStatusChange = async (orderId, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    setOrderDetails(details => details ? { ...details, status: newStatus } : details);
    setOrders(orders => orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('fish_products').insert([
        {
          id: crypto.randomUUID(),
          ...newProduct,
          price: parseFloat(newProduct.price),
          discount_price: newProduct.discount_price ? parseFloat(newProduct.discount_price) : null,
          stock: parseInt(newProduct.stock, 10),
          rating: 0,
        }
      ]).select();
      
      if (error) throw error;
      
      setShowAddProduct(false);
      setNewProduct({
        name: '', description: '', image: '', species: '', price: '', discount_price: '', 
        category: '', color: '', is_featured: false, is_new_arrival: false, stock: ''
      });
      
      const { data: productsData, error: fetchError } = await supabase.from('fish_products').select('*');
      if (fetchError) throw fetchError;
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product: ' + error.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setEditProductData({
      ...product,
      price: product.price?.toString() ?? '',
      discount_price: product.discount_price?.toString() ?? '',
      stock: product.stock?.toString() ?? ''
    });
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('fish_products').update({
        ...editProductData,
        price: parseFloat(editProductData.price),
        discount_price: editProductData.discount_price ? parseFloat(editProductData.discount_price) : null,
        stock: parseInt(editProductData.stock, 10),
      }).eq('id', editProduct.id);
      if (error) throw error;
      setEditProduct(null);
      setEditProductData({ name: '', description: '', image: '', species: '', price: '', discount_price: '', category: '', color: '', is_featured: false, is_new_arrival: false, stock: '' });
      const { data: productsData, error: fetchError } = await supabase.from('fish_products').select('*');
      if (fetchError) throw fetchError;
      setProducts(productsData || []);
    } catch (error) {
      alert('Failed to update product: ' + error.message);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
    { id: 'customers', label: 'Customers' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aqua-600"></div>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <nav className="flex space-x-2 border-b border-gray-200 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'border-b-2 border-aqua-600 text-aqua-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overview</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: 'Total Sales', value: overview.totalSales, icon: '💰' },
                      { label: 'Total Orders', value: overview.totalOrders, icon: '📦' },
                      { label: 'Total Revenue', value: `₹${overview.totalRevenue}`, icon: '₹' },
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-600">{item.label}</div>
                            <div className="text-xl font-bold text-aqua-600">{item.value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Orders</h3>
                    <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                      {overview.recentOrders.map(order => (
                        <li key={order.id} className="py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">Order #{order.id.slice(0, 8)}...</span>
                            <span className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</span>
                          </div>
                          <span className="capitalize text-aqua-600 font-medium text-sm">{order.status}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Low Stock Alerts</h3>
                    <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                      {overview.lowStock.map(product => (
                        <li key={product.id} className="py-2 flex justify-between items-center text-red-600 text-sm">
                          <span className="font-medium">{product.name}</span>
                          <span>Stock: {product.stock}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Management</h2>
                  <input
                    type="text"
                    placeholder="Search by status, date, customer..."
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-aqua-600"
                  />
                  <div className="max-h-[60vh] overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                      {orders.map(order => (
                        <li key={order.id} className="py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">Order #{order.id.slice(0, 8)}...</span>
                            <span className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</span>
                            <span className="capitalize text-aqua-600 font-medium text-sm">{order.status}</span>
                          </div>
                          <div className="flex gap-2 mt-2 sm:mt-0">
                            <select
                              className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-aqua-600"
                              value={order.status}
                              onChange={e => handleOrderStatusChange(order.id, e.target.value)}
                            >
                              <option value="placed">Placed</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              className="text-aqua-600 hover:text-aqua-800 text-sm font-medium"
                              onClick={() => setOrderDetails(order)}
                            >
                              View Details
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product Management</h2>
                  <button
                    className="mb-4 px-4 py-2 bg-aqua-600 text-white rounded-lg hover:bg-aqua-700 transition-colors duration-200"
                    onClick={() => setShowAddProduct(true)}
                  >
                    Add Product
                  </button>
                  <div className="max-h-[60vh] overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                      {products.map(product => (
                        <li key={product.id} className="py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                            <div>
                              <div className="font-medium text-gray-800">{product.name}</div>
                              <div className="text-xs text-gray-500">{product.category} | {product.color}</div>
                              <div className="text-xs text-gray-500">Stock: {product.stock}</div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2 sm:mt-0">
                            <button
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              onClick={() => handleEditProduct(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                              onClick={async () => {
                                await supabase.from('fish_products').delete().eq('id', product.id);
                                setProducts(products => products.filter(p => p.id !== product.id));
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'customers' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Activity</h2>
                  <div className="text-lg font-medium text-gray-600">Total Customers: {overview.customers}</div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Order Details Modal */}
      {orderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl"
              onClick={() => setOrderDetails(null)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
            <div className="space-y-3">
              <div><span className="font-semibold text-gray-700">Order ID:</span> {orderDetails.id}</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Status:</span>
                <select
                  className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-aqua-600"
                  value={orderDetails.status}
                  onChange={e => handleOrderStatusChange(orderDetails.id, e.target.value)}
                >
                  <option value="placed">Placed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div><span className="font-semibold text-gray-700">Date:</span> {new Date(orderDetails.created_at).toLocaleString()}</div>
              <div><span className="font-semibold text-gray-700">User ID:</span> {orderDetails.user_id}</div>
              <div>
                <span className="font-semibold text-gray-700">Items:</span>
                <ul className="divide-y divide-gray-200 mt-2 max-h-60 overflow-y-auto">
                  {orderDetails.order_items.map(item => (
                    <li key={item.id} className="py-2 flex items-center gap-3">
                      <img src={item.fish_products?.image} alt={item.fish_products?.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{item.fish_products?.name}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-bold text-aqua-600">₹{item.price}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative" onSubmit={handleAddProduct}>
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl"
              onClick={() => setShowAddProduct(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Product</h2>
            <div className="grid grid-cols-1 gap-3">
              <input
                required
                value={newProduct.name}
                onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))}
                placeholder="Name"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <textarea
                required
                value={newProduct.description}
                onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))}
                placeholder="Description"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
                rows={3}
              />
              <input
                required
                value={newProduct.image}
                onChange={e => setNewProduct(p => ({ ...p, image: e.target.value }))}
                placeholder="Image URL"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <input
                value={newProduct.species}
                onChange={e => setNewProduct(p => ({ ...p, species: e.target.value }))}
                placeholder="Species"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <input
                required
                type="number"
                value={newProduct.price}
                onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))}
                placeholder="Price"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <input
                type="number"
                value={newProduct.discount_price}
                onChange={e => setNewProduct(p => ({ ...p, discount_price: e.target.value }))}
                placeholder="Discount Price"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <select
                required
                value={newProduct.category}
                onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}
                className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-aqua-600"
              >
                <option value="" disabled>Select Category</option>
                <option value="Shrimp">Shrimp</option>
                <option value="Fish">Fish</option>
                <option value="Food">Food</option>
                <option value="Care">Care</option>
                <option value="Combo">Combo</option>
              </select>
              <select
                required
                value={newProduct.color}
                onChange={e => setNewProduct(p => ({ ...p, color: e.target.value }))}
                className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-aqua-600"
              >
                <option value="" disabled>Select Color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
                <option value="Brown">Brown</option>
                <option value="Green">Green</option>
                <option value="Multicolor">Multicolor</option>
              </select>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newProduct.is_featured}
                    onChange={e => setNewProduct(p => ({ ...p, is_featured: e.target.checked }))}
                    className="h-4 w-4 text-aqua-600 focus:ring-aqua-600 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newProduct.is_new_arrival}
                    onChange={e => setNewProduct(p => ({ ...p, is_new_arrival: e.target.checked }))}
                    className="h-4 w-4 text-aqua-600 focus:ring-aqua-600 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">New Arrival</span>
                </label>
              </div>
              <input
                required
                type="number"
                value={newProduct.stock}
                onChange={e => setNewProduct(p => ({ ...p, stock: e.target.value }))}
                placeholder="Stock"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-aqua-600 text-white px-4 py-2 rounded-lg hover:bg-aqua-700 transition-colors duration-200"
            >
              Add Product
            </button>
          </form>
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative" onSubmit={handleEditProductSubmit}>
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl"
              onClick={() => setEditProduct(null)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Product</h2>
            <div className="grid grid-cols-1 gap-3">
              <input
                required
                value={editProductData.name}
                onChange={e => setEditProductData(p => ({ ...p, name: e.target.value }))}
                placeholder="Name"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <textarea
                required
                value={editProductData.description}
                onChange={e => setEditProductData(p => ({ ...p, description: e.target.value }))}
                placeholder="Description"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2xl"
                rows={3}
              />
              <input
                required
                value={editProductData.image}
                onChange={e => setEditProductData(p => ({ ...p, image: e.target.value }))}
                placeholder="Image URL"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <input
                value={editProductData.species}
                onChange={e => setEditProductData(p => ({ ...p, species: e.target.value }))}
                placeholder="Species"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <input
                required
                type="number"
                value={editProductData.price}
                onChange={e => setEditProductData(p => ({ ...p, price: e.target.value }))}
                placeholder="Price"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <input
                type="number"
                value={editProductData.discount_price}
                onChange={e => setEditProductData(p => ({ ...p, discount_price: e.target.value }))}
                placeholder="Discount Price"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
              <select
                required
                value={editProductData.category}
                onChange={e => setEditProductData(p => ({ ...p, category: e.target.value }))}
                className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-aqua-600"
              >
                <option value="" disabled>Select Category</option>
                <option value="Shrimp">Shrimp</option>
                <option value="Fish">Fish</option>
                <option value="Food">Food</option>
                <option value="Care">Care</option>
                <option value="Combo">Combo</option>
              </select>
              <select
                required
                value={editProductData.color}
                onChange={e => setEditProductData(p => ({ ...p, color: e.target.value }))}
                className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-aqua-600"
              >
                <option value="" disabled>Select Color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
                <option value="Brown">Brown</option>
                <option value="Green">Green</option>
                <option value="Multicolor">Multicolor</option>
              </select>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editProductData.is_featured}
                    onChange={e => setEditProductData(p => ({ ...p, is_featured: e.target.checked }))}
                    className="h-4 w-4 text-aqua-600 focus:ring-aqua-600 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editProductData.is_new_arrival}
                    onChange={e => setEditProductData(p => ({ ...p, is_new_arrival: e.target.checked }))}
                    className="h-4 w-4 text-aqua-600 focus:ring-aqua-600 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">New Arrival</span>
                </label>
              </div>
              <input
                required
                type="number"
                value={editProductData.stock}
                onChange={e => setEditProductData(p => ({ ...p, stock: e.target.value }))}
                placeholder="Stock"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-600"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-aqua-600 text-white px-4 py-2 rounded-lg hover:bg-aqua-700 transition-colors duration-200"
            >
              Update Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;