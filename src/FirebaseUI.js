import React, { useState, useEffect } from 'react';
import { useAuth, useUser, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHGL9LDXa9T1GbuffqYLaGqgpNZObiocg",
    authDomain: "reconstrusul-aba91.firebaseapp.com",
    projectId: "reconstrusul-aba91",
    storageBucket: "reconstrusul-aba91.appspot.com",
    messagingSenderId: "937255657130",
    appId: "1:937255657130:web:59c015aab48b6a46543ad3",
    measurementId: "G-KHMGTYQHFM"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  function FirebaseUI() {
      const { getToken } = useAuth();
      const { isSignedIn } = useUser();
      const [firebaseSignedIn, setFirebaseSignedIn] = useState(false);
  
      useEffect(() => {
          console.log(isSignedIn, firebaseSignedIn);
          if (isSignedIn && !firebaseSignedIn) {
              signInWithClerk();
          } else if (!isSignedIn && firebaseSignedIn) {
              handleSignOut();
          }
      }, [isSignedIn, firebaseSignedIn]);
  
      useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
              setFirebaseSignedIn(!!user);
          });
          return unsubscribe;
      }, []);
  
      const signInWithClerk = async () => {
        console.log("Signing in with Clerk...");
        try {
            const token = await getToken({ template: "integration_firebase" });
            console.log("Received token:", token);  // Log the token to inspect it
            await signInWithCustomToken(auth, token);
            console.log("User signed in successfully");
        } catch (error) {
            console.error("Error signing in:", error);
            console.error("Detailed error message:", error.message);
        }
    };
    
  
      const handleSignOut = async () => {
          await signOut(auth);
          console.log("User signed out");
      };
  
      const getFirestoreData = async () => {
          const docRef = doc(db, "example", "example-document");
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
          } else {
              console.log("No such document! Creating one...");
              await setDoc(docRef, { name: "New Document", created: new Date() });
          }
      };
  
      return (
          <main style={{ display: "flex", flexDirection: "column", padding: "10px 20px", rowGap: "1rem" }}>
              <div style={{ position: "fixed", top: 0, left: 0, width: "100%", background: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "start", zIndex: 1000 }}>
                  {!firebaseSignedIn && !isSignedIn ? (<>
                      <SignInButton style={{ margin: "0 10px" }} />
</>
                  ) : (
                      <>
                          <button style={{ margin: "0 10px" }} onClick={getFirestoreData}>Get document</button>
                          <SignOutButton style={{ margin: "0 10px" }} onClick={handleSignOut} />
                      </>
                  )}
              </div>
          </main>
      );
  }
  
  export default FirebaseUI;