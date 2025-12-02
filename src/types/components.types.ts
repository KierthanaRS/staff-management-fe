import { StaffFormData, ShiftForm } from './index';
export interface Ref {
  validate: () => boolean;
}

export interface Props {
  formData: StaffFormData;
  errors: Partial<StaffFormData>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<StaffFormData>>>;
  handleInputChange: (field: keyof StaffFormData, value: string) => void;
}

export interface NestedButtonProps {
  isEdit: boolean;
  editId?: number;
  formData: StaffFormData;
  setFormData: React.Dispatch<React.SetStateAction<StaffFormData>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  validateForm: () => boolean;
}

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

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
}

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface DayselectorProps {
  value: string[];
  onChange: (days: string[]) => void;
}

interface DropDownItem {
  label: string;
  value: string;
}

export interface DropDownProps {
  label?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: DropDownItem[];
  placeholder?: string;
  error?: string;
}

export interface InputFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  icon?: React.ReactNode;
  onIconPress?: () => void;
}

export interface TimerProps {
  startTime : string,
  setStartTime: React.Dispatch<React.SetStateAction<string>>,
  endTime: string,
  setEndTime: React.Dispatch<React.SetStateAction<string>>,
  errorMessage : Partial<ShiftForm>
}

export type StaffStatusProps = {
  navigate?: (screen: string, params?: any) => void;
};
