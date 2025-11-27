import ExsistingShift from './components/ExsistingShift';
import NewShift from './components/NewShift';
import React, { useEffect } from 'react';
import { AppDispatch } from './../../app/store';
import { fetchShifts } from './../../app/slice/shiftSlice';
import { styles } from './styles/ShiftSchedule.style';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';

const ShiftSchedulesScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchShifts());
  }, []);
  return (
    <View style={styles.container}>
      <NewShift />
      <ExsistingShift />
    </View>
  );
};

export default ShiftSchedulesScreen;
