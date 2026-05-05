# LuxeStay - Luxury Accommodations Marketplace

LuxeStay is a full-stack web application that connects travelers with luxury accommodations. The platform allows users to browse properties, make bookings, and hosts to manage their listings.

**Status:** 🚀 Deployment Ready

## 🎯 Project Overview

LuxeStay is built with modern web technologies, featuring:
- **Frontend:** React + Vite with Tailwind CSS
- **Backend:** Express.js REST API
- **Database:** MongoDB
- **Cloud Storage:** Cloudinary for images
- **Authentication:** JWT with role-based access control

## 📂 Repository Structure

```
LuxeStay/
├── Client/                    # React + Vite Frontend
│   ├── src/
│   │   ├── config/           # API configuration
│   │   ├── components/       # Reusable components
│   │   ├── context/          # User context (auth)
│   │   ├── pages/            # Page components
│   │   └── App.jsx           # Main app with routing
│   ├── .env.example          # Frontend env template
│   ├── .env                  # Frontend local env (git ignored)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md             # Frontend documentation
│
├── Api/                       # Express.js Backend
│   ├── models/               # MongoDB schemas
│   ├── utility/              # Validation & config
│   ├── uploads/              # Local image storage
│   ├── index.js              # Main server file
│   ├── .env.example          # Backend env template
│   ├── .env                  # Backend local env (git ignored)
│   ├── package.json
│   └── README.md             # Backend documentation
│
└── Readme.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ 
- npm/yarn
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Frontend Setup

```bash
cd Client
npm install
cp .env.example .env          # Configure API URL
npm run dev                   # Start dev server (http://localhost:5173)
```

### Backend Setup

```bash
cd Api
npm install
cp .env.example .env          # Configure credentials
npm start                     # Start server (http://localhost:3000)
```

Visit `http://localhost:5173` to access the application.

## 📋 Environment Configuration

### Client `.env`
```env
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
VITE_APP_NAME=LuxeStay
```

### API `.env`
```env
NODE_ENV=development
API_PORT=3000
API_BASE_URL=http://localhost:3000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/luxestay
JET_SECRET_KEY=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CORS_ORIGIN=http://localhost:5173
```

## 🔐 Features

### For Users/Travelers
- Browse luxury accommodations
- Advanced search and filtering
- Booking management with date selection
- Secure payment simulation
- User profile and booking history
- Reviews and ratings

### For Hosts/Admins
- Property listing management
- Image upload (multiple photos)
- Booking tracking and statistics
- Admin dashboard
- Revenue tracking

### Security
- JWT authentication with 2-hour expiration
- HTTP-only secure cookies
- Password hashing with bcryptjs
- Role-based access control
- Input validation with Joi
- CORS protection

## 🏗️ Architecture

### Frontend Architecture
- **React Context API** for state management (user auth)
- **Centralized API config** (`src/config/api.js`) - single source of truth for endpoints
- **Protected routes** with authentication checks
- **Responsive design** with Tailwind CSS
- **Component-based** modular structure

### Backend Architecture
- **Express.js** middleware pattern
- **MongoDB/Mongoose** for data persistence
- **JWT** for stateless authentication
- **Joi** for request validation
- **Role-based middleware** for authorization
- **Cloudinary integration** for cloud image storage

## 📱 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /profile` - Get user profile

### Properties
- `GET /places` - List all properties
- `GET /places/:id` - Get property details
- `POST /places` - Create property (admin)
- `PUT /places` - Update property (admin)
- `GET /user-places` - Get user's properties

### Bookings
- `POST /booking` - Create booking
- `GET /booking` - List bookings
- `GET /profilebooking` - Get user's bookings

### Uploads
- `POST /upload` - Upload image file
- `POST /upload-by-link` - Upload from URL

See [Api/README.md](Api/README.md) for detailed API documentation.

## 🚢 Deployment

### Frontend Deployment Options
- **Vercel** (Recommended) - Zero-config, auto-deploy on push
- **Netlify** - Similar to Vercel, great for static SPA
- **GitHub Pages** - Free but limited features
- **Self-hosted** - Nginx/Apache with SPA routing

### Backend Deployment Options
- **Heroku** - Easy deployment, free tier available
- **Railway** - Modern alternative to Heroku
- **Render** - Simple deployment platform
- **AWS/DigitalOcean** - More control, better for scale
- **Self-hosted** - Full control with PM2 process manager

### Deployment Checklist

**Pre-Deployment:**
- [ ] Update API URLs to production endpoints
- [ ] Set `NODE_ENV=production`
- [ ] Update `CORS_ORIGIN` to frontend domain
- [ ] Verify `.env` files in `.gitignore`
- [ ] Rotate all credentials (MongoDB, Cloudinary, JWT secret)
- [ ] Test production build locally

