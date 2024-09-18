"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { googleAuth } from "@/lib/firebase/auth";
import googleLogo from "@/assets/google_logo.svg";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * A button that allows users to log in with Google.
 *
 * When the button is clicked, it calls the `googleAuth` function, which
 * authenticates the user using Google's authentication service. If the
 * authentication is successful, it shows a success toast. If the authentication
 * fails, it shows an error toast.
 */
export default function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  /**
   * Handles the button click event.
   *
   * Calls the `googleAuth` function and shows a success or error toast based on
   * the result.
   */
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await googleAuth();
      toast.success("Login successful", {
        position: "top-right",
      }); // Show success toast

      router.push("/overview"); // Redirect to dashboard
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
      }); // Show error toast
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      variant="secondary"
      type="button"
      className="w-full"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <Image src={googleLogo} alt="Google Logo" width={24} height={24} />
          <span>Continue with Google</span>
        </>
      )}
    </Button>
  );
}
