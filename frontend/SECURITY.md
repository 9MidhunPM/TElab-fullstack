# Security Policy

## 🔒 Overview

This document outlines security practices and configurations for the ETLab App.

## 🔐 Environment Variables

### Required Configuration

```bash
# Backend API (public endpoint)
EXPO_PUBLIC_API_BASE_URL=https://your-backend-api.com

# AI Service (public endpoint)
EXPO_PUBLIC_AI_BASE_URL=http://your-ai-service:port
```

### Important Notes

**EXPO_PUBLIC_ Prefix:**
- Variables with this prefix are bundled into the app
- Visible to end users in the compiled app
- Only use for public/non-sensitive URLs

**Safe for EXPO_PUBLIC_:**
- ✅ Public API endpoints
- ✅ Feature flags
- ✅ Non-sensitive configuration

**Never use with EXPO_PUBLIC_:**
- ❌ API keys or secrets
- ❌ Database credentials
- ❌ Private tokens
- ❌ Internal system URLs

## 🔑 Secure Storage

### User Authentication
- **Storage Method**: `expo-secure-store` with hardware-backed encryption
- **Token Storage**: Encrypted at rest, never logged
- **Auto-Cleanup**: Cleared on logout and token expiration
- **Validation**: Verified on app startup

### Storage Implementation
```javascript
// Encrypted storage keys
const TOKEN_KEY = 'userToken';
const USER_KEY = 'userData';

// All data encrypted using device secure storage
```

## 🛡️ API Security

### Authentication Flow
- Fresh tokens from login response
- Bearer token authentication
- No cached tokens for initial requests
- Automatic token rotation on login
- Token validation on startup

### Request Security
- AbortController for race condition prevention
- Request cancellation on unmount
- No sensitive data in URLs
- Generic error messages to users
- Detailed errors only in development

## 📁 Git Security

### Protected Files (.gitignore)

```gitignore
# Environment files (NEVER commit)
.env
.env.local
.env.production
.env.staging
.env.development
.env*.local

# Logs (may contain sensitive data)
*.log
npm-debug.log*
yarn-debug.log*

# Build artifacts
node_modules/
.expo/
dist/
web-build/
```

### Environment Strategy
| Environment | Configuration | Location |
|-------------|---------------|----------|
| Development | `.env` file | Local only (gitignored) |
| Template | `.env.example` | Committed to repo |
| Production | Platform env vars | Deployment platform |

## 📝 Code Security

### Logging Practices
- ✅ Generic user-facing messages
- ✅ Process-level logging
- ❌ No sensitive data in console logs
- ❌ No raw API responses
- ❌ No user credentials

### Error Handling
- User errors: Generic, helpful messages
- Development: Detailed errors in console
- Production: No stack traces to users
- All errors: Graceful failure handling

## 🚀 Deployment Checklist

### Before Production Deploy
- [ ] `.env` not in build
- [ ] Environment variables configured on platform
- [ ] API URLs point to production
- [ ] Debug logging disabled
- [ ] No hardcoded credentials in code
- [ ] Security headers configured on backend

### Environment Separation
```bash
# Development
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000

# Staging
EXPO_PUBLIC_API_BASE_URL=https://staging-api.example.com

# Production
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

## 🔍 Security Verification

### Pre-Push Checklist
```bash
# 1. Verify .env is gitignored
git check-ignore .env

# 2. Search for hardcoded URLs
grep -r "http://" --include="*.js" --include="*.jsx" .

# 3. Check git status
git status | grep "\.env$"  # Should show nothing

# 4. Verify no sensitive data staged
git diff --cached
```

### Testing Tools
- **Expo CLI**: Build analysis
- **React Native Debugger**: Network inspection
- **Chrome DevTools**: Storage inspection
- **Git**: History auditing

## 🚨 Incident Response

### If Credentials Are Exposed

**Immediate Actions:**
1. Remove sensitive data from code
2. Rotate ALL exposed credentials
3. Review git history for exposure
4. Update security documentation

**Git History Cleanup:**
```bash
# Remove file from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (coordinate with team!)
git push origin --force --all
```

**Prevention:**
- Use `.env` for all sensitive data
- Never commit `.env` files
- Review all commits before pushing
- Use pre-commit hooks for validation

## 📞 Reporting Security Issues

For security vulnerabilities or concerns:
1. **Do not** create public issues
2. Contact the development team directly
3. Provide detailed information about the issue
4. Allow time for assessment and fix

---

**Last Updated:** 2025-10-15  
**Version:** 1.0