import React from 'react';
import Button from '../../../components/common/Button';
import Toast from 'react-native-toast-message';
import { addStaffStyles } from '../styles/AddStaffScreen.styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../../app/store';
import { View } from 'react-native';
import { createStaff, updateStaffData } from '../../../app/slice/staffSlice';
import { NestedButtonProps } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootStackParamList } from '../../../types';

const NestedButton: React.FC<NestedButtonProps> = props => {
  const {
    isEdit,
    editId,
    formData,
    loading,
    validateForm,
    setFormData,
    setLoading,
  } = props;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { status } = useSelector((state: RootState) => state.staff);
  const { staffList } = useSelector((state: RootState) => state.staff);
  const { roleCapacity } = useSelector((state: RootState) => state.staff);

  const dispatch = useDispatch<AppDispatch>();

  if (status === 'error') {
    Toast.show({
      type: 'error',
      text1: 'Failed to process staff data',
    });
  }

  const handleRegister = async () => {
    if (!validateForm()) return;
    const sameRoleCount = staffList.filter(
      staff =>
        staff.shift_id === Number(formData.shift) &&
        staff.role?.toLowerCase() === formData.role.toLowerCase() &&
        (!isEdit || staff.id !== editId),
    ).length;
    const maxCapacity = roleCapacity[formData.role.toLowerCase()] || 0;

    if (sameRoleCount >= maxCapacity) {
      Toast.show({
        type: 'error',
        text1: `${formData.role} limit reached in this shift.`,
        text2: `Max allowed: ${maxCapacity}. Try assigning to another shift.`,
      });
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        dispatch(
          updateStaffData({
            id: editId!,
            data: {
              full_name: formData.fullName,
              email: formData.email,
              phone_number: formData.phoneNumber || '',
              shift_id: Number(formData.shift),
              staffs_role: formData.role,
            },
          }),
        );
        Toast.show({
          type: 'success',
          text1: 'Staff Details Update!',
        });
      } else {
        dispatch(
          createStaff({
            full_name: formData.fullName,
            email: formData.email,
            phone_number: formData.phoneNumber || '',
            shift_id: Number(formData.shift),
            staffs_role: formData.role,
          }),
        );
        Toast.show({
          type: 'success',
          text1: 'Staff Added!',
        });
      }

      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        shift: '',
        role: '',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
      navigation.navigate('Main', { screen: 'StaffStatus' });
    }
  };

  const handleCancel = () => {
    navigation.navigate('Main', { screen: 'StaffStatus' });
  };

  return (
    <View style={addStaffStyles.buttonContainer}>
      <Button
        title="Cancel"
        onPress={handleCancel}
        disabled={loading}
        variant="secondary"
      />
      <Button
        title="Save Staff Member"
        onPress={handleRegister}
        loading={loading}
        variant="primary"
      />
    </View>
  );
};

export default NestedButton;
