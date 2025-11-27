import React, { forwardRef, useImperativeHandle } from 'react';
import InputField from '../../../components/common/InputField';
import { StaffFormData, Ref, Props } from '../../../types';

const Email = forwardRef<Ref, Props>((props, ref) => {
  const { formData, errors, setErrors, handleInputChange } = props;

  const validate = (): boolean => {
    const newErrors: Partial<StaffFormData> = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };
  useImperativeHandle(ref, () => ({
    validate,
  }));

  return (
    <InputField
      label="Email Address"
      value={formData.email}
      onChangeText={value => handleInputChange('email', value)}
      placeholder="jane.doe@example.com"
      keyboardType="email-address"
      autoCapitalize="none"
      error={errors.email}
    />
  );
});

export default Email;
