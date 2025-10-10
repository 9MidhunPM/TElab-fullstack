# Security Configuration

This document outlines security best practices for the ETLab App frontend.

## Environment Variables

### Public Variables (EXPO_PUBLIC_)
Variables prefixed with `EXPO_PUBLIC_` are bundled into the client-side code and are visible to users. Only use this prefix for non-sensitive configuration.

**Safe to use with EXPO_PUBLIC_:**
- API base URLs (public endpoints)
- Feature flags
- Public configuration IDs
- Analytics tracking IDs (non-sensitive)

**Never use with EXPO_PUBLIC_:**
- API keys or secrets
- Database credentials
- Private tokens
- Internal system URLs

### Required Environment Variables

```bash
# API Configuration (public)
EXPO_PUBLIC_API_BASE_URL=https://your-api-url.com

# Optional: Analytics (if tracking ID is not sensitive)
# EXPO_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: Error tracking (if DSN is not sensitive)
# EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## Secure Storage

### User Tokens
- Stored using `expo-secure-store` for encryption
- Never logged or exposed in plain text
- Automatically cleared on logout
- Validated on app startup

### Storage Keys
```javascript
const TOKEN_KEY = 'userToken';     // Encrypted user authentication token
const USER_KEY = 'userData';       // Encrypted user profile data
```

## API Security

### Token Management
- Fresh tokens always used from login response
- No reliance on cached/stored tokens for initial authentication
- Bearer token authentication for all protected endpoints
- Automatic token validation and cleanup

### Request Security
- AbortController used to prevent race conditions
- Request cancellation on component unmount
- No sensitive data in URL parameters
- Proper error handling without exposing internal details

## Git Security

### Ignored Files
The following sensitive files are ignored by git:

```gitignore
# Environment files
.env
.env.local
.env.production
.env.staging
.env.development
.env*.local

# VS Code settings (may contain sensitive paths)
.vscode/settings.json
.vscode/launch.json

# Logs (may contain sensitive data)
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Dependencies and build artifacts
node_modules/
.expo/
dist/
web-build/
```

### Environment File Strategy
1. **`.env`** - Local development (never committed)
2. **`.env.example`** - Template with dummy values (committed)
3. **Production** - Environment variables set in deployment platform

## Code Security

### Logging
- No sensitive data in console.log statements
- No raw API responses logged
- User-friendly error messages only
- Process-level logging instead of data dumps

### Error Handling
- Generic error messages for users
- Detailed errors only in development
- No stack traces exposed to users
- Graceful failure handling

## Deployment Security

### Production Checklist
- [ ] Environment variables configured in deployment platform
- [ ] No `.env` files in production builds
- [ ] API URLs point to production endpoints
- [ ] Debug logging disabled
- [ ] Error reporting configured (if applicable)
- [ ] Security headers configured on API endpoints

### Environment Separation
- **Development**: Use `.env` with development API URLs
- **Staging**: Environment variables with staging API URLs  
- **Production**: Environment variables with production API URLs

## Security Testing

### Regular Checks
1. **Expo build analysis**: Check what environment variables are bundled
2. **Network inspection**: Verify no sensitive data in network requests
3. **Storage inspection**: Ensure secure storage is properly encrypted
4. **Log review**: No sensitive data in application logs

### Tools
- Expo CLI for build analysis
- React Native Debugger for network inspection
- Device DevTools for storage inspection

## Incident Response

### If Sensitive Data is Exposed
1. **Immediate**: Remove sensitive data from code
2. **Git cleanup**: Remove from git history if necessary
3. **Rotation**: Rotate any exposed credentials
4. **Review**: Audit entire codebase for similar issues
5. **Update**: Improve security practices and documentation

### Contact
For security issues, contact the development team immediately.