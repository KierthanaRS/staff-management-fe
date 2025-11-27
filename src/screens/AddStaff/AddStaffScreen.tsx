import React, { useState, useEffect, useRef } from 'react';
import Email from './components/Email';
import Name from './components/Name';
import NestedButton from './components/NestedButton';
import PhoneNumber from './components/PhoneNumber';
import Role from './components/Role';
import Shift from './components/Shift';
import { AppDispatch, RootState } from './../../app/store';
import { addStaffStyles } from './styles/AddStaffScreen.styles';
import { fetchShifts } from './../../app/slice/shiftSlice';
import { FormData, Ref } from '../../types/staff';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';

const AddStaffScreen: React.FC<any> = ({ route }) => {
  const staff = route?.params?.staff;
  const [formData, setFormData] = useState<FormData>({
    fullName: staff?.full_name ?? '',
    phoneNumber: staff?.phone_number ?? '',
    email: staff?.email ?? '',
    shift: staff?.shift_id ? String(staff.shift_id) : '',
    role: staff?.role ?? '',
  });
  const isEdit = !!staff;
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<Ref>(null);
  const phoneRef = useRef<Ref>(null);
  const emailRef = useRef<Ref>(null);
  const shiftRef = useRef<Ref>(null);
  const roleRef = useRef<Ref>(null);
  const { status } = useSelector((state: RootState) => state.shift);
  const { shifts } = useSelector((state: RootState) => state.shift);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // if(shifts.length === 0)
    dispatch(fetchShifts());
  }, []);

  if (status === 'loading') {
    return (
      <View style={addStaffStyles.loading}>
        <ActivityIndicator style={addStaffStyles.activitIndicator} />
        <Text style={addStaffStyles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View>
        <Text>Failed to load shift data</Text>
      </View>
    );
  }

  const validateForm = (): boolean => {
    let isValid = true;
    if (nameRef.current) isValid = nameRef.current.validate() && isValid;
    if (phoneRef.current) isValid = phoneRef.current.validate() && isValid;
    if (emailRef.current) isValid = emailRef.current.validate() && isValid;
    if (shiftRef.current) isValid = shiftRef.current.validate() && isValid;
    if (roleRef.current) isValid = roleRef.current.validate() && isValid;

    return isValid;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <View style={addStaffStyles.container}>
      <ScrollView
        style={addStaffStyles.scrollView}
        contentContainerStyle={addStaffStyles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={addStaffStyles.title}>Add New Staff Member</Text>
        <View style={addStaffStyles.underline}></View>
        <View style={addStaffStyles.formContainer}>
          <Name
            ref={nameRef}
            formData={formData}
            errors={errors}
            setErrors={setErrors}
            handleInputChange={handleInputChange}
          />
          <Email
            ref={emailRef}
            formData={formData}
            errors={errors}
            setErrors={setErrors}
            handleInputChange={handleInputChange}
          />
          <PhoneNumber
            ref={phoneRef}
            formData={formData}
            errors={errors}
            setErrors={setErrors}
            handleInputChange={handleInputChange}
          />
          <Shift
            ref={shiftRef}
            formData={formData}
            errors={errors}
            setErrors={setErrors}
            handleInputChange={handleInputChange}
          />
          <Role
            ref={roleRef}
            formData={formData}
            errors={errors}
            setErrors={setErrors}
            handleInputChange={handleInputChange}
          />
        </View>
        <View style={{ height: 140 }} />
      </ScrollView>
      <View style={addStaffStyles.footer}>
        <NestedButton
        isEdit={isEdit}
        editId={staff?.id}
          formData={formData}
          loading={loading}
          setLoading={setLoading}
          setFormData={setFormData}
          validateForm={validateForm}
        />
      </View>
    </View>
  );
};

export default AddStaffScreen;
