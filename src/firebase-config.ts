import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

// Firebase configuration object containing keys and identifiers for your app
const firebaseConfig = {
  apiKey: "AIzaSyDreNKFMwBe_Dshm2ZCW9MjK4uwBL_RxpE",
  authDomain: "to-do-3e429.firebaseapp.com",
  projectId: "to-do-3e429",
  storageBucket: "to-do-3e429.firebasestorage.app",
  messagingSenderId: "310090897136",
  appId: "1:310090897136:web:63666ce590b88ca402d435",
  measurementId: "G-2FMDZLQXPR"
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics for tracking user interactions
const analytics = getAnalytics(app);

// Initialize Firebase Remote Config for managing remote configuration parameters
const remoteConfig = getRemoteConfig(app);

// Configure Remote Config settings
remoteConfig.settings = {
  minimumFetchIntervalMillis: 6000, // Minimum interval between fetches in milliseconds
  fetchTimeoutMillis: 6000,          // Timeout for fetch operations in milliseconds
};

// Set default values for Remote Config parameters
remoteConfig.defaultConfig = {
  showTaskComponent: false, // Default value to control the visibility of the Task component
};

// Export Firebase modules and functions for use in other parts of the application
export { app, analytics, remoteConfig, fetchAndActivate, getValue };
