import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      className="w-full hover:bg-red-500 hover:text-slate-100 duration-500 ease-linear gap-4"
      variant="outline"
    >
      <LogOut />
      <span>Logout</span>
    </Button>
  );
}
