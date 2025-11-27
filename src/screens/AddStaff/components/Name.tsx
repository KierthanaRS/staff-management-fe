import React, { forwardRef, useImperativeHandle } from 'react';
import InputField from '../../../components/common/InputField';
import { StaffFormData, Ref, Props } from '../../../types';

const Name = forwardRef<Ref, Props>((props, ref) => {
  const { formData, errors, setErrors, handleInputChange } = props;

  const validate = (): boolean => {
    const newErrors: Partial<StaffFormData> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

  return (
    <InputField
      label="Full Name"
      value={formData.fullName}
      onChangeText={value => handleInputChange('fullName', value)}
      placeholder="Jane Doe"
      error={errors.fullName}
      autoCapitalize="words"
    />
  );
});

export default Name;
