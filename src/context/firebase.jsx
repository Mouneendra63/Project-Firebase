
import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";
import {getFirestore,collection,addDoc, Firestore,getDocs,query,where, doc, getDoc} from 'firebase/firestore'
// Create a Firebase context
const FirebaseContext = createContext(null);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy5g4gRL51Sw86Y4s1xn19obFyPn4iMSE",
  authDomain: "bookify-1e66d.firebaseapp.com",
  projectId: "bookify-1e66d",
  storageBucket: "bookify-1e66d.firebasestorage.app",
  messagingSenderId: "964979611247",
  appId: "1:964979611247:web:9af1d4077e6b95f01edf9a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// Set Google Provider
const googleProvider = new GoogleAuthProvider();

const firestore=getFirestore(firebaseApp);

// Custom hook for using Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase Provider component
export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Function to check session expiration
  const checkSession = () => {
    const sessionData = localStorage.getItem("sessionExpiry");
    if (sessionData) {
      const expiryTime = JSON.parse(sessionData);
      if (new Date().getTime() > expiryTime) {
        logout(); // Session expired, log out user
      }
    }
  };

  // Track user authentication state
  useEffect(() => {
    checkSession(); // Check session on component mount

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setCurrentUser(user);

        // Store session expiry timestamp (24 hours from now)
        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem("sessionExpiry", JSON.stringify(expiryTime));
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign Up Function
  const signUpUserWithEmailPassword = async (email, password) => {
    try {
      await setPersistence(firebaseAuth, browserLocalPersistence); // Ensure persistence
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  // Sign In Function
  const signIn = async (email, password) => {
    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  // Sign In with Google
  const withGoogle = async () => {
    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);
      const userCredential = await signInWithPopup(firebaseAuth, googleProvider);
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      throw error;
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      setCurrentUser(null);
      localStorage.removeItem("sessionExpiry"); // Remove session expiry timestamp
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const isLoggedIn = currentUser ? true : false;

  // Add listing
  // Add listing function (Fixed)
  const addListing = async (name, isbnNumber, price, story) => {
    if (!currentUser) {
      throw new Error("User must be logged in to add a listing.");
    }

    try {
      const uploadResult = await addDoc(collection(firestore, "books"), {
        name,
        isbnNumber,
        price,
        story,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName || "Anonymous",
      });
      return uploadResult;
    } catch (error) {
      console.error("Error adding book listing:", error);
      throw error;
    }
  };

  // get list all books
  const getAllbooks=()=>
  {
    return getDocs(collection(firestore,"books"));
  }

  //get particular book
  // const getBook = async (id) => {
  //     const docRef=doc(firestore,"books",id);
  //     const result=await getDoc(docRef);
  //     return result;
  // };
  const getBooksByUserId = async (userId) => {
    if (!userId) {
        console.error("User ID is undefined");
        return [];
    }

    try {
        // Query Firestore for books where userId matches
        const q = query(collection(firestore, "books"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.warn("No books found for this user!");
            return [];
        }

        // Debugging: Check if the first document matches userId
        const firstDoc = querySnapshot.docs[0]?.data();
        console.log("First book document:", firstDoc);

        // Ensure only matching userId is returned
        const books = querySnapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            .filter(book => book.userId === userId); // Extra filter to ensure match

        return firstDoc;
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
};
  return (
    <FirebaseContext.Provider value={{ currentUser, signUpUserWithEmailPassword, signIn, withGoogle, logout, isLoggedIn,addListing,getAllbooks ,getBooksByUserId}}>
      {children}
    </FirebaseContext.Provider>
  );
};