**Deployment:**
- [ ] Deploy backend first
- [ ] Deploy frontend with correct API URL
- [ ] Verify API connectivity
- [ ] Test authentication flow
- [ ] Test image uploads
- [ ] Monitor logs for errors

**Post-Deployment:**
- [ ] Test on production URL
- [ ] Verify SSL/HTTPS
- [ ] Enable monitoring/alerts
- [ ] Set up database backups
- [ ] Document deployment process

See detailed guides in [Client/README.md](Client/README.md) and [Api/README.md](Api/README.md).

## 🔒 Security Notes

### Production Requirements
1. **Use HTTPS/SSL** - Enables secure cookies
2. **Strong JWT Secret** - Use 32+ character random string
3. **Database Security** - Enable MongoDB authentication
4. **API Rate Limiting** - Prevent brute force attacks
5. **CORS Configuration** - Only allow your domains
6. **Environment Variables** - Never expose in code
7. **Password Hashing** - Using bcryptjs (already implemented)
8. **Input Validation** - Using Joi (already implemented)

### Common Issues
- **CORS Errors** - Update `CORS_ORIGIN` in backend `.env`
- **Cookies Not Persisting** - Use HTTPS + `sameSite: lax`
- **API 400 Errors** - Check request validation, verify data types
- **Image Upload Fails** - Verify Cloudinary credentials

## 📊 Database Models

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user|admin),
  createdAt: Date
}
```

### Place
```javascript
{
  _id: ObjectId,
  owner: ObjectId (User),
  name: String,
  address: String,
  description: String,
  checkIn: String (HH:MM),
  checkOut: String (HH:MM),
  perks: [String],
  photos: [String] (URLs),
  price: Number,
  createdAt: Date
}
```

### Booking
```javascript
{
  _id: ObjectId,
  place: ObjectId (Place),
  user: ObjectId (User),
  checkin: Date,
  checkout: Date,
  guests: Number,
  name: String,
  mobile: String,
  price: Number,
  createdAt: Date
}
```

## 📚 Tech Stack Details

### Frontend
- React 18.3.1
- Vite 4.x
- React Router 6.26.0
- Axios 1.7.7
- Tailwind CSS 3.x
- Lucide Icons
- JavaScript ES6+

### Backend
- Node.js 16+
- Express 4.21.1
- MongoDB 8.x
- Mongoose 8.8.1
- JWT (jsonwebtoken 9.0.2)
- Bcryptjs 2.4.3
- Joi 18.0.2
- Cloudinary 1.41.3
- Multer 1.4.5
- CORS 2.8.5

## 🛠️ Development Workflow

1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Make changes** in Client or Api
3. **Test locally** - both frontend and backend
4. **Commit**: `git commit -m "Add feature description"`
5. **Push**: `git push origin feature/your-feature`
6. **Create Pull Request**

## 📝 Project Status

- ✅ Core functionality implemented
- ✅ Authentication & authorization
- ✅ Booking system
- ✅ Image upload
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Deployment configuration
- 📋 Future: Reviews/ratings system
- 📋 Future: Payment integration
- 📋 Future: Advanced search filters
- 📋 Future: Map integration

## 📖 Documentation

- [Frontend Documentation](Client/README.md) - Setup, features, deployment
- [Backend Documentation](Api/README.md) - API reference, setup, deployment
- [Environment Setup Guide](#-environment-configuration)

## 🐛 Troubleshooting

### Frontend
- Port 5173 in use: `npx kill-port 5173`
- API connection failed: Check `VITE_API_URL` in `.env`
- CORS error: Update API `CORS_ORIGIN` setting
- Build fails: `rm -rf node_modules && npm install`

### Backend
- Port 3000 in use: `npx kill-port 3000` or change `API_PORT`
- MongoDB connection: Verify `MONGODB_URL` and network access
- Cloudinary errors: Check credentials in `.env`
- CORS issues: Verify `CORS_ORIGIN` matches frontend URL

## 💡 Tips for Success

1. **Always use environment variables** - Never hardcode secrets
2. **Test endpoints in Postman** - Before using in frontend
3. **Check console logs** - Both browser (F12) and server terminal
4. **Use browser DevTools** - Network tab for API requests
5. **Keep `.env` files out of git** - Use `.gitignore`
6. **Test locally first** - Before deploying to production
7. **Monitor logs** - In production for errors/issues

## 📞 Support

For issues or questions:
1. Check the documentation in Client/README.md and Api/README.md
2. Review console logs (browser F12 and server terminal)
3. Verify environment variables are set correctly
4. Test API endpoints with Postman/Insomnia
5. Check GitHub issues for similar problems

## 📝 License

This project is part of the LuxeStay application.

---

**Happy coding!** 🎉

Built with ❤️ using React, Express, and MongoDB
