import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Clock } from 'lucide-react-native';
import { parseTimeValue, formatTime } from "../../utils/timeUtils";
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
        onChange(formatTime(selectedTime));
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
    onChange(formatTime(tempTime));
    setShow(false);
  };

  const cancelTime = () => {
    setShow(false);
  };


  const openPicker = () => {
    setTempTime(parseTimeValue(value));
    setShow(true);
  };

  return (
    <View style={styles.container} testID="time-picker-root">
      {label && <Text style={styles.label}>{label}</Text>}
      {Platform.OS === "web" ? (
        <input
          type="time"
          value={value}
          onChange={handleWebChange}
          data-testid="web-time-input"
          // @ts-expect-error testID is used by react-native-testing-library for web
          testID="web-time-input"
          aria-label="web-time-input"
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