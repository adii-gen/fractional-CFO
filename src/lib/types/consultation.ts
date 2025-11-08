export type ConsultationType = "DISCOVERY_CALL" | "STRATEGY_SESSION" | "FOLLOW_UP" | "EMERGENCY";
export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";

export interface ConsultationBooking {
  id: string;
  userId?: string;
  adminId?: string;
  type: ConsultationType;
  status: BookingStatus;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  timezone: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  meetingLink?: string;
  meetingPlatform?: string;
  meetingNotes?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailableSlot {
  id: string;
  adminId: string;
  startTime: Date;
  endTime: Date;
  date: Date;
  slotDuration: number;
  maxBookings: number;
  consultationType: ConsultationType;
  isAvailable: boolean;
  isRecurring: boolean;
  recurringPattern?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingRequest {
  type: ConsultationType;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  timezone?: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
}

export interface UpdateBookingRequest {
  status?: BookingStatus;
  meetingLink?: string;
  meetingNotes?: string;
  adminNotes?: string;
}