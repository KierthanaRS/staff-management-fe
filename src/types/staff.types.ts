export interface Staff {
  id: number;
}

export interface StaffFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  shift: string;
  role: string;
}

export interface StaffState {
  staffList: any[];
  selectedStaff: any | null;
  loading: boolean;
  error: string | null;
}

export interface CreateStaffPayload {
  full_name: string;
  email: string;
  phone_number: string;
  shift_id: number;
  staffs_role: string;
}

export interface UpdateStaffPayload {
  id: number;
  data: {
    full_name: string;
    email: string;
    phone_number: string;
    shift_id: number;
    staffs_role: string;
  };
}

export interface DeletePayload {
  id: number;
}

export interface AttendanceState {
  checkIns: Record<number, number>;
  loading: boolean;
  error: string | null;
}
