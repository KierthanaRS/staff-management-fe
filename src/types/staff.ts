export interface Staff{
    id: number;
    
}

export interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  shift: string;
  role: string;
}

export interface Props {
  formData: FormData;
  errors: Partial<FormData>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormData>>>;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

export interface ButtonProps {
  isEdit : boolean,
  editId?: number,
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  validateForm: () => boolean;
}

export interface Ref {
  validate: () => boolean;
}

export interface ShiftState {
  shifts: any[];
  selectedShift: any | null;
  loading: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export interface StaffState {
  staffList: any[];
  selectedStaff: any | null;
  loading: boolean;
  error: string | null;
}

export type RootStackParamList = {
  Main: {
    screen: 'StaffStatus' | 'ShiftSchedule' | 'Addstaff';
    params?: {
      staff?: any;
    };
  };
  StaffStatus: undefined;
  ShiftSchedule: undefined;
  Addstaff: {
    staff?: any;   
  } | undefined;
};

export interface StaffCardProps {
  name: string;
  shift: string;
  id: string;
  onEdit: () => void;
  onDelete: () => void;
}

export interface TimePickerProps {
  label?: string;
  value: string;
  onChange: (time: string) => void;
}

export interface CreateShiftPayload {
  shift_name: string;
  start_time: string;
  end_time: string;
  shift_days: string[];
}

export interface CreateStaffPayload{
  full_name: string,
  email: string,
  phone_number: string,
  shift_id: number,
  staffs_role: string
}

export interface DeletePayload{
  id: number
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
