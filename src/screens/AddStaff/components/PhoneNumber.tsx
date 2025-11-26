import React, { forwardRef, useImperativeHandle } from 'react';
import InputField from '../../../components/common/InputField';
import { FormData, Ref, Props } from '../../../types/staff';

const PhoneNumber = forwardRef<Ref, Props>((props, ref) => {
  const { formData, errors, setErrors, handleInputChange } = props;

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.phoneNumber.trim())
       return true;
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Phone number is invalid';
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));
  return (
    <InputField
      label="Phone Number (Optional)"
      value={formData.phoneNumber}
      onChangeText={value => handleInputChange('phoneNumber', value)}
      placeholder="(555) 555-5555"
      keyboardType="phone-pad"
      autoCapitalize="none"
      error={errors.phoneNumber}
    />
  );
});

export default PhoneNumber;
