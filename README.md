Backend – E-Commerce / Booking System

This is the backend API for a simple e-commerce and booking system. It manages users, products, cart, and orders/bookings.

🔹 Features

User authentication (JWT-based)

CRUD operations for products

Cart management

Add, remove, update quantity, clear cart

Booking / Orders management

Place orders

Fetch user orders

User profile management

📁 Project Structure
backend/
│
├─ models/
│   ├─ User.js          # User schema
│   ├─ Product.js       # Product schema
│   ├─ Cart.js          # Cart schema
│   └─ Booking.js       # Booking / Order schema
│
├─ routes/
│   ├─ auth.js          # User login & register routes
│   ├─ products.js      # CRUD product routes
│   ├─ cart.js          # Cart routes
│   ├─ bookings.js      # Booking / order routes
│   └─ user.js          # Update profile routes
│
├─ middleware/
│   └─ auth.js          # JWT authentication middleware
│
├─ server.js            # Entry point of the backend
└─ package.json         # Dependencies & scripts

⚡ Installation

Clone the repository

git clone https://github.com/Pheonix-Alpha/micro-service-.git
cd micro-service


Install dependencies

npm install


Create .env file in the root directory:

PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>


Start the server

node server.js

📝 API Endpoints
Auth
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login user
Products
Method	Endpoint	Description
GET	/products	Fetch all products
POST	/products	Create new product
PATCH	/products/:id	Update product
DELETE	/products/:id	Delete product
Cart
Method	Endpoint	Description
GET	/cart	Get current user's cart
POST	/cart/add	Add item to cart
PATCH	/cart/item/:id	Update quantity of item
DELETE	/cart/item/:id	Remove an item from cart
DELETE	/cart	Clear entire cart
Booking / Orders
Method	Endpoint	Description
POST	/booking	Place an order / booking
GET	/bookings	Get all orders for logged-in user
User
Method	Endpoint	Description
PATCH	/user/profile	Update user info (name, phone, address)
💻 Notes

All cart and booking routes require authentication (JWT in Authorization header).

Orders are linked to users in the database.

Cart items are stored as embedded documents in the Cart schema.

Bookings store snapshot of cart items at the time of checkout.

🔗 Dependencies

express

mongoose

jsonwebtoken

bcryptjs

dotenv

cors

nodemon (dev dependency)

✅ License

MIT License