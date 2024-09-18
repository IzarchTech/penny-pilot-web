"use client";

import { auth } from "@/lib/firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * The auth context.
 */
const AuthContext = createContext<{
  currentUser: User | null;
  isUserLoading: boolean;
}>({ currentUser: null, isUserLoading: true });

/**
 * Provides an auth context to the application.
 *
 * This component uses the Firebase {@link onAuthStateChanged} method to listen
 * for changes in the user's authentication state. When the user logs in or out,
 * the state is updated and the re-rendered.
 *
 * The `AuthContext` contains two values: `currentUser` and `isUserLoading`.
 * `currentUser` is the authenticated user, or `null` if the user is not
 * authenticated. `isUserLoading` is a boolean indicating whether the user state
 * is being loaded.
 *
 * @param children The children of the component.
 */
export default function AuthProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  // The current user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Whether the user state is being loaded
  const [isUserLoading, setIsUserLoading] = useState(true);

  // The context value
  const value = useMemo(
    () => ({ currentUser, isUserLoading, setCurrentUser }),
    [currentUser, isUserLoading, setCurrentUser]
  );

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the state and mark the state as loaded
      setCurrentUser(user);
      console.log("current user", user);
      setIsUserLoading(false);
    });

    // Unsubscribe when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    /**
     * Provides the context to the children
     *
     * `AuthContext.Provider` is a context provider from React's context API.
     */
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

/**
 * Gets the auth context.
 *
 * @returns The auth context.
 */
export const useAuth = () => useContext(AuthContext);
