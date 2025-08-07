import React, { useState, useEffect } from 'react';
import { User, Package, ShoppingCart, Edit, Save, X, Plus, Minus, Trash2, Star, Filter, Search, Calendar, TrendingUp } from 'lucide-react';
import { User as UserType } from '../App';
import axios from 'axios';

interface DashboardProps {
  user: UserType;
  onNavigate: (page: string) => void;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  image?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Booking {
  _id: string;
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    phone: user.phone || ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchBookings();
    loadCart();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data.bookings || response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCart = (newCart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product._id === product._id);
    if (existingItem) {
      const newCart = cart.map(item =>
        item.product._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCart(newCart);
    } else {
      const newCart = [...cart, { product, quantity: 1 }];
      saveCart(newCart);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      const newCart = cart.map(item =>
        item.product._id === productId 
          ? { ...item, quantity }
          : item
      );
      saveCart(newCart);
    }
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.product._id !== productId);
    saveCart(newCart);
  };

  const placeOrder = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        totalAmount
      };

      await axios.post('/api/bookings', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      saveCart([]);
      fetchBookings();
      setActiveTab('bookings');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/auth/profile', profileForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingProfile(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const totalCartAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      groceries: 'bg-green-100 text-green-800',
      medicines: 'bg-red-100 text-red-800',
      household: 'bg-blue-100 text-blue-800',
      electronics: 'bg-purple-100 text-purple-800',
      agriculture: 'bg-yellow-100 text-yellow-800',
      clothing: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-xl text-gray-600">Manage your account and track your orders with ease</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-8">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'products', label: 'Products', icon: Package },
                { id: 'cart', label: `Cart (${cart.length})`, icon: ShoppingCart },
                { id: 'bookings', label: 'My Orders', icon: Package }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 py-6 px-2 border-b-2 font-semibold text-lg transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold"
                >
                  {editingProfile ? <X className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
                  <span>{editingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {editingProfile ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">Phone</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    />
                  </div>
                  <button
                    onClick={updateProfile}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-semibold"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Name</label>
                    <p className="text-xl text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
                    <p className="text-xl text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Phone</label>
                    <p className="text-xl text-gray-900">{user.phone || 'Not provided'}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                  <div>
                    <span className="text-green-700 font-semibold text-lg">Items in Cart</span>
                    <div className="text-3xl font-bold text-green-900">{cart.length}</div>
                  </div>
                  <ShoppingCart className="h-12 w-12 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <div>
                    <span className="text-blue-700 font-semibold text-lg">Total Orders</span>
                    <div className="text-3xl font-bold text-blue-900">{bookings.length}</div>
                  </div>
                  <Package className="h-12 w-12 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                  <div>
                    <span className="text-purple-700 font-semibold text-lg">Cart Value</span>
                    <div className="text-3xl font-bold text-purple-900">₹{totalCartAmount}</div>
                  </div>
                  <TrendingUp className="h-12 w-12 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Products</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={product.image || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500';
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(product.category)}`}>
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">(4.8)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                        <button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-600 mb-4">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to get started</p>
                <button
                  onClick={() => setActiveTab('products')}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 font-semibold"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div>
                <div className="space-y-6 mb-8">
                  {cart.map((item) => (
                    <div key={item.product._id} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.product.image || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500'}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">{item.product.name}</h3>
                          <p className="text-gray-600">₹{item.product.price} each</p>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getCategoryColor(item.product.category)}`}>
                            {item.product.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-semibold text-lg min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        
                        <div className="text-right min-w-[100px]">
                          <span className="text-xl font-bold text-green-600">₹{item.product.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">Total: ₹{totalCartAmount}</span>
                      <p className="text-gray-600">Including all taxes and fees</p>
                    </div>
                    <button
                      onClick={placeOrder}
                      disabled={isLoading}
                      className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Placing Order...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h2>
            
            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-600 mb-4">No orders yet</h3>
                <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                <button
                  onClick={() => setActiveTab('products')}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 font-semibold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="font-bold text-lg">Order #{booking._id.slice(-8).toUpperCase()}</span>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <span className={`px-4 py-2 text-sm font-bold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Items Ordered:</h4>
                      <div className="space-y-2">
                        {booking.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.product.image || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500'}
                                alt={item.product.name}
                                className="w-10 h-10 object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500';
                                }}
                              />
                              <span className="font-medium">{item.product.name}</span>
                            </div>
                            <div className="text-right">
                              <div>Qty: {item.quantity}</div>
                              <div className="font-semibold">₹{item.price * item.quantity}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        {booking.items.length} item{booking.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">₹{booking.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;