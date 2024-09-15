import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { UserLoginRequest, UserRegisterRequest } from "../types";

const auth = getAuth();

export const registerUser = (payload: UserRegisterRequest) => {
  return createUserWithEmailAndPassword(auth, payload.email, payload.email);
};

export const userLogin = (payload: UserLoginRequest) => {
  return signInWithEmailAndPassword(auth, payload.email, payload.password);
};

export const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    
    return signInWithPopup(auth, provider);
};

export const userLogout = () => {
  signOut(auth);
};
