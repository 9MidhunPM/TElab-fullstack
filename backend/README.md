# ETLab Backend API

A secure Spring Boot REST API that serves as a middleware between client applications and the ETLab portal system. This backend handles authentication, session management, and provides structured access to student data including profiles, attendance, timetables, and academic results.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with automatic token renewal
- **Session Management**: Thread-safe user session handling with automatic cleanup
- **API Abstraction**: Clean REST endpoints abstracting complex ETLab API interactions
- **Error Handling**: Comprehensive error handling with structured JSON responses
- **Health Monitoring**: Built-in health check endpoints for deployment monitoring
- **Environment-Based Configuration**: Fully configurable via environment variables
- **Auto-Retry Logic**: Automatic re-authentication and retry for expired tokens

## 📋 Prerequisites

- **Java 21** or higher
- **Maven 3.6+**
- **ETLab API Access** (configured via environment variables)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/9MidhunPM/TELabApp.git
cd TELabApp
```

### 2. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```bash
# Required: Secure JWT secret (minimum 32 characters)
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-long

# Required: ETLab API base URL
ETLAB_API_BASE_URL=https://your-etlab-api.com/api

# Optional: CORS settings
CORS_ALLOWED_ORIGINS=https://yourfrontend.com
```

### 3. Build and Run

```bash
# Build the application
./mvnw clean package

# Run locally
./mvnw spring-boot:run

# Or run the JAR directly
java -jar target/backend-*.jar
```

The application will start on `http://localhost:8080`

### 4. Verify Installation

```bash
# Check health endpoint
curl http://localhost:8080/health

# Expected response:
{
  "status": "ok",
  "service": "etlabapp-backend",
  "timestamp": "1728489600000"
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `8080` | No |
| `JWT_SECRET` | JWT signing secret | ⚠️ Change required | **Yes** |
| `JWT_EXPIRATION` | Token expiration (ms) | `86400000` (24h) | No |
| `ETLAB_API_BASE_URL` | ETLab API endpoint | None | **Yes** |
| `CORS_ALLOWED_ORIGINS` | CORS origins | `*` | No |
| `ETLAB_CONNECT_TIMEOUT` | Connection timeout (s) | `10` | No |
| `ETLAB_READ_TIMEOUT` | Read timeout (s) | `20` | No |

### Application Properties

The application uses Spring Boot's property hierarchy. You can override any setting via:

1. Environment variables (recommended for production)
2. `application.properties` file
3. Command line arguments

## 📡 API Endpoints

### Authentication

#### Login
```http
POST /app/login
Content-Type: application/json

{
  "username": "your_etlab_username",
  "password": "your_etlab_password"
}
```

**Response (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "username": "your_username",
  "expiresAt": 1728576000000
}
```

**Response (Error):**
```json
{
  "error": "Invalid username or password",
  "message": "Please check your credentials and try again"
}
```

### Protected Endpoints

All endpoints below require the `Authorization: Bearer <token>` header.

#### Student Profile
```http
GET /app/profile
Authorization: Bearer <your_jwt_token>
```

#### Attendance
```http
GET /app/attendance
Authorization: Bearer <your_jwt_token>
```

#### Academic Results
```http
GET /app/results
Authorization: Bearer <your_jwt_token>
```

#### Timetable
```http
GET /app/timetable
Authorization: Bearer <your_jwt_token>
```

#### End Semester Results
```http
GET /app/end-semester-results
Authorization: Bearer <your_jwt_token>
```

### Health & Monitoring

```http
GET /health              # Simple health check
GET /app/health          # Detailed health information
GET /                    # Service information
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │───▶│  Backend API    │───▶│   ETLab API     │
│                 │    │                 │    │                 │
│ React/Mobile    │    │  Spring Boot    │    │  External API   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │ In-Memory       │
                       │ Session Store   │
                       └─────────────────┘
```

### Key Components

- **Controllers**: Handle HTTP requests and responses
- **Security Layer**: JWT authentication and CORS configuration
- **Service Layer**: Business logic and ETLab API integration
- **Session Management**: In-memory user session storage
- **Error Handling**: Global exception handling with structured responses

## 🚀 Deployment

### Render Deployment

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure build settings:**
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -XX:+UseContainerSupport -XX:MaxRAMPercentage=75 -jar target/*.jar`

4. **Set environment variables:**
   ```
   JWT_SECRET=your-production-jwt-secret-32-chars-minimum
   ETLAB_API_BASE_URL=https://your-etlab-api.com/api
   CORS_ALLOWED_ORIGINS=https://your-frontend-app.com
   ```

### Docker Deployment

```bash
# Build the image
docker build -t etlabapp-backend .

# Run with environment variables
docker run -p 8080:8080 \
  -e JWT_SECRET=your-secret \
  -e ETLAB_API_BASE_URL=https://api.example.com \
  etlabapp-backend
```

### Cloud Platforms

The application is ready for deployment on:
- **Render** (recommended)
- **Heroku**
- **Railway**
- **Google Cloud Run**
- **AWS Elastic Beanstalk**

## 🔒 Security

### JWT Authentication

- Uses HMAC256 algorithm for token signing
- Configurable token expiration (default: 24 hours)
- Automatic token validation on protected endpoints

### Session Security

- Sessions stored in-memory (not persisted)
- Automatic session cleanup for expired entries
- No sensitive data logged

### Best Practices

- ✅ Environment-based configuration
- ✅ Secure JWT secret requirement
- ✅ CORS configuration
- ✅ Input validation
- ✅ Structured error responses
- ✅ Request/response logging

## 🐛 Troubleshooting

### Common Issues

#### 1. "Invalid username or password" on correct credentials
- **Cause**: ETLab API connectivity issues
- **Solution**: Check `ETLAB_API_BASE_URL` and network connectivity

#### 2. JWT Authentication failures
- **Cause**: Invalid or missing JWT secret
- **Solution**: Ensure `JWT_SECRET` is set and is at least 32 characters

#### 3. CORS errors in browser
- **Cause**: Frontend origin not allowed
- **Solution**: Add your frontend URL to `CORS_ALLOWED_ORIGINS`

#### 4. Session lost after restart
- **Cause**: In-memory sessions are not persisted
- **Solution**: This is expected behavior. Users need to re-login

### Debug Mode

Enable debug logging:

```bash
LOG_LEVEL=DEBUG
APP_LOG_LEVEL=DEBUG
REST_LOG_LEVEL=DEBUG
```

## 🔄 Development

### Local Development Setup

1. **Install Java 21 and Maven**
2. **Clone and configure environment**
3. **Run in development mode:**

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Testing

```bash
# Run all tests
./mvnw test

# Run with coverage
./mvnw test jacoco:report
```

### Building

```bash
# Clean build
./mvnw clean package

# Skip tests for faster builds
./mvnw clean package -DskipTests
```

## 📝 API Documentation

For detailed API documentation with request/response examples, consider adding Swagger/OpenAPI:

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

Then visit: `http://localhost:8080/swagger-ui.html`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/9MidhunPM/TELabApp/issues)
- **Documentation**: This README and inline code comments
- **Discussions**: [GitHub Discussions](https://github.com/9MidhunPM/TELabApp/discussions)

---

**⚠️ Important Security Note**: Never commit your `.env` file or expose your JWT secret. Always use environment variables for sensitive configuration in production.