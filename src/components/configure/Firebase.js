import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB2cq3W0soZey0qShRe6AulppukRkWmbhE",
  authDomain: "qp-notify.firebaseapp.com",
  projectId: "qp-notify",
  storageBucket: "qp-notify.appspot.com",
  messagingSenderId: "37453497579",
  appId: "1:37453497579:web:708a6c9d77ce436a2a2aae",
  measurementId: "G-WP4JBH6TZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    console.log("Requesting permission...");
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log("Permission granted");
      const token = await getToken(messaging, {
        vapidKey: 'BEvi2A22T6QMXk5dO33i10bZUAH8rohLGnQzytZXCS6lUvwnjzeCt2rnf8z09dZIP1HppVt5Vih8sdBG_ZP5gDs' 
      });
      if (token) {
        console.log("Token generated:", token);
      } else {
        console.log("Failed to generate token");
      }
    } else {
      console.log("User permission denied");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

let currentMessage = null;

export const onMessageListener = () => {
  onMessage(messaging, (payload) => {
    currentMessage = payload;
  });
  return () => {
    currentMessage = null;
  };
};