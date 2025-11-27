import Button from '../../components/common/Button';
import React, { useEffect } from 'react';
import StaffCard from './components/StaffCard';
import Toast from 'react-native-toast-message';
import { AppDispatch, RootState } from './../../app/store';
import { getAttendance } from '../../app/slice/attendanceSlice';
import { fetchStaffs, deleteStaffData } from '../../app/slice/staffSlice';
import { styles } from './styles/Staff.styles';
import { theme } from '../../theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import type { RootStackParamList } from '../../types';

const StaffStatusScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { loading } = useSelector((state: RootState) => state.staff);
  const { staffList } = useSelector((state: RootState) => state.staff);
  const { checkIns } = useSelector((state: RootState) => state.attendance);
  const { status } = useSelector((state: RootState) => state.staff);
  const dispatch = useDispatch<AppDispatch>();
  
  if ( status === 'error') {
    Toast.show({
      type: 'error',
      text1: 'Failed to load staff data',
    });
  }

  useEffect(() => {
    dispatch(fetchStaffs());
    dispatch(getAttendance());   
  }, []);
  const handleAdd = () => {
    navigation.navigate('Main', { screen: 'Addstaff', params: undefined });
  };

  const handleEdit = (item: any) => {
    navigation.navigate('Main', {
      screen: 'Addstaff',
      params: { staff: item },
    });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteStaffData({ id }));
  };
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colours.primary} />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Button title="+ Add New Staff" onPress={handleAdd} variant="primary" />
      <FlatList
        data={staffList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <StaffCard
            name={item.full_name}
            shift={item.shifts?.shift_name ?? 'No Shift'}
            id={item.id.toString()}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={{ paddingTop: 15 }}
      />
    </View>
  );
};

export default StaffStatusScreen;
