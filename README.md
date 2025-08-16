# 📸 Photo Sharing Social Media App

A full-stack social media application built with **React**, **NestJS**, and **PostgreSQL**, featuring real-time chat, photo sharing, blogging, and user management capabilities.

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login with JWT authentication
- User profile management and customization
- Secure password hashing with bcrypt

### 📱 Social Features
- **Photo Posts**: Upload and share photos with captions
- **Blog System**: Create and publish blog posts
- **Real-time Chat**: Live messaging with Socket.IO
- **User Feed**: Personalized content feed
- **Like System**: Interact with posts and content

### 🛠️ Technical Features
- **Real-time Communication**: WebSocket-based chat system
- **File Upload**: Image upload and storage
- **API Documentation**: Swagger/OpenAPI integration
- **Monitoring**: OpenTelemetry tracing and metrics
- **Database Management**: pgAdmin for database administration

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  NestJS Backend │    │  PostgreSQL DB  │
│   (TypeScript)  │◄──►│   (TypeScript)  │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│   Socket.IO     │◄─────────────┘
                        │  (Real-time)    │
                        └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Yarn package manager

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd React-NestJs-Postgres-Social-Media

# Start all services
./scripts/build.sh all

# Or start specific services
./scripts/build.sh frontend backend postgres pgadmin
```

### Option 2: Local Development

#### Backend Setup
```bash
cd backend
yarn install
yarn start:dev  # http://localhost:8080
```

#### Frontend Setup
```bash
cd frontend
yarn install
yarn dev  # http://localhost:3000
```

#### Database Setup
```bash
# Using Docker for PostgreSQL
docker run --name postgres -e POSTGRES_DB=test_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15-alpine
```

## 🌐 Services & URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | React application |
| **Backend API** | http://localhost:8080 | NestJS REST API |
| **API Docs** | http://localhost:8080/api | Swagger documentation |
| **pgAdmin** | http://localhost:5050 | Database administration |
| **Database** | localhost:5432 | PostgreSQL database |

**pgAdmin Credentials**: `admin@admin.com` / `admin`

## 🔧 Development Workflow

### Rebuilding Services

```bash
# Soft rebuild (config/env changes)
./scripts/rebuild.sh <service|all> soft

# Hard rebuild (code/Dockerfile changes)
./scripts/rebuild.sh <service|all> hard
```

**Examples:**
```bash
# After backend code changes
./scripts/rebuild.sh backend hard

# After environment variable changes
./scripts/rebuild.sh frontend soft

# Rebuild everything
./scripts/rebuild.sh all hard
```

### Available Services
- `frontend` - React application
- `backend` - NestJS API
- `postgres` - PostgreSQL database
- `pgadmin` - Database administration
- `all` - All services

## 📊 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts
- `GET /posts` - Get all posts
- `POST /posts` - Create new post
- `GET /posts/:id` - Get post by ID
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Blogs
- `GET /blogs` - Get all blogs
- `POST /blogs` - Create new blog
- `GET /blogs/:id` - Get blog by ID
- `PUT /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog

### Chat
- WebSocket connection for real-time messaging
- Conversation management
- Message history

## 🛠️ Useful Commands

```bash
# View service logs
docker compose logs -f backend
docker compose logs -f frontend

# Run API tests
./scripts/test-api.sh.sh

# Health check
curl -s http://localhost:8080/api | jq .

# Clean up containers and volumes
./scripts/clean.sh

# Full rebuild
./scripts/rebuild.sh all hard
```

## 🧪 Testing

```bash
# Backend tests
cd backend
yarn test
yarn test:e2e

# Frontend tests
cd frontend
yarn test
```

## 📁 Project Structure

```
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── posts/          # Post management
│   │   ├── blogs/          # Blog management
│   │   ├── chat/           # Real-time chat
│   │   ├── metrics/        # Monitoring & metrics
│   │   └── tracing/        # OpenTelemetry tracing
│   └── Dockerfile
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API services
│   │   └── contexts/       # React contexts
│   └── Dockerfile
├── database/               # Database setup
│   ├── init.sql           # Database initialization
│   └── pgadmin-servers.json
├── scripts/               # Build and deployment scripts
└── docker-compose.yml     # Docker orchestration
```

## 🔒 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=test_db
DATABASE_USER=postgres
DATABASE_PASSWORD=password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080
FRONTEND_PORT=3000
```

## 🚀 Deployment

The application is containerized and ready for deployment:

```bash
# Production build
docker compose -f docker-compose.prod.yml up -d

# Or using the build script
./scripts/build.sh all
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the [API documentation](http://localhost:8080/api)
- Review the [debug guide](./frontend/DEBUG_GUIDE.md)
- Check the [configuration guide](./frontend/CONFIGURATION.md)