import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";  // Asegúrate de usar initializeAuth
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';  // Importa AsyncStorage
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} from '@env';

console.log("API_KEY:", API_KEY);

const firebaseConfig = {
  apiKey: "AIzaSyALltWxeALyOgCLEEjIBdVPGMzML3x4vZY",
  authDomain: "modulo5-javier-20200438.firebaseapp.com",
  projectId: "modulo5-javier-20200438",
  storageBucket: "modulo5-javier-20200438.firebasestorage.app",
  messagingSenderId: "996971894058",
  appId: "1:996971894058:web:45e3812f69ca9823fd3a53"
};

console.log("Firebase Config:", firebaseConfig);

const app = initializeApp(firebaseConfig);

// Configurar persistencia para Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage), // Configuración de persistencia
});

const database = getFirestore(app);
const storage = getStorage(app);

export { auth, database, storage };
