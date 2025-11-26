import React, {useEffect} from 'react';
import { View} from 'react-native';
import NewShift from './components/NewShift';
import { styles } from './styles/ShiftSchedule.style';
import ExsistingShift from './components/ExsistingShift';
import { useDispatch } from 'react-redux';
import { AppDispatch} from './../../app/store';
import { fetchShifts } from './../../app/slice/shiftSlice';


const ShiftSchedulesScreen = () => {
   const dispatch = useDispatch<AppDispatch>();
   useEffect(()=>{
    dispatch( fetchShifts())
   },[])
  return (
      <View style={styles.container}>
      <NewShift/>
      <ExsistingShift/>
      </View>
  );
};



export default ShiftSchedulesScreen;
