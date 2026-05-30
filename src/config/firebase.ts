// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,initializeAuth,getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANf0TOFaeT77y6MFzcB4rAYnBvWNwqtmg",
  authDomain: "geoflags-app.firebaseapp.com",
  projectId: "geoflags-app",
  storageBucket: "geoflags-app.firebasestorage.app",
  messagingSenderId: "1077049585638",
  appId: "1:1077049585638:web:ca61a231ff1f0db08e3027"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});