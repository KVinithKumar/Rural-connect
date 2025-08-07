# Rural Community Platform - Full Stack Web Application

A modern, comprehensive platform helping rural communities easily find and access essential products like groceries, medicines, and household items with seamless delivery services.

## 🚀 Live Demo

- **Frontend (Vercel)**: [Your Vercel URL]
- **Backend (Render)**: [Your Render URL]

## 🛠 Tech Stack

### Frontend
- **React.js** with TypeScript
- **Vite** for development and build
- **Tailwind CSS** for modern styling
- **Axios** for API communication
- **Lucide React** for beautiful icons

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** for database modeling
- **JWT** for secure authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation

## 📁 Project Structure

```
rural-community-platform/
├── backend/                 # Node.js backend API
│   ├── routes/             # API route handlers
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Database seeding scripts
│   ├── server.js           # Main server file
│   ├── vercel.json         # Vercel deployment config
│   └── package.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── utils/          # Utility functions
│   ├── vercel.json         # Vercel deployment config
│   └── package.json
└── README.md
```

## ✨ Features

### 🏠 Homepage
- Modern hero section with call-to-action
- Services showcase with icons
- Product catalog with images and filtering
- News & updates section
- Contact form with validation
- Fully responsive design

### 🔐 Authentication
- User registration and login
- JWT-based secure authentication
- Password hashing with bcrypt
- Form validation and error handling

### 👤 User Dashboard
- Profile management
- Shopping cart functionality
- Product browsing with search and filters
- Order placement and tracking
- Order history with detailed views

### 🛒 E-commerce Features
- Product catalog with high-quality images
- Category-based filtering
- Search functionality
- Shopping cart with quantity management
- Order management system
- Real-time stock tracking

### 📱 Modern UI/UX
- Beautiful gradient designs
- Smooth animations and transitions
- Mobile-first responsive design
- Loading states and error handling
- Modern card-based layouts

## 🚀 Deployment Guide

### Backend Deployment (Render)

1. **Create Render Account**: Sign up at [render.com](https://render.com)

2. **Create Web Service**:
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Environment Variables** (Add in Render dashboard):
   ```
   MONGODB_URI=mongodb+srv://vinithkumar:June302005@cluster5.0yufxbd.mongodb.net/ruralConnect?retryWrites=true&w=majority&appName=Cluster5
   JWT_SECRET=rural-connect-super-secret-jwt-key-2024-production-ready
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

4. **Deploy**: Click "Create Web Service"

### Frontend Deployment (Vercel)

1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)

2. **Import Project**:
   - Connect your GitHub repository
   - Select the `frontend` folder as root directory
   - Framework preset: Vite

3. **Environment Variables** (Add in Vercel dashboard):
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   VITE_APP_NAME=RuralConnect
   ```

4. **Deploy**: Click "Deploy"

## 🛠 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### 1. Clone Repository
```bash
git clone <your-repository-url>
cd rural-community-platform
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed database
npm run seed

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your backend URL

# Start development server
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token
- `PUT /api/auth/profile` - Update user profile

### Public Endpoints
- `GET /api/services` - Get all services
- `GET /api/products` - Get products (with filtering)
- `GET /api/news` - Get news articles
- `POST /api/contact` - Submit contact form

### Protected Endpoints
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id/cancel` - Cancel booking

## 🎨 Design Features

- **Modern Gradients**: Beautiful color transitions
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Hover effects and transitions
- **High-Quality Images**: Curated product images from Pexels
- **Intuitive Navigation**: Easy-to-use interface
- **Loading States**: Better user experience
- **Error Handling**: Graceful error management

## 🔧 Configuration Files

### Backend
- `vercel.json` - Vercel deployment configuration
- `.env` - Environment variables
- `package.json` - Dependencies and scripts

### Frontend
- `vercel.json` - Vercel deployment configuration
- `.env` - Environment variables
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

- **Email**: vinithkumar30062005@gmail.com
- **Phone**: 6304738469
- **GitHub**: [Your GitHub Profile]

## 🙏 Acknowledgments

- Images from [Pexels](https://pexels.com)
- Icons from [Lucide React](https://lucide.dev)
- UI inspiration from modern e-commerce platforms

---

**Built with ❤️ for rural communities**