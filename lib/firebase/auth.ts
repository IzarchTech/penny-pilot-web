import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { UserLoginRequest, UserRegisterRequest } from "../types";
import firebaseApp from "./firebase-config";

/**
 * Gets the Firebase Auth instance.
 */
export const auth = getAuth(firebaseApp);

/**
 * Registers a new user with the given email and password.
 *
 * @param {UserRegisterRequest} request - The user data to register.
 * @returns {Promise<UserCredential>} - The result of the registration.
 */
export const registerUser = async ({
  email,
  name,
  password,
}: UserRegisterRequest): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, { displayName: name });

  return userCredential;
};

/**
 * Logs in an existing user with the given email and password.
 *
 * @param {UserLoginRequest} payload - The user data to login.
 * @returns {Promise<UserCredential>} - The result of the login.
 */
export const userLogin = (
  payload: UserLoginRequest
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, payload.email, payload.password);
};

/**
 * Logs in an existing user using Google Auth.
 *
 * @returns {Promise<UserCredential>} - The result of the login.
 */
export const googleAuth = (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();

  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  return signInWithPopup(auth, provider);
};

/**
 * Logs out the current user.
 *
 * @returns {Promise<void>} - The result of the logout.
 */
export const userLogout = (): Promise<void> => {
  return signOut(auth);
};
