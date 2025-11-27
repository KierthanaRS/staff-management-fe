import React from 'react';
import { ButtonProps } from '../../../types/staff';
import { addStaffStyles } from '../styles/AddStaffScreen.styles';
import Button from '../../../components/common/Button';
import { View } from 'react-native';
import type {RootStackParamList} from '../../../types/staff'
import Toast from 'react-native-toast-message';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppDispatch } from '../../../app/store';
import { createStaff } from '../../../app/slice/staffSlice';
import { useDispatch } from 'react-redux';

const NestedButton: React.FC<ButtonProps> = props => {
  const { formData,loading, validateForm, setFormData, setLoading } = props;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      dispatch(createStaff({
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phoneNumber || "",
        shift_id: Number(formData.shift),
        staffs_role:formData.role
      }

      ))
      Toast.show({
        type: 'success',
        text1: 'Staff Added!',
      });

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
      navigation.navigate("Main",{screen:"StaffStatus"})
    }
  };

  const handleCancel = () =>{
    navigation.navigate("Main",{screen:"StaffStatus"})
  }

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
