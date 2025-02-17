import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
const FirebaseContext = createContext(null);



const firebaseConfig = {
  apiKey: "AIzaSyBy5g4gRL51Sw86Y4s1xn19obFyPn4iMSE",
  authDomain: "bookify-1e66d.firebaseapp.com",
  projectId: "bookify-1e66d",
  storageBucket: "bookify-1e66d.firebasestorage.app",
  messagingSenderId: "964979611247",
  appId: "1:964979611247:web:9af1d4077e6b95f01edf9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children, value }) => {
    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    );
};