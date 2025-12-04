import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Clock } from 'lucide-react-native';
import { styles } from '../styles/TimePicker.styles';
import { TimePickerProps } from '../../types';
import { View, Text, TouchableOpacity, Platform } from 'react-native';

const TimePicker = ({ label, value, onChange }: TimePickerProps) => {
  const [show, setShow] = useState(false);

  const onTimeSelected = (_: any, selectedTime?: Date) => {
    setShow(false);

    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      onChange(`${hours}:${minutes}`);
    }
  };
  const handleWebChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {Platform.OS === "web" ? (
        <input
          type="time"
          value={value}
          onChange={handleWebChange}
          style={{ 
            padding: 10, 
            fontSize: 16, 
            borderRadius: 8 
          }}
        />
      ) : (

      <View>
        <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
          <Text style={value ? styles.value : styles.placeholder}>
            {value || 'HH:MM'}
          </Text>

          <Clock size={20} />
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeSelected}
          />
        )}
      </View>
      )}
    </View>
  );
};

export default TimePicker;
