# ETLab App - React Native Student Portal

A comprehensive React Native app built with Expo featuring authentication, attendance tracking, results management, timetable viewing, and AI-powered assistance.

## 🌟 Features

- 🔐 **Secure Authentication**: Login with university credentials
- 👤 **Profile Management**: View user profile and details
- 📊 **Attendance Tracking**: Real-time subject-wise attendance with summary
- � **Results Dashboard**: View exam results and performance analytics
- 📅 **Smart Timetable**: Interactive schedule with day/period view
- 🤖 **AI Assistant**: Get insights about attendance and results using AI
- �🔒 **Token Management**: Secure token storage using expo-secure-store
- 🔄 **Fresh Token Validation**: Always uses fresh tokens, never cached ones
- 📱 **Modern UI**: Clean, intuitive interface with smooth animations
- ⚡ **Optimized Performance**: Fast data loading and caching
- 🎯 **Context-Based State**: Global authentication and data management
- 🚫 **Race Condition Prevention**: AbortController for request cancellation

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo Go app on your mobile device

### Installation

1. **Clone and navigate:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   # Copy the template
   cp .env.example .env
   
   # Edit .env and add your actual API URLs
   ```

3. **Start the app:**
   ```bash
   npm start
   ```

4. **Run on device:**
   - Scan QR code with Expo Go (Android) or Camera (iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser

## 🔧 Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory with:

```env
# Backend API base URL (your actual backend server)
EXPO_PUBLIC_API_BASE_URL=https://your-backend-api.com

# AI Service base URL (your actual AI service)
EXPO_PUBLIC_AI_BASE_URL=http://your-ai-service:port
```

### Security Best Practices

**✅ DO:**
- Keep `.env` file local only (never commit to Git)
- Use `.env.example` as a template
- Add new variables to both `.env` and `.env.example`
- Prefix all variables with `EXPO_PUBLIC_`

**❌ DON'T:**
- Commit `.env` file to Git
- Hardcode API URLs in source code
- Share API keys publicly
- Use production credentials in development

**Note:** The app validates environment variables on startup and will not run without proper configuration.

## 📁 Project Structure

```
├── App.jsx                        # Main app with navigation
├── api.jsx                        # Backend API functions
├── .env.example                   # Environment variables template
├── components/
│   ├── AIFloatingButton.jsx       # AI assistant floating button
│   ├── icons/SvgIcons.jsx         # Custom SVG icon components
│   ├── AttendanceCard.jsx         # Attendance display card
│   ├── ResultsOverviewCard.jsx    # Results summary card
│   └── ...more UI components
├── contexts/
│   ├── AuthContext.jsx            # Authentication state management
│   └── DataContext.jsx            # App data management
├── screens/
│   ├── LoginScreen.jsx            # Authentication screen
│   ├── HomeScreen.jsx             # Profile and overview
│   ├── AttendanceScreen.jsx       # Attendance tracking
│   ├── ResultsScreen.jsx          # Exam results
│   ├── TimetableScreen.jsx        # Class schedule
│   └── AIScreen.jsx               # AI assistant interface
├── utils/
│   ├── aiApi.js                   # AI service integration
│   ├── attendanceAnalysis.js      # Attendance calculations
│   └── resultsAnalysis.js         # Results analytics
├── styles/
│   ├── commonStyles.js            # Shared styles and colors
│   └── ...screen-specific styles
└── package.json                   # Dependencies and scripts
```

## 📱 App Features

### 🏠 Home Screen
- User profile information display
- Quick overview cards (attendance, results, timetable)
- Profile banner with student details
- Quick action buttons
- Logout functionality with confirmation

### 📊 Attendance Screen
- Overall attendance percentage and summary
- Subject-wise attendance with color coding
- Present/Total hours for each subject
- Pull-to-refresh for latest data
- Low attendance warnings
- Detailed attendance analysis

### 📈 Results Screen
- Exam-wise results display
- Subject grades and marks
- Performance analytics
- Semester-wise breakdown
- Visual indicators for grades
- Results overview cards

### 📅 Timetable Screen
- Day-wise class schedule
- Period-by-period breakdown
- Subject and timing details
- Interactive day selector
- Current day highlighting
- Easy navigation between days

### 🤖 AI Assistant Screen
- Natural language queries about attendance and results
- Quick summary buttons (Attendance/Results)
- Query type toggle (Attendance/Results)
- Markdown-formatted AI responses
- Chat-like interface with smooth animations
- Floating AI button accessible from all screens
- Intelligent data analysis and insights

## 🔐 Authentication & Security

### Authentication Flow
1. User enters university credentials
2. App sends POST request to `/app/login`
3. Receives fresh bearer token on success
4. Immediately fetches user profile and data
5. Stores token securely using expo-secure-store
6. Navigates to main app interface

### Token Management
- Fresh tokens used for all initial requests
- Secure storage with encryption
- Automatic token validation on startup
- Token expiration handling
- Overwrites old tokens on new login

### Security Features
- No hardcoded API URLs or credentials
- Environment-based configuration
- Validation prevents running without proper setup
- Secure token storage (expo-secure-store)
- Race condition prevention (AbortController)
- Automatic cleanup on logout
- All sensitive data in `.env` (gitignored)

## 🔌 API Integration

### Backend Endpoints

All endpoints use Bearer token authentication (except login):

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/app/login` | POST | User authentication |
| `/app/profile` | GET | User profile data |
| `/app/attendance` | GET | Attendance records |
| `/app/results` | GET | Exam results |
| `/app/end-sem-results` | GET | End semester results |
| `/app/timetable` | GET | Class schedule |

### AI Service Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai-query` | POST | AI query processing |

**Request Format:**
```json
{
  "data": [...],  // Attendance or results data
  "query": "Your question here"
}
```

## 🎨 UI/UX Features

- **Custom SVG Icons**: No external icon libraries, lightweight and customizable
- **Smooth Animations**: Entry/exit animations for screens
- **Pull-to-Refresh**: Update data on all screens
- **Loading States**: Clear feedback during data fetching
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on various screen sizes
- **Color-Coded Data**: Visual indicators for performance
- **Bottom Tab Navigation**: Easy access to all features
- **Floating AI Button**: Quick access to AI assistant from anywhere

## 💡 Usage Tips

### Login
- Use your university credentials
- Username format: Student ID (e.g., "224789")
- Password: Your university password

### Navigation
- **Bottom Tabs**: Tap icons to switch between main screens
- **Pull to Refresh**: Swipe down on any screen to reload data
- **AI Button**: Tap the floating button for AI assistant
- **Back Navigation**: Use back button or gesture on AI screen

### AI Assistant
- Ask questions about attendance or results
- Use quick summary buttons for instant insights
- Toggle between Attendance and Results query types
- Type custom queries for specific information

## 🐛 Troubleshooting

### Common Issues

**App won't start:**
- Verify `.env` file exists and contains valid URLs
- Run `npm install` to ensure dependencies are installed
- Try `npx expo start --clear` to clear cache

**Login fails:**
- Check internet connection
- Verify backend API is accessible
- Confirm credentials are correct
- Check console for detailed error messages

**Data not loading:**
- Pull to refresh the screen
- Check token expiration (logout and login again)
- Verify API endpoints are responding
- Check network connectivity

**AI features not working:**
- Verify `EXPO_PUBLIC_AI_BASE_URL` is configured in `.env`
- Check AI service is running
- Review console logs for API errors

### Development Tips
- Use `console.log()` statements for debugging
- Check terminal for real-time logs
- Test on actual devices for best experience
- Clear Expo cache if seeing stale data: `expo start -c`

## 👥 Team Collaboration

### For New Team Members

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   # Copy template
   cp .env.example .env
   
   # Edit .env with actual API URLs
   # (Get URLs from team lead, never commit .env!)
   ```

4. **Start developing:**
   ```bash
   npm start
   ```

### Git Workflow

**✅ DO:**
- Commit all source code changes
- Update `.env.example` when adding new variables
- Test thoroughly before pushing
- Write clear commit messages

**❌ DON'T:**
- Never commit `.env` file (it's gitignored)
- Don't hardcode API URLs or secrets
- Don't push untested code
- Don't commit `node_modules/`

### Pre-Push Checklist

```bash
# Verify .env is not staged
git status | grep "\.env$"
# Should show nothing

# Check for hardcoded URLs (should find only .env.example)
grep -r "http://" --include="*.js" --include="*.jsx" .

# Run the app to verify
npm start
```

## 🔧 Tech Stack

- **Framework**: React Native with Expo SDK ~54.0
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Secure Storage**: expo-secure-store
- **Icons**: Custom SVG components (react-native-svg)
- **Markdown**: react-native-markdown-display
- **UI Components**: React Native core components
- **Styling**: StyleSheet with centralized theme

## 📦 Key Dependencies

```json
{
  "expo": "~54.0.13",
  "react": "18.3.1",
  "react-native": "0.81.4",
  "@react-navigation/native": "^7.3.27",
  "@react-navigation/native-stack": "^7.3.27",
  "@react-navigation/bottom-tabs": "^7.4.0",
  "expo-secure-store": "~14.0.0",
  "react-native-svg": "15.12.1",
  "react-native-markdown-display": "^7.0.2",
  "@react-native-picker/picker": "2.11.1"
}
```

## 📄 License

This project is part of the ETLab application system.

---

## 🆘 Support

For issues, questions, or contributions, please contact the development team or open an issue in the repository.

**Remember:** Keep `.env` file local and never commit sensitive data! 🔒
