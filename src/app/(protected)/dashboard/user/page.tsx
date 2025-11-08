"use client";

import ConsultationBookingModal from "@/components/ConsultationBooking";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";


export default function DashboardPage() {
  const user = useCurrentUser();

  console.log("Logged User ID:", user?.id,user?.phone);

  return <div><ConsultationBookingModal isOpen={true} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } /></div>;
}
