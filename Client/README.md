# LuxeStay - Frontend Client

A modern, responsive React + Vite application for the LuxeStay luxury accommodations marketplace platform.

## 🌟 Features

- **User Authentication** - Secure login and registration with JWT tokens
- **Property Listing** - Browse and discover luxury accommodations
- **Booking Management** - Create and manage bookings with date selection
- **Image Upload** - Upload property photos via link or file upload
- **Admin Dashboard** - Host management and statistics
- **Responsive Design** - Tailwind CSS for mobile-first responsive UI
- **Role-Based Access** - Separate views for users and hosts/admins
- **Protected Routes** - Secure pages with authentication checks

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Lightning-fast build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icon library
- **JavaScript (ES6+)** - Modern JavaScript

## 📋 Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:3000` (or configure via `.env`)

## 🚀 Getting Started

### 1. Installation

```bash
cd Client
npm install
```

### 2. Environment Setup

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Configure for your environment:

```env
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
VITE_APP_NAME=LuxeStay
```

### 3. Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
Client/
├── src/
│   ├── config/api.js              # Centralized API endpoints
│   ├── components/                # Reusable components
│   ├── context/                   # Context API (User auth)
│   ├── pages/                     # Page components
│   ├── App.jsx                    # Main app with routing
│   └── index.css                  # Global styles
├── .env.example                   # Environment template
├── .env                           # Local environment (git ignored)
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔌 API Endpoints Configuration

All API calls use centralized config from `src/config/api.js`:

```javascript
import API_ENDPOINTS from '../../config/api';

// Examples:
axios.get(API_ENDPOINTS.AUTH.PROFILE)
axios.post(API_ENDPOINTS.BOOKINGS.CREATE, data)
axios.get(API_ENDPOINTS.PLACES.GET_BY_ID(id))
```

The base URL is configured via `VITE_API_URL` environment variable.

## 🔐 Authentication

- JWT tokens stored in HTTP-only cookies
- Secure by default with `httpOnly: true`
- Automatic credential passing to API
- Role-based access control (user/admin)

## 📦 Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (port 5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import repo in Vercel
3. Set environment variables
4. Deploy

### Netlify
1. Connect GitHub repo
2. Build: `npm run build`
3. Publish: `dist`
4. Set environment variables
5. Deploy

### Self-Hosted
1. Build: `npm run build`
2. Upload `dist/` folder
3. Configure web server for SPA routing
4. Set env variables

### Pre-Deployment

- [ ] Update `VITE_API_URL` to production API
- [ ] Set `VITE_ENVIRONMENT=production`
- [ ] Test build: `npm run build`
- [ ] Verify `.env` in `.gitignore`
- [ ] Test on production URL

## 🔄 Environment Variables

### Development
```env
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
VITE_APP_NAME=LuxeStay
```

### Production
```env
VITE_API_URL=https://api.yourdomain.com
VITE_ENVIRONMENT=production
VITE_APP_NAME=LuxeStay
```

⚠️ Never expose sensitive API keys!

## 🐛 Troubleshooting

**Port in use:** `npx kill-port 5173`

**API errors:** Check CORS headers and `VITE_API_URL` setting

**Build fails:** `rm -rf node_modules && npm install && npm run build`

## 📚 Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

## 📝 License

Part of LuxeStay application.


Example: grid-rows-2 → 2 equal rows.
grid-rows-[value]: Custom row sizes.

Example: grid-rows-[1fr_2fr] → Second row is twice the height of the first.
gap-{n}: Adds space between rows and columns.

Example: gap-4 → 1rem (16px) gap.
row-gap-{n} / col-gap-{n}: Sets gap only between rows or columns.

Example: col-gap-2 → Small gap between columns.
place-items-{value}: Aligns items both vertically and horizontally.

Values: start, center, end.
justify-items-{value}: Aligns items horizontally.

Example: justify-items-center → Centers items horizontally.
items-{value}: Aligns items vertically.

Example: items-start → Aligns items to the top.

5.
You can achieve this by wrapping the place name in an anchor (<a>) tag with a href pointing to Google Maps. Here’s an example in React:

jsx
Copy
Edit
<a 
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(places.name)}`} 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-blue-500 hover:underline"
>
  {places.name}
</a>

6.
🟢 Step 1: Get a Google API Key
Go to Google Cloud Console:

Visit Google Cloud Console.
Create a new project:

Click on the project dropdown at the top and select New Project.
Give your project a name (e.g., "My Maps Project") and click Create.
Enable the Maps Embed API:

In the search bar at the top, type "Maps Embed API" and select it.
Click Enable.
Get your API Key:

On the left sidebar, click APIs & Services → Credentials.
Click the + CREATE CREDENTIALS button at the top and select API key.
Copy the API key that gets generated — you’ll need it in the next steps!
🔵 Step 2: Add the Map to Your Website
Once you have the API key, you can embed the map on your website using an <iframe>.
Here’s an example code snippet:

html
Copy
Edit
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location Map</title>
</head>
<body>
    <h1>Location Map</h1>
    <div style="width: 100%; height: 400px;">
        <iframe
            width="100%"
            height="100%"
            style="border: 0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Taj+Mahal">
        </iframe>
    </div>
</body>
</html>
🟣 Step 3: Replace the API Key and Place Name
Replace YOUR_API_KEY with the API key you copied earlier.
Replace Taj+Mahal with the name of the place you want to show.
For multiple words, replace spaces with + (e.g., "Eiffel Tower" becomes "Eiffel+Tower").

7. new Date() to convert from any datatype to date data type
     date-fns(npm) consisting of functions related to date



8. To achieve this, you need to store the payment status persistently. Since the payment status resets when you navigate back, you can store it in localStorage or manage it in the database.

Solution using localStorage
Modify your code as follows:

1. Update handlePayment function to store payment status
javascript
Copy
Edit
const handlePayment = () => {
  alert('Payment Successful!');
  setIsPaid(true);
  localStorage.setItem(`paymentStatus_${id}`, 'paid'); // Store status in localStorage
  setredirect('/accounts/booking');
};
2. Check localStorage when the component loads
Modify your useEffect to check if the payment is already completed.

javascript
Copy
Edit
useEffect(() => {
  if (id) {
    axios.get('http://localhost:3000/booking').then(response => {
      const foundBooking = response.data.find((booking) => booking._id === id);
      setbooking(foundBooking);

      // Check if payment is already done
      const paymentStatus = localStorage.getItem(`paymentStatus_${id}`);
      if (paymentStatus === 'paid') {
        setIsPaid(true);
      }
    });
  }
}, [id]);

