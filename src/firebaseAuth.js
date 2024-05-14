import { useEffect } from 'react';
import { useClerk, useUser } from "@clerk/clerk-react";
import { getAuth, signInWithCustomToken } from 'firebase/auth';

export function useAuthenticateWithFirebase() {
  const { getToken } = useClerk();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      const firebaseAuth = getAuth();

      getToken().then(({ token }) => {
        signInWithCustomToken(firebaseAuth, token)
          .then((userCredential) => {
            console.log("Firebase authentication successful", userCredential.user);
          })
          .catch((error) => {
            console.error("Error authenticating with Firebase", error);
          });
      });
    }
  }, [isSignedIn, getToken]);
}

