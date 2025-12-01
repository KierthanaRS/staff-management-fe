import Button from '../../../components/common/Button';
import DaySelector from '../../../components/common/DaySelector';
import InputField from '../../../components/common/InputField';
import React, { useState } from 'react';
import Timer from './Timer'
import Toast from 'react-native-toast-message';
import { AppDispatch, RootState } from '../../../app/store';
import { createShift } from '../../../app/slice/shiftSlice';
import { ShiftForm } from '../../../types';
import { styles } from '../styles/NewShift.styles';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const NewShift: React.FC = () => {
  const [shiftName, setShiftName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<Partial<ShiftForm>>({});
  const { status } = useSelector((state: RootState) => state.shift);
  const dispatch = useDispatch<AppDispatch>();

  if (status === 'error') {
    Toast.show({
      type: 'error',
      text1: 'Failed to add shift data',
    });
  }

  const validateShift = () => {
    const errors: Partial<ShiftForm> = {};

    if (!shiftName.trim()) {
      errors.shiftName = 'Shift name is required';
    }

    if (!startTime || !endTime) {
      errors.startTime = 'Start time and end time are required';
    } else {
      const toMinutes = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
      };

      if (toMinutes(startTime) >= toMinutes(endTime)) {
        errors.endTime = 'End time must be after start time';
      }
    }

    if (days.length === 0) {
      errors.days = 'At least one day must be selected';
    }

    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddShift = () => {
    if (!validateShift()) return;
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
        error={errorMessage.shiftName}
      />
      <Timer
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        errorMessage={errorMessage}
      />
      
      <View>
        <DaySelector value={days} onChange={setDays} />
        {errorMessage.days && (
          <Text style={styles.errorText}>{errorMessage.days}</Text>
        )}
      </View>
      <Button title="+  Create Shift Schedule" onPress={handleAddShift} />
    </View>
  );
};

export default NewShift;
