import Button from '../../../components/common/Button';
import DaySelector from '../../../components/common/DaySelector';
import InputField from '../../../components/common/InputField';
import React, { useState } from 'react';
import TimePicker from '../../../components/common/TimePicker';
import Toast from 'react-native-toast-message';
import { AppDispatch,RootState } from '../../../app/store';
import { createShift } from '../../../app/slice/shiftSlice';
import { styles } from '../styles/NewShift.styles';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const NewShift: React.FC = () => {
  const [shiftName, setShiftName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const { status } = useSelector((state: RootState) => state.shift);
  const dispatch = useDispatch<AppDispatch>();

  if ( status === 'error') {
    Toast.show({
      type: 'error',
      text1: 'Failed to add shift data',
    });
  }
  const handleAddShift = () => {
    try {
      dispatch(
        createShift({
          shift_name: shiftName,
          start_time: startTime,
          end_time: endTime,
          shift_days: days,
        }),
      );
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `${error}`,
      });
    } finally {
      setDays([]);
      setEndTime('');
      setShiftName('');
      setStartTime('');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Shift</Text>
      <View style={styles.underline}></View>
      <InputField
        value={shiftName}
        placeholder="Shift Name (e.g., Closing Shift)"
        onChangeText={setShiftName}
      />

      <View style={styles.timer}>
        <View style={styles.timerComponent}>
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
          />
        </View>
        <View style={styles.timerComponent}>
          <TimePicker label="End Time" value={endTime} onChange={setEndTime} />
        </View>
      </View>
      <DaySelector value={days} onChange={setDays} />
      <Button title="+  Create Shift Schedule" onPress={handleAddShift} />
    </View>
  );
};

export default NewShift;
