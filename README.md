# College Events Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing college events efficiently.

## Features

- **User Authentication**
  - Register/Login functionality
  - JWT-based authentication
  - Protected routes for authorized users

- **Event Management**
  - Create new events with details and images
  - View list of all events
  - Edit and delete events (restricted to event organizers)
  - View detailed information about specific events

- **Search Functionality**
  - Search events by title, location, or event type

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Vite.js for bundling and development server

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user information

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `POST /api/events` - Create a new event (requires authentication)
- `PUT /api/events/:id` - Update an event (requires authentication)
- `DELETE /api/events/:id` - Delete an event (requires authentication)


## Usage

1. Register a new account or login with existing credentials
2. Browse the list of events on the home page
3. Use the search bar to find specific events
4. Click on "View Details" to see more information about an event
5. Click on "Create Event" to add a new event (must be logged in)
6. Edit or delete events that you have created
