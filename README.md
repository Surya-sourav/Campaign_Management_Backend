# Campaign Manager

A comprehensive LinkedIn campaign management tool built with React, Node.js, Express, and TypeScript.

![Campaign Manager](https://your-image-url-here.png)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

Campaign Manager is a full-stack application designed to streamline the creation and management of LinkedIn outreach campaigns. The platform enables users to create personalized messaging templates, manage prospect lists, and track campaign performance metrics.

## Features

- **Campaign Creation & Management**: Create, edit, and delete outreach campaigns
- **Personalized Messaging**: AI-powered message generation based on LinkedIn profiles
- **Campaign Analytics**: Track open rates, response rates, and conversion metrics
- **Prospect Management**: Import and organize LinkedIn prospects
- **User Authentication**: Secure login and account management

## Tech Stack

### Frontend
- React.js
- TypeScript
- Redux (or Context API)
- Axios
- Styled Components/Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB/PostgreSQL
- JWT Authentication

## Live Demo

- Frontend: [https://campaign-manager.vercel.app](https://campaign-manager.vercel.app)
- Backend API: [https://campaign-management-backend.onrender.com](https://campaign-management-backend.onrender.com)

## Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB/PostgreSQL database

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/campaign-manager.git
   cd campaign-manager/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and other settings
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Build for production
   ```bash
   npm run build
   ```

### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your API URL and other settings
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. Build for production
   ```bash
   npm run build
   ```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campaign-manager
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Campaign Endpoints
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get campaign by ID
- `POST /api/campaigns` - Create a new campaign
- `PUT /api/campaigns/:id` - Update a campaign
- `DELETE /api/campaigns/:id` - Delete a campaign

### Message Endpoints
- `POST /api/personalized-message` - Generate personalized message based on LinkedIn profile

## Project Structure

```
campaign-manager/
├── backend/                # Node.js Express backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Entry point
│   ├── .env                # Environment variables
│   ├── package.json        # Dependencies and scripts
│   └── tsconfig.json       # TypeScript configuration
│
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── api/            # API service calls
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main App component
│   │   └── index.tsx       # Entry point
│   ├── .env                # Environment variables
│   ├── package.json        # Dependencies and scripts
│   └── tsconfig.json       # TypeScript configuration
│
└── README.md               # Project documentation
```

## Deployment

### Backend Deployment (Render)
1. Create a Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Add environment variables

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
3. Add environment variables:
   - `REACT_APP_API_URL=https://campaign-management-backend.onrender.com`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
