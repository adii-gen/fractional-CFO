"use client";

import ConsultantBooking from "@/components/ConsultationBooking";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

export default function BookConsultationPage() {
  const user = useCurrentUser();

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p>Please log in to book a consultation.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ConsultantBooking
        userId={user.id}
        userEmail={user.email}
        userName={user.name}
        userPhone={user.phone || undefined}
      />
    </div>
  );
}
