import React, { forwardRef, useImperativeHandle } from 'react';
import DropDown from '../../../components/common/DropDown';
import { StaffFormData, Ref, Props } from '../../../types';

const Role = forwardRef<Ref, Props>((props, ref) => {
  const { formData, errors, setErrors, handleInputChange } = props;
  const roles = [
    { label: 'Manager', value: 'Manager' },
    { label: 'Cashier', value: 'Cashier' },
    { label: 'Chef', value: 'Chef' },
    { label: 'Waiter', value: 'Waiter' },
    { label: 'Cleaner', value: 'Cleaner' },
  ];

  const validate = (): boolean => {
    const newErrors: Partial<StaffFormData> = {};
    if (!formData.role) newErrors.role = 'Role is required';
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

  return (
    <DropDown
      label="Assigned Role"
      selectedValue={formData.role}
      onValueChange={(value: string) => handleInputChange('role', value)}
      items={roles}
      placeholder="Select Role"
      error={errors.role}
    />
  );
});

export default Role;
