# TElab Fullstack Application

A full-stack educational lab management application with a Spring Boot backend and React Native/Expo frontend.

## 🏗️ Project Structure

```
.
├── backend/          # Spring Boot backend API
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/         # React Native/Expo mobile app
│   ├── app/
│   ├── components/
│   ├── screens/
│   └── package.json
└── .env.example      # Environment variables template
```

## 🚀 Features

- **Authentication**: Secure JWT-based authentication
- **Attendance Management**: Track and manage student attendance
- **Timetable**: View and manage class schedules
- **Results**: End semester and regular results management
- **Cross-platform**: Mobile app works on iOS and Android

## 🔧 Prerequisites

- **Backend**:
  - Java 17 or higher
  - Maven 3.6+
  
- **Frontend**:
  - Node.js 18+
  - npm or yarn
  - Expo CLI

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/9MidhunPM/TElab-fullstack.git
cd TElab-fullstack
```

### 2. Environment Configuration

Copy the example environment file and configure your values:

```bash
cp .env.example .env
```

Edit `.env` with your actual configuration values.

### 3. Backend Setup

```bash
cd backend

# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npx expo start
```

## 🔐 Environment Variables

### Backend Variables

- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRATION`: Token expiration time in milliseconds
- `CORS_ALLOWED_ORIGINS`: Allowed origins for CORS
- `PORT`: Server port (default: 8080)
- `ETLAB_API_BASE_URL`: External API base URL

### Frontend Variables

- `EXPO_PUBLIC_API_BASE_URL`: Backend API URL

## 📦 Deployment

### Backend Deployment

The backend includes Dockerfiles for containerized deployment:

```bash
cd backend
docker build -f Dockerfile -t telab-backend .
docker run -p 8080:8080 telab-backend
```

### Frontend Deployment

Build for production:

```bash
cd frontend
npx expo build:android
npx expo build:ios
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
./mvnw test
```

## 📝 API Documentation

The backend API is organized into the following controllers:

- `/api/auth` - Authentication endpoints
- `/api/attendance` - Attendance management
- `/api/timetable` - Timetable operations
- `/api/results` - Results management
- `/api/endsem-results` - End semester results

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- Midhun PM - [@9MidhunPM](https://github.com/9MidhunPM)

## 🐛 Issue Reporting

If you find any bugs or have feature requests, please create an issue in the GitHub repository.

---

**Note**: Make sure to never commit `.env` files with real credentials. Always use `.env.example` as a template.
