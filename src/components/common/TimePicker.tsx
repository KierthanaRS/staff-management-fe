import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Clock } from 'lucide-react-native';
import { styles } from '../styles/TimePicker.styles';
import { TimePickerProps } from '../../types';
import { View, Text, TouchableOpacity, Modal, Platform, Button } from 'react-native';
import { useAppLayout } from '../../hooks/useAppLayout';

const TimePicker = ({ label, value, onChange }: TimePickerProps) => {
  const [show, setShow] = useState(false);
  const [tempTime, setTempTime] = useState<Date>(new Date());
  const { isios } = useAppLayout();
  
  const onTimeSelected = (_: any, selectedTime?: Date) => {
    if (!isios) {
      setShow(false);
      if (selectedTime) {
        const hours = selectedTime.getHours().toString().padStart(2, '0');
        const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
        onChange(`${hours}:${minutes}`);
      }
    } else {
      if (selectedTime) {
        setTempTime(selectedTime);
      }
    }
  };

  const handleWebChange = (e: any) => {
    onChange(e.target.value);
  };

  const confirmTime = () => {
    const hours = tempTime.getHours().toString().padStart(2, "0");
    const minutes = tempTime.getMinutes().toString().padStart(2, "0");
    onChange(`${hours}:${minutes}`);
    setShow(false);
  };

  const cancelTime = () => {
    setShow(false);
  };

  const parseTimeValue = (timeString: string | undefined): Date => {
    if (timeString) {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      return date;
    }
    return new Date();
  };

  const openPicker = () => {
    setTempTime(parseTimeValue(value));
    setShow(true);
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
          <TouchableOpacity style={styles.input} onPress={openPicker}>
            <Text style={value ? styles.value : styles.placeholder}>
              {value || 'HH:MM'}
            </Text>
            <Clock size={20} />
          </TouchableOpacity>

          {isios && show && (
            <Modal animationType="slide" transparent={true} visible={show}>
              <View style={styles.overlay}>
                <View style={styles.content}>
                  
                  <DateTimePicker
                    value={tempTime}
                    mode="time"
                    display="spinner"
                    onChange={onTimeSelected}
                  />
                  <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={cancelTime} />
                    <Button title="Confirm" onPress={confirmTime} />
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {!isios && show && (
            <DateTimePicker 
              value={parseTimeValue(value)} 
              mode="time" 
              is24Hour={true} 
              display="default" 
              onChange={onTimeSelected} 
            />
          )}
        </View>
      )}
    </View>
  );
};

export default TimePicker;