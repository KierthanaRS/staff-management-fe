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