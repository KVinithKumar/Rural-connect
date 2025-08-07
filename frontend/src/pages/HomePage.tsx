import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Phone, Mail, MapPin, Truck, Heart, Shield, Clock, Users, Package, Star, Calendar, TrendingUp, Filter, Grid, List } from 'lucide-react';
import axios from 'axios';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  icon: string;
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

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [servicesRes, productsRes, newsRes] = await Promise.all([
        axios.get('/api/services'),
        axios.get('/api/products'),
        axios.get('/api/news')
      ]);
      
      setServices(servicesRes.data);
      setProducts(productsRes.data);
      setNews(newsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', contactForm);
      setSubmitStatus('success');
      setContactForm({ name: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const getIcon = (iconName: string) => {
    const icons = {
      truck: Truck,
      heart: Heart,
      shield: Shield,
      clock: Clock,
      users: Users,
      package: Package
    };
    return icons[iconName as keyof typeof icons] || Package;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700 text-lg font-medium">Loading Rural Connect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn leading-tight">
              Connecting Rural
              <span className="block text-green-200">Communities</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-4xl mx-auto leading-relaxed">
              Bridging the gap between rural communities and essential services. Access quality products, healthcare, and support with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => onNavigate('signup')}
                className="bg-white text-green-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
              >
                Start Your Journey
              </button>
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Explore Products
              </button>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">500+</div>
                <div className="text-green-100">Villages Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">10,000+</div>
                <div className="text-green-100">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">24/7</div>
                <div className="text-green-100">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive services designed to meet the unique needs of rural communities with modern technology and traditional care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <div 
                  key={service._id} 
                  className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-green-100 relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-bl-full opacity-50"></div>
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl mr-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
                  <div className="mt-6 flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    <span>Learn More</span>
                    <TrendingUp className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Quality Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Carefully curated products delivered directly to your doorstep in rural areas with guaranteed quality and competitive prices.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-12 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg appearance-none bg-white min-w-[200px]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-md text-green-600' : 'text-gray-500'}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-md text-green-600' : 'text-gray-500'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
            : "space-y-6"
          }>
            {filteredProducts.map((product, index) => (
              <div 
                key={product._id} 
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  viewMode === 'list' ? 'flex items-center p-6' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={viewMode === 'list' ? 'flex-shrink-0 mr-6' : ''}>
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-24 h-24 rounded-xl' : 'h-48'}`}>
                    <img
                      src={product.image || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        product.inStock 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(product.category)}`}>
                      {product.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                  
                  <div className={`flex items-center justify-between ${viewMode === 'list' ? 'mt-4' : ''}`}>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                      <div className="ml-3 flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                        <span className="ml-1 text-sm text-gray-500">(4.8)</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => onNavigate('signup')}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-105"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Latest News & Updates</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay informed about the latest developments in rural community services and government initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item, index) => (
              <article 
                key={item._id} 
                className="group bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${getCategoryColor(item.category)}`}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>
                
                <div className="flex items-center text-green-600 hover:text-green-700 cursor-pointer font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Read Full Article</span>
                  <TrendingUp className="h-5 w-5 ml-2" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions or need support? Our dedicated team is here to help rural communities thrive and succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-10">
              <div className="flex items-start space-x-6 group">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Visit Our Office</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Rural Connect Head Office<br />
                    123 Community Development Street<br />
                    Rural Innovation Hub, Block A<br />
                    Bangalore, Karnataka 560001<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Call Us Anytime</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    24/7 Helpline: <span className="font-bold text-green-600">+91-1800-123-4567</span><br />
                    WhatsApp Support: <span className="font-bold text-green-600">+91-9876-543-210</span><br />
                    Emergency Line: <span className="font-bold text-red-600">+91-1800-EMERGENCY</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 group">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Support</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    General Inquiries: <span className="font-semibold">support@ruralconnect.in</span><br />
                    Technical Support: <span className="font-semibold">tech@ruralconnect.in</span><br />
                    Emergency: <span className="font-semibold">emergency@ruralconnect.in</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg transition-colors resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Send Message
                </button>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl text-center font-semibold">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center font-semibold">
                    ❌ Failed to send message. Please try again or call us directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;