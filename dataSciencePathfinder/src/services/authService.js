import { 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from "../firebase/config";

// Google provider instance
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

// Logout
export const logout = async (navigate) => {
  try {
    await signOut(auth);
    console.log("Signout success");
    if (navigate) {
      navigate('/', { replace: true });
    }
    return true;
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};