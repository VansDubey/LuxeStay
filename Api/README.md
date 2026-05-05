# LuxeStay - Backend API

Express.js REST API for the LuxeStay luxury accommodations marketplace platform.

## 🌟 Features

- **User Authentication** - JWT-based authentication with role-based access control
- **Property Management** - Create, update, and list luxury accommodations
- **Booking System** - Manage reservations with validation
- **Image Upload** - Support for Cloudinary cloud storage and local uploads
- **Data Validation** - Joi schema validation for all requests
- **CORS Enabled** - Secure cross-origin requests
- **MongoDB Integration** - NoSQL database with Mongoose ODM

## 🛠️ Tech Stack

- **Node.js & Express** - Web server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Token authentication
- **Joi** - Schema validation
- **Bcryptjs** - Password hashing
- **Cloudinary** - Cloud image storage
- **Multer** - File upload middleware
- **CORS** - Cross-Origin Resource Sharing

## 📋 Prerequisites

- **Node.js** (v16.0.0 or higher)
- **MongoDB** (local or MongoDB Atlas cloud)
- **Cloudinary Account** (for image uploads)
- **npm** or **yarn**

## 🚀 Getting Started

### 1. Installation

```bash
cd Api
npm install
```

### 2. Environment Configuration

Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Update with your credentials:

```env
# Application
NODE_ENV=development
API_PORT=3000
API_BASE_URL=http://localhost:3000

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/luxestay

# JWT
JET_SECRET_KEY=your-super-secret-key-change-in-production

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 3. Run Development Server

```bash
npm run dev
```

Server starts on `http://localhost:3000`

### 4. Run Production

```bash
npm start
```

## 📁 Project Structure

```
Api/
├── models/
│   ├── user.model.js              # User schema
│   ├── Places.model.js            # Property/Place schema
│   └── booking.model.js           # Booking schema
├── utility/
│   ├── validation.js              # Joi validation schemas
│   └── cloudinary.js              # Cloudinary config
├── uploads/                       # Local image storage
├── index.js                       # Main server file
├── .env.example                   # Environment template
├── .env                           # Local environment (git ignored)
├── package.json                   # Dependencies & scripts
└── README.md                      # This file
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | `{name, email, password, role}` |
| POST | `/login` | Login user | `{email, password}` |
| POST | `/logout` | Logout user | - |
| GET | `/profile` | Get user profile | - |

### Places/Listings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/places` | Get all places | No |
| GET | `/places/:id` | Get place by ID | No |
| POST | `/places` | Create new place | Admin |
| PUT | `/places` | Update place | Admin |
| GET | `/user-places` | Get user's places | Yes |

### Bookings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/booking` | Create booking | Yes |
| GET | `/booking` | Get all bookings | Yes |
| GET | `/profilebooking` | Get user's bookings | Yes |

### Uploads

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/upload` | Upload image file | `form-data: image` |
| POST | `/upload-by-link` | Upload from URL | `{link}` |

## 🔐 Authentication

- JWT tokens issued on login
- Tokens stored in HTTP-only cookies
- Token expires in 2 hours
- Role-based access control (user/admin)

### Role-Based Routes

**Admin Only:**
- `POST /places` - Create properties
- `PUT /places` - Update properties

**User/Admin:**
- `GET /profile` - View profile
- `POST /booking` - Create bookings
- `GET /profilebooking` - View bookings

## 📝 Data Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (user|admin, default: user)
}
```

### Place Schema
```javascript
{
  owner: ObjectId (User),
  name: String,
  address: String,
  description: String,
  checkIn: String (HH:MM),
  checkOut: String (HH:MM),
  perks: [String],
  photos: [String] (URLs),
  price: Number
}
```

### Booking Schema
```javascript
{
  place: ObjectId (Place),
  user: ObjectId (User),
  checkin: Date,
  checkout: Date,
  guests: Number,
  name: String,
  mobile: String,
  price: Number
}
```

## ✅ Request Validation

All requests are validated using Joi schemas:

### Register
```javascript
{
  name: string (2-50 chars, required),
  email: string (valid email, required),
  password: string (min 6 chars, required),
  role: string (user|admin, default: user)
}
```

### Login
```javascript
{
  email: string (valid email, required),
  password: string (required)
}
```

### Place
```javascript
{
  title: string (3-100 chars, required),
  address: string (5-200 chars, required),
  description: string (10-5000 chars, required),
  checkIn: string (HH:MM format, required),
  checkOut: string (HH:MM format, required),
  price: number (10-100000, required),
  perks: array of strings,
  AddedPhotos: array of URLs (min 1, required)
}
```

## 📦 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Production server |
| `npm run dev` | Development server |

## 🚢 Deployment

### Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create app-name`
4. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URL=your-mongo-url
   heroku config:set JET_SECRET_KEY=your-secret
   # ... other env vars
   ```
5. Deploy: `git push heroku main`

### Railway/Render

1. Connect GitHub repo
2. Set environment variables in dashboard
3. Auto-deploy on git push

### Self-Hosted (Linux/Ubuntu)

1. Install Node.js and MongoDB
2. Clone repository
3. Setup `.env` file
4. Install dependencies: `npm install`
5. Start with PM2: `pm2 start index.js --name luxestay-api`
6. Configure Nginx reverse proxy
7. Set up SSL with Let's Encrypt

## 🔄 Environment Variables

### Development
```env
NODE_ENV=development
API_PORT=3000
API_BASE_URL=http://localhost:3000
MONGODB_URL=mongodb://localhost:27017/luxestay
JET_SECRET_KEY=dev-secret-key
CORS_ORIGIN=http://localhost:5173
```

### Production
```env
NODE_ENV=production
API_PORT=3000
API_BASE_URL=https://api.yourdomain.com
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/luxestay
JET_SECRET_KEY=strong-random-secret-key
CORS_ORIGIN=https://yourdomain.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🔒 Security Checklist

- [ ] Change `JET_SECRET_KEY` to strong random string
- [ ] Use HTTPS in production (`secure: true` for cookies)
- [ ] Set `NODE_ENV=production`
- [ ] Store MongoDB credentials safely
- [ ] Rotate Cloudinary API keys periodically
- [ ] Enable CORS only for your domain
- [ ] Use HTTP-only cookies for tokens
- [ ] Never commit `.env` file
- [ ] Implement rate limiting for production
- [ ] Add request logging/monitoring

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env
API_PORT=3001
```

### MongoDB Connection Failed
- Verify MongoDB service is running
- Check connection string in `.env`
- For MongoDB Atlas: whitelist your IP

### Cloudinary Upload Errors
- Verify API credentials in `.env`
- Check Cloudinary dashboard for issues
- Test with local upload endpoint first

### CORS Errors
- Update `CORS_ORIGIN` to match frontend URL
- Ensure frontend uses `withCredentials: true`

## 📚 Resources

- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [JWT Documentation](https://jwt.io)
- [Joi Validation](https://joi.dev)

## 📝 License

Part of LuxeStay application.

## ❓ Support

For API issues:
1. Check console logs
2. Verify environment variables
3. Test with Postman/Insomnia
4. Check network tab in browser DevTools
