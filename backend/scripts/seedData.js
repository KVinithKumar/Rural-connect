import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';
import Product from '../models/Product.js';
import News from '../models/News.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedServices = async () => {
  const services = [
    {
      name: 'Home Delivery',
      description: 'Fast and reliable delivery of essential products directly to your doorstep in rural areas.',
      icon: 'truck'
    },
    {
      name: 'Healthcare Support',
      description: 'Access to medicines, health consultations, and medical supplies for rural communities.',
      icon: 'heart'
    },
    {
      name: 'Quality Assurance',
      description: 'All products are quality-checked and guaranteed to meet safety standards.',
      icon: 'shield'
    },
    {
      name: '24/7 Support',
      description: 'Round-the-clock customer support to help with your orders and inquiries.',
      icon: 'clock'
    },
    {
      name: 'Community Connect',
      description: 'Connecting rural communities with local businesses and service providers.',
      icon: 'users'
    },
    {
      name: 'Bulk Orders',
      description: 'Special pricing and arrangements for bulk orders for communities and groups.',
      icon: 'package'
    }
  ];

  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('✅ Services seeded successfully');
};

const seedProducts = async () => {
  const products = [
    // Groceries
    {
      name: 'Premium Basmati Rice (5kg)',
      description: 'Premium quality aged basmati rice, perfect for daily meals and special occasions.',
      price: 450,
      category: 'groceries',
      inStock: true,
      stockQuantity: 100,
      image: 'https://images.pexels.com/photos/33239/rice-grain-seed-food.jpg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Whole Wheat Flour (10kg)',
      description: 'Fresh ground whole wheat flour for making nutritious rotis and bread.',
      price: 380,
      category: 'groceries',
      inStock: true,
      stockQuantity: 80,
      image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Cold Pressed Sunflower Oil (1L)',
      description: 'Pure cold-pressed sunflower oil for healthy cooking and better nutrition.',
      price: 120,
      category: 'groceries',
      inStock: true,
      stockQuantity: 150,
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Organic Jaggery (1kg)',
      description: 'Pure organic jaggery, a healthy alternative to refined sugar.',
      price: 85,
      category: 'groceries',
      inStock: true,
      stockQuantity: 200,
      image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Premium Tea Leaves (250g)',
      description: 'Hand-picked premium tea leaves from hill stations for the perfect cup.',
      price: 95,
      category: 'groceries',
      inStock: true,
      stockQuantity: 120,
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Fresh Red Onions (2kg)',
      description: 'Fresh red onions sourced directly from local farms, rich in flavor.',
      price: 60,
      category: 'groceries',
      inStock: true,
      stockQuantity: 90,
      image: 'https://images.pexels.com/photos/144248/onions-food-vegetables-healthy-144248.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Organic Turmeric Powder (200g)',
      description: 'Pure organic turmeric powder with high curcumin content for health benefits.',
      price: 75,
      category: 'groceries',
      inStock: true,
      stockQuantity: 110,
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Mixed Dal Combo (1kg)',
      description: 'Nutritious mix of different lentils for protein-rich meals.',
      price: 140,
      category: 'groceries',
      inStock: true,
      stockQuantity: 85,
      image: 'https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=500'
    },

    // Medicines
    {
      name: 'Paracetamol Tablets (Strip of 10)',
      description: 'Effective pain relief and fever reducer tablets for common ailments.',
      price: 25,
      category: 'medicines',
      inStock: true,
      stockQuantity: 300,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Antiseptic Solution (100ml)',
      description: 'Medical grade antiseptic liquid for wound cleaning and disinfection.',
      price: 65,
      category: 'medicines',
      inStock: true,
      stockQuantity: 50,
      image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'First Aid Bandages (Pack of 10)',
      description: 'Sterile medical bandages for wound care and first aid treatment.',
      price: 35,
      category: 'medicines',
      inStock: true,
      stockQuantity: 75,
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Digital Thermometer',
      description: 'Accurate digital thermometer for monitoring body temperature.',
      price: 180,
      category: 'medicines',
      inStock: true,
      stockQuantity: 40,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=500'
    },

    // Household
    {
      name: 'Antibacterial Soap (Pack of 4)',
      description: 'Premium antibacterial soap bars for daily hygiene and protection.',
      price: 80,
      category: 'household',
      inStock: true,
      stockQuantity: 100,
      image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Eco-Friendly Detergent (1kg)',
      description: 'Biodegradable detergent powder that\'s gentle on clothes and environment.',
      price: 150,
      category: 'household',
      inStock: true,
      stockQuantity: 70,
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Herbal Toothpaste (100g)',
      description: 'Natural herbal toothpaste for complete oral care and fresh breath.',
      price: 45,
      category: 'household',
      inStock: true,
      stockQuantity: 85,
      image: 'https://images.pexels.com/photos/4465832/pexels-photo-4465832.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Multi-Purpose Cleaner (500ml)',
      description: 'All-in-one cleaner for kitchen, bathroom, and household surfaces.',
      price: 95,
      category: 'household',
      inStock: true,
      stockQuantity: 60,
      image: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=500'
    },

    // Electronics
    {
      name: 'Solar LED Lantern',
      description: 'Portable solar-powered LED lantern for reliable lighting in rural areas.',
      price: 450,
      category: 'electronics',
      inStock: true,
      stockQuantity: 30,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Power Bank (10000mAh)',
      description: 'High-capacity power bank for charging mobile devices on the go.',
      price: 850,
      category: 'electronics',
      inStock: true,
      stockQuantity: 25,
      image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=500'
    },

    // Agriculture
    {
      name: 'Organic Fertilizer (5kg)',
      description: 'Natural organic fertilizer to improve soil health and crop yield.',
      price: 280,
      category: 'agriculture',
      inStock: true,
      stockQuantity: 45,
      image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      name: 'Vegetable Seeds Combo Pack',
      description: 'Variety pack of seasonal vegetable seeds for kitchen gardening.',
      price: 120,
      category: 'agriculture',
      inStock: true,
      stockQuantity: 55,
      image: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Products seeded successfully');
};

const seedNews = async () => {
  const news = [
    {
      title: 'New Healthcare Initiative Launched for Rural Areas',
      description: 'Government announces comprehensive healthcare program to provide better medical access to rural communities across the state with mobile clinics and telemedicine services.',
      category: 'health',
      date: new Date('2024-12-15'),
      author: 'Health Ministry'
    },
    {
      title: 'Digital Literacy Program Reaches 500+ Villages',
      description: 'Rural Connect partners with local NGOs to bring digital education and technology awareness to remote villages, training over 10,000 residents in basic computer skills.',
      category: 'technology',
      date: new Date('2024-12-10'),
      author: 'RuralConnect Team'
    },
    {
      title: 'Agricultural Subsidy Program Extended Until 2025',
      description: 'Farmers can now access subsidized seeds, fertilizers, and farming equipment through our platform with enhanced government partnership and increased funding allocation.',
      category: 'agriculture',
      date: new Date('2024-12-08'),
      author: 'Agriculture Department'
    },
    {
      title: 'Community Water Project Completed in 50 Villages',
      description: 'Clean water access improved significantly with the completion of bore wells and water purification systems, benefiting over 25,000 rural residents.',
      category: 'community',
      date: new Date('2024-12-05'),
      author: 'Rural Development Authority'
    },
    {
      title: 'Solar Energy Initiative Powers 100 Rural Schools',
      description: 'Renewable energy project brings electricity to remote educational institutions, enabling digital learning and extended school hours for better education outcomes.',
      category: 'technology',
      date: new Date('2024-12-01'),
      author: 'Energy Department'
    },
    {
      title: 'Rural Women Entrepreneurs Program Launches',
      description: 'New initiative supports rural women in starting small businesses with microfinance, training, and market access through our platform.',
      category: 'community',
      date: new Date('2024-11-28'),
      author: 'Women Development Corporation'
    }
  ];

  await News.deleteMany({});
  await News.insertMany(news);
  console.log('✅ News seeded successfully');
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    await seedServices();
    await seedProducts();
    await seedNews();
    
    console.log('🎉 Database seeding completed successfully!');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();