import { useSession } from "next-auth/react";

// Custom hook to get the currently logged-in user in a client component.
export function useCurrentUser() {
  const { data: session, status } = useSession();
  
  // Return the user object from session
  return session?.user;
}