import React, { useState, useEffect } from 'react';
import { useAuth, useUser, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
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
              <div style={{ position: "fixed", top: 0, left: 0, padding:"20px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start", zIndex: 1000 }}>
                  {!firebaseSignedIn && !isSignedIn ? (<>
                      <SignInButton className="signbutton"style={{ margin: "0 10px" }} />
</>
                  ) : (
                      <>
                          {/* <button style={{ margin: "0 10px" }} onClick={getFirestoreData}>Test Database connection</button> */}
                          <SignOutButton className="signbutton" style={{ margin: "0 10px" }} onClick={handleSignOut} />
                      </>
                  )}
              </div>
          </main>
      );
  }
  
  export default FirebaseUI;