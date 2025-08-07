# Deployment Guide - Rural Community Platform

This guide will help you deploy the Rural Community Platform to production using Vercel (frontend) and Render (backend).

## 🚀 Quick Deployment Checklist

- [ ] MongoDB Atlas database setup
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] Database seeded with initial data
- [ ] CORS configured correctly
- [ ] SSL certificates active

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **MongoDB Atlas Account**: [Sign up here](https://www.mongodb.com/cloud/atlas)
3. **Render Account**: [Sign up here](https://render.com)
4. **Vercel Account**: [Sign up here](https://vercel.com)

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new project: "RuralConnect"
3. Build a database (choose FREE tier)
4. Select cloud provider and region
5. Create cluster

### 2. Configure Database Access
1. **Database Access**: Create a database user
   - Username: `vinithkumar`
   - Password: `June302005` (or your preferred password)
   - Built-in role: `Atlas admin`

2. **Network Access**: Add IP addresses
   - Add `0.0.0.0/0` (Allow access from anywhere)
   - This is needed for Render deployment

### 3. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password

Your connection string should look like:
```
mongodb+srv://vinithkumar:June302005@cluster5.0yufxbd.mongodb.net/ruralConnect?retryWrites=true&w=majority&appName=Cluster5
```

## 🖥️ Backend Deployment (Render)

### 1. Create Render Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `rural-connect-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2. Environment Variables
Add these environment variables in Render:

```env
MONGODB_URI=mongodb+srv://vinithkumar:June302005@cluster5.0yufxbd.mongodb.net/ruralConnect?retryWrites=true&w=majority&appName=Cluster5
JWT_SECRET=rural-connect-super-secret-jwt-key-2024-production-ready-make-this-very-long-and-random
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
PORT=5000
```

**Important**: Replace `your-frontend-domain.vercel.app` with your actual Vercel domain after frontend deployment.

### 3. Deploy Backend
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL: `https://your-service-name.onrender.com`

### 4. Seed Database
After deployment, you can seed the database by:
1. Go to your Render service dashboard
2. Open the "Shell" tab
3. Run: `npm run seed`

Or use the web console to trigger the seeding endpoint.

## 🌐 Frontend Deployment (Vercel)

### 1. Create Vercel Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Environment Variables
Add these environment variables in Vercel:

```env
VITE_API_URL=https://your-backend-service.onrender.com
VITE_APP_NAME=RuralConnect
```

**Important**: Replace `your-backend-service.onrender.com` with your actual Render backend URL.

### 3. Deploy Frontend
1. Click "Deploy"
2. Wait for deployment to complete
3. Note your frontend URL: `https://your-project.vercel.app`

### 4. Update Backend CORS
1. Go back to your Render service
2. Update the `CORS_ORIGIN` environment variable with your Vercel URL
3. Redeploy the backend service

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings
Make sure your backend's CORS_ORIGIN matches your frontend domain:

**Backend Environment Variable**:
```env
CORS_ORIGIN=https://your-project.vercel.app
```

### 2. Test the Application
1. Visit your frontend URL
2. Try registering a new user
3. Test login functionality
4. Browse products
5. Add items to cart
6. Place a test order

### 3. Seed Database (if not done already)
You can seed the database by making a POST request to your backend or running the seed script:

```bash
# If you have access to the backend shell
npm run seed
```

## 🔍 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: 
- Check CORS_ORIGIN environment variable
- Ensure it matches your Vercel domain exactly
- Redeploy backend after changes

#### 2. Database Connection Issues
**Problem**: Backend can't connect to MongoDB
**Solution**:
- Verify MongoDB connection string
- Check database user permissions
- Ensure network access allows all IPs (0.0.0.0/0)

#### 3. Environment Variables Not Working
**Problem**: App not reading environment variables
**Solution**:
- Check variable names (VITE_ prefix for frontend)
- Redeploy after adding variables
- Check for typos in variable names

#### 4. Build Failures
**Problem**: Deployment fails during build
**Solution**:
- Check build logs for specific errors
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### Debugging Steps

1. **Check Logs**:
   - Render: Go to service → Logs tab
   - Vercel: Go to project → Functions tab → View logs

2. **Test API Endpoints**:
   ```bash
   # Test backend health
   curl https://your-backend.onrender.com/api/health
   
   # Test products endpoint
   curl https://your-backend.onrender.com/api/products
   ```

3. **Check Environment Variables**:
   - Render: Service → Environment tab
   - Vercel: Project → Settings → Environment Variables

## 🔒 Security Considerations

### Production Security Checklist

- [ ] Strong JWT secret (at least 32 characters)
- [ ] MongoDB user with minimal required permissions
- [ ] CORS configured for specific domain only
- [ ] HTTPS enabled (automatic with Vercel/Render)
- [ ] Environment variables properly secured
- [ ] No sensitive data in client-side code

### Recommended JWT Secret Generation
```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📊 Monitoring and Maintenance

### 1. Monitor Application Health
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor database performance in MongoDB Atlas
- Check Render/Vercel dashboards regularly

### 2. Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Update Node.js version as needed

### 3. Backup Strategy
- MongoDB Atlas provides automatic backups
- Keep your code in version control
- Document any manual configuration changes

## 🎯 Performance Optimization

### Backend Optimization
- Enable compression middleware
- Implement caching for frequently accessed data
- Optimize database queries
- Use connection pooling

### Frontend Optimization
- Implement lazy loading for images
- Use React.memo for expensive components
- Optimize bundle size with code splitting
- Enable Vercel's automatic optimizations

## 📞 Support

If you encounter issues during deployment:

1. Check the troubleshooting section above
2. Review deployment logs carefully
3. Verify all environment variables
4. Test API endpoints individually
5. Check database connectivity

For additional help:
- **Email**: vinithkumar30062005@gmail.com
- **Phone**: 6304738469

---

**Happy Deploying! 🚀**