import { Button } from "@/components/ui/button";
import { userLogout } from "@/lib/firebase/auth";
import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/**
 * A button that logs out the current user.
 *
 * When the button is clicked, it calls the `userLogout` function and shows a
 * success or error toast based on the result.
 */
export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  /**
   * Handles the logout button click.
   *
   * Calls the `userLogout` function and shows a success or error toast based on
   * the result.
   *
   * @async
   */
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Call the logout function
      await userLogout();

      // Show a success toast
      toast.success("Logout successful", {
        position: "top-right",
      });

      // Add a timer delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to the home page
      router.replace("/");
    } catch (error) {
      // Show an error toast
      toast.error("Something went wrong", {
        position: "top-right",
      });

      // Log the error
      console.error(error);
    } finally {
      // Reset the logout state
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      className="w-full hover:bg-red-500 hover:text-slate-100 duration-500 ease-linear gap-4"
      variant="outline"
      disabled={isLoggingOut}
      onClick={handleLogout}
    >
      {isLoggingOut ? (
        // Show a loading indicator while the logout is in progress
        <Loader className="animate-spin" />
      ) : (
        // Show the logout button
        <>
          <LogOut />
          <span>Logout</span>
        </>
      )}
    </Button>
  );
}
