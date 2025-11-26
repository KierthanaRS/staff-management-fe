import React, { forwardRef, useImperativeHandle } from 'react';
import DropDown from '../../../components/common/DropDown';
import { FormData, Ref, Props } from '../../../types/staff';
import { useSelector } from 'react-redux';
import {  RootState } from '../../../app/store';




const Shift = forwardRef<Ref, Props>((props, ref) => {
  const { formData, errors, setErrors, handleInputChange } = props;
    const { shifts } = useSelector((state: RootState) => state.shift);
    const data = shifts.map(shift => ({
      label: shift.shift_name,
      value: shift.id,
    }));

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.shift) newErrors.shift = 'shift is required';
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

  return (
    <DropDown
      label="Assigned Shift"
      selectedValue={formData.shift}
      onValueChange={(value: string) => handleInputChange('shift', value)}
      items={data}
      placeholder="No Shift Assigned"
      error={errors.shift}
    />
  );
});

export default Shift;
