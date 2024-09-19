"use client";

import { ReactNode } from "react";
import Logo from "../_components/logo";
import { DarkModeToggle } from "../_components/dark-mode-toggle";
import { useAuth } from "@/providers/auth.provider";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { currentUser, isUserLoading } = useAuth();

  const router = useRouter();

  if (!currentUser && !isUserLoading) {
    router.push("/");
    return null;
  }

  return (
    <main className="h-full grid grid-rows-[auto_1fr] select-none">
      <div className="w-full border-b bg-card text-card-foreground shadow flex items-center justify-between h-20 md:h-24 px-2 md:px-4">
        <Logo path="/overview" />
        <DarkModeToggle />
      </div>
      {isUserLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col pt-4 overflow-y-auto">
          {children}
        </div>
      )}
    </main>
  );
}
