import React, { forwardRef, useImperativeHandle } from 'react';
import InputField from '../../../components/common/InputField';
import { FormData, Ref, Props } from '../../../types/staff';

const Name = forwardRef<Ref, Props>((props, ref) => {
  const { formData, errors, setErrors, handleInputChange } = props;

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
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
