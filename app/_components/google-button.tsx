"use client";

import googleLogo from "@/assets/google_logo.svg";
import Image from "next/image";
import { useAuth } from "@/providers/auth.provider";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { googleAuth } from "@/lib/firebase/auth";
import { useState } from "react";

export default function GoogleAuthButton() {
  const { setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const response = await googleAuth();
      setCurrentUser(response.user);
    } catch (error) {
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
