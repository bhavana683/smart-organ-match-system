# Smart Organ Donor-Recipient Matching System - Complete Setup Guide

## Project Overview

This is a full-stack MERN application for managing organ donor and recipient registrations with intelligent matching capabilities.

## Architecture

### Frontend (React + TypeScript + Tailwind)
- Location: Root directory
- Port: 5173 (Vite dev server)
- Features: Authentication, protected routes, responsive UI

### Backend (Node.js + Express + MongoDB)
- Location: `/backend` directory
- Port: 5000
- Database: MongoDB Atlas (hardcoded connection)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (connection string already provided in backend)

## Installation & Running

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Frontend will be available at: `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start server (development)
npm start

# Or use nodemon for auto-reload (if installed)
npm run dev
```

Backend will be available at: `http://localhost:5000`

## Database

The backend uses MongoDB Atlas with this connection string (already hardcoded):
```
mongodb+srv://bhavanarupenaguntla:QMhWPcNEDYgHF3Sa@cluster0.dwzg3.mongodb.net/talentfarm?retryWrites=true&w=majority
```

## Features

### User Roles
1. **Donor**: Register as organ donor, manage profile
2. **Recipient**: Register as organ recipient, find matches
3. **Admin**: Approve/reject donors and recipients, view statistics

### Supported Organs
- Kidney
- Liver
- Heart
- Lung

### Key Features

#### Authentication
- User registration with role selection
- JWT-based login
- Password hashing with bcryptjs
- Protected routes

#### Donor Features
- Complete medical profile registration
- Organ-specific medical data (GFR, creatinine, etc.)
- File upload for medical documents
- View approval status

#### Recipient Features
- Complete medical profile registration
- Organ need specification
- Urgency level selection
- Find compatible donors
- View matching results

#### Admin Features
- View all donors and recipients
- Approve/reject registrations
- System statistics dashboard
- Donor/recipient filtering by status

## Project Structure

### Frontend
```
src/
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── DonorRegistration.tsx
│   ├── RecipientRegistration.tsx
│   ├── DonorDashboard.tsx
│   ├── RecipientDashboard.tsx
│   └── AdminDashboard.tsx
├── context/
│   └── AuthContext.tsx (authentication state)
├── services/
│   └── api.ts (API calls)
├── App.tsx (routing)
└── main.tsx
```

### Backend
```
backend/
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── donorController.js
│   ├── recipientController.js
│   └── adminController.js
├── models/
│   ├── User.js
│   ├── Donor.js
│   └── Recipient.js
├── routes/
│   ├── authRoutes.js
│   ├── donorRoutes.js
│   ├── recipientRoutes.js
│   ├── adminRoutes.js
│   └── matchRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── uploadMiddleware.js
├── services/
│   ├── donorService.js
│   ├── recipientService.js
│   └── matchService.js
└── utils/
    └── calculateBMI.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Donor
- `POST /api/donor/register` - Register as donor
- `GET /api/donor/profile` - Get donor profile
- `GET /api/donor/:id` - Get donor by ID
- `PUT /api/donor/:id` - Update donor profile
- `POST /api/donor/upload` - Upload medical documents

### Recipient
- `POST /api/recipient/register` - Register as recipient
- `GET /api/recipient/profile` - Get recipient profile
- `GET /api/recipient/:id` - Get recipient by ID
- `PUT /api/recipient/:id` - Update recipient profile
- `POST /api/recipient/upload` - Upload medical documents

### Admin
- `GET /api/admin/donors` - Get all donors
- `GET /api/admin/recipients` - Get all recipients
- `PUT /api/admin/donor/approve/:id` - Approve donor
- `PUT /api/admin/donor/reject/:id` - Reject donor
- `PUT /api/admin/recipient/approve/:id` - Approve recipient
- `PUT /api/admin/recipient/reject/:id` - Reject recipient
- `GET /api/admin/stats` - Get system statistics

### Matching
- `POST /api/match/find` - Find compatible donors for recipient

## Test Credentials

You can create test accounts through the registration flow:

1. **Test Donor Account**
   - Role: Donor
   - Complete medical profile with kidney organ data

2. **Test Recipient Account**
   - Role: Recipient
   - Complete medical profile needing kidney

3. **Admin Account**
   - Register with admin role (during registration)
   - Automatically approved

## File Upload

Medical documents and ID files are uploaded to the backend's `/uploads` directory.
Supported formats: PDF, images (JPEG, PNG), Word documents

## Environment Variables (Optional)

While the database connection is hardcoded for immediate usability, you can optionally add:

Create `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### MongoDB Connection Error
- Verify MongoDB Atlas account is active
- Check that IP address is whitelisted in MongoDB Atlas
- Ensure internet connection is stable

### CORS Issues
- Backend already has CORS enabled for localhost
- Update API_URL in `src/services/api.ts` if using different ports

## Future Enhancements

1. **ML Integration**: Replace placeholder matching service with Python FastAPI ML model
2. **Real-time Notifications**: Add WebSocket for live updates
3. **Advanced Matching**: Implement sophisticated compatibility algorithms
4. **Analytics Dashboard**: Enhanced reporting and analytics
5. **Mobile App**: React Native version
6. **Email Notifications**: Send alerts for status updates

## Security Notes

- JWT tokens stored in localStorage (consider using httpOnly cookies in production)
- Passwords hashed with bcryptjs
- Role-based access control implemented
- Input validation on both frontend and backend
- MongoDB connection string hardcoded (change in production)

## Production Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to hosting (Vercel, Netlify, etc.)
```

### Backend
```bash
# Use process manager like PM2
pm2 start backend/server.js --name "organ-matching"

# Or deploy to cloud (Heroku, AWS, Digital Ocean, etc.)
```

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all services are running
3. Ensure MongoDB Atlas connection is active
4. Review API endpoint responses in network tab

---

**Version**: 1.0.0
**Last Updated**: 2024
