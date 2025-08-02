# C.U.Shah Medical College App

A React Native mobile application for C.U.Shah Medical College students and staff.

## Project Structure

```
your-app/
│
├── assets/                      # Static resources
│   ├── images/                  # .png, .jpg, .svg, etc.
│   └── fonts/                   # Custom fonts (linked via `react-native.config.js`)
│
├── src/                         # All source code lives here
│
│   ├── components/              # Reusable UI components (atomic)
│   │   ├── Header.jsx
│   │   ├── Button.jsx
│   │   └── CustomInput.jsx
│
│   ├── screens/                 # All screens (views/pages)
│   │   ├── SplashScreen/
│   │   │   ├── index.jsx
│   │   │   └── styles.js
│   │   ├── LoginScreen/
│   │   │   ├── index.jsx
│   │   │   └── styles.js
│   │   └── Dashboard/
│   │       ├── index.jsx
│   │       └── styles.js
│
│   ├── navigation/              # App navigation config
│   │   ├── AppNavigator.jsx
│   │   └── AuthNavigator.jsx    # Optional (if using Auth flow)
│
│   ├── services/                # API logic and helpers
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── userService.js
│
│   ├── constants/               # Static values used across the app
│   │   ├── Colors.js
│   │   ├── Strings.js
│   │   └── Metrics.js           # Sizes, spacing, etc.
│
│   ├── context/                 # Context API (global state)
│   │   └── AuthContext.jsx
│
│   ├── hooks/                   # Custom hooks
│   │   └── useAuth.js
│
│   └── utils/                   # Utility functions
│       ├── validateForm.js
│       └── formatDate.js
│
├── App.jsx                      # Main app component
├── index.js                     # Entry point for React Native
├── package.json
└── babel.config.js              # Babel configuration
```

## Features

- **Authentication System**: Complete login/logout functionality with AsyncStorage persistence
- **Modern UI Components**: Reusable components with consistent styling
- **Navigation**: React Navigation with stack-based navigation
- **State Management**: Context API for global state management
- **Form Validation**: Built-in form validation utilities
- **Responsive Design**: Mobile-first design with proper spacing and typography

## Getting Started

### Prerequisites

- Node.js (>= 18)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd CUShahMedicalCollege
```

2. Install dependencies:

```bash
npm install
```

3. Install iOS dependencies (macOS only):

```bash
cd ios && pod install && cd ..
```

4. Start the Metro bundler:

```bash
npm start
```

5. Run the app:

For Android:

```bash
npm run android
```

For iOS:

```bash
npm run ios
```

## Development

### Adding New Screens

1. Create a new folder in `src/screens/`
2. Add `index.jsx` and `styles.js` files
3. Import and add to navigation in `src/navigation/AppNavigator.jsx`

### Adding New Components

1. Create a new file in `src/components/`
2. Follow the existing component patterns
3. Import and use in screens as needed

### Styling Guidelines

- Use the constants from `src/constants/Colors.js` and `src/constants/Metrics.js`
- Follow the existing component patterns
- Use the predefined color palette and spacing values

### State Management

- Use Context API for global state (see `src/context/AuthContext.jsx`)
- Use local state for component-specific state
- Create custom hooks for reusable logic

## Dependencies

### Core Dependencies

- `react-native`: 0.80.2
- `react`: 19.1.0
- `@react-navigation/native`: Navigation library
- `@react-navigation/stack`: Stack navigation
- `@react-native-async-storage/async-storage`: Local storage
- `react-native-screens`: Native navigation screens
- `react-native-gesture-handler`: Gesture handling

### Development Dependencies

- `@babel/core`: Babel compiler
- `@react-native/babel-preset`: React Native Babel preset
- `eslint`: Code linting
- `prettier`: Code formatting
- `typescript`: TypeScript support

## Project Structure Benefits

1. **Scalability**: Easy to add new features and screens
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Shared components and utilities
4. **Consistency**: Centralized constants and styling
5. **Testing**: Organized structure makes testing easier

## Contributing

1. Follow the existing code structure and patterns
2. Use the predefined constants for colors, spacing, and typography
3. Create reusable components when possible
4. Add proper error handling and loading states
5. Test on both Android and iOS platforms

## License

This project is proprietary to C.U.Shah Medical College.
