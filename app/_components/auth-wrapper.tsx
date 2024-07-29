import { ReactNode } from "react";
import { DarkModeToggle } from "./dark-mode-toggle";
import AuthSidebar from "./auth-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AuthWrapper({
  children,
  pageTitle,
}: Readonly<{ children: ReactNode; pageTitle: string }>) {
  return (
    <main className="h-screen w-full grid lg:grid-cols-[300px_1fr] select-none">
      {/* Sidebar */}
      <AuthSidebar />
      <div className="h-full w-full grid grid-rows-[auto_1fr]">
        <nav className="w-full p-4 flex justify-between items-center bg-secondary lg:rounded-br-md">
          <h3 className="uppercase">{pageTitle}</h3>
          <div className="flex gap-4">
            <DarkModeToggle />
            <Button className="gap-2" variant="outline">
              <Plus />
              <span>Create New</span>
            </Button>
          </div>
        </nav>
        <ScrollArea className="px-4">{children}</ScrollArea>
      </div>
    </main>
  );
}
