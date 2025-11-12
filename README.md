# GrowVest - Micro-Lending Platform

A full-stack MERN application for micro-lending and savings management for small businesses.

## Features

- 🔐 User Authentication (Register/Login)
- 💰 Loan Application System
- 🏦 Savings Account Management
- 📊 Dashboard with Financial Overview
- 💳 Transaction History
- 📱 Responsive Design with Tailwind CSS

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend

- React 18
- Vite
- React Router v6
- Tailwind CSS
- Axios for API calls

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local installation or MongoDB Atlas account)
- [Git](https://git-scm.com/)

## Installation & Setup

### 1. Clone or Download the Project

```bash
# Create the project directory
mkdir growvest-micro-lending
cd growvest-micro-lending
```

### 2. Backend Setup

```bash
# Create and navigate to backend folder
mkdir backend
cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express mongoose dotenv bcryptjs jsonwebtoken cors

# Install dev dependencies
npm install --save-dev nodemon
```

Create the following files in the backend folder:

- Copy all backend files from the artifacts above

**Update `backend/package.json` scripts:**

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

**Configure `.env` file:**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/growvest
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Frontend Setup

```bash
# Navigate back to root
cd ..

# Create frontend with Vite
npm create vite@latest frontend -- --template react
cd frontend

# Install dependencies
npm install

# Install additional packages
npm install react-router-dom axios

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Create all frontend files from the artifacts above.

**Update `tailwind.config.js`:**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#059669',
      },
    },
  },
  plugins: [],
}
```

**Create `.env` file in frontend:**

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Option 2: Using Concurrent Commands (Optional)

Install `concurrently` in the root directory:

```bash
npm install concurrently
```

Add to root `package.json`:

```json
{
  "scripts": {
    "server": "cd backend && npm run dev",
    "client": "cd frontend && npm run dev",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
}
```

Then run:

```bash
npm run dev
```

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:

   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `MONGO_URI` in `backend/.env`:

   ``

## Project Structure in VS Code

```text
growvest-micro-lending/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── loanController.js
│   │   └── savingsController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Loan.js
│   │   └── Savings.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── loanRoutes.js
│   │   └── savingsRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ApplyLoan.jsx
│   │   │   └── Savings.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Loans

- `POST /api/loans` - Apply for loan (Protected)
- `GET /api/loans` - Get user loans (Protected)
- `GET /api/loans/:id` - Get loan by ID (Protected)
- `POST /api/loans/:id/payment` - Make loan payment (Protected)

### Savings

- `GET /api/savings` - Get savings account (Protected)
- `POST /api/savings/deposit` - Deposit money (Protected)
- `POST /api/savings/withdraw` - Withdraw money (Protected)
- `GET /api/savings/transactions` - Get transactions (Protected)

## Default Login Credentials

After registration, you can login with your created credentials.

## Testing the Application

1. **Register a new account**
   - Navigate to Register page
   - Fill in all required fields
   - Submit

2. **Apply for a loan**
   - Go to "Apply Loan" page
   - Enter amount, purpose, and duration
   - Submit application

3. **Manage savings**
   - Go to "Savings" page
   - Make deposits or withdrawals
   - View transaction history

## Common Issues & Solutions

### Port Already in Use

```bash
# Kill process on port 5000 (Backend)
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error

- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify MongoDB service status

### CORS Errors

- Ensure backend has `cors` package installed
- Check if frontend API_URL is correct

## Future Enhancements

- [ ] Admin dashboard for loan approval
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Credit score system
- [ ] Loan repayment reminders
- [ ] Analytics and reports
- [ ] Mobile app version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, email <support@growvest.com> or create an issue in the repository.

## Acknowledgments

- Tailwind CSS for styling
- MongoDB for database
- Express.js for backend framework
- React for frontend framework
- Vite for build tool
