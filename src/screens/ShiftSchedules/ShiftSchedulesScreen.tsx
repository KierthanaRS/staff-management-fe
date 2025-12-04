import ExsistingShift from './components/ExsistingShift';
import NewShift from './components/NewShift';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { AppDispatch, RootState } from './../../app/store';
import { fetchShifts } from './../../app/slice/shiftSlice';
import { styles } from './styles/ShiftSchedule.style';
import { useAppLayout } from '../../hooks/useAppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';

const ShiftSchedulesScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDesktop } = useAppLayout();
  const { status } = useSelector((state: RootState) => state.shift);
  useEffect(() => {
    dispatch(fetchShifts());
  }, []);

  if ( status === 'error') {
    Toast.show({
      type: 'error',
      text1: 'Failed to load shift data',
    });
  }
  return (
    <View style={[styles.container, isDesktop && styles.containerDesktop]} >
      <NewShift />
      <ExsistingShift />
    </View>
  );
};

export default ShiftSchedulesScreen;
