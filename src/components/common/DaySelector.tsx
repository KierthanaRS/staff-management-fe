import React from 'react';
import { DAYS, DayselectorProps } from '../../types';
import { styles } from '../styles/DaySelector.styles';
import { View, Text, TouchableOpacity } from 'react-native';

const DaySelector = ({ value, onChange }: DayselectorProps) => {
  const toggleDay = (day: string) => {
    if (value.includes(day)) {
      onChange(value.filter(d => d !== day));
    } else {
      onChange([...value, day]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Days</Text>

      <View style={styles.daysRow}>
        {DAYS.map(day => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              value.includes(day) && styles.daySelected,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                value.includes(day) && styles.dayTextSelected,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DaySelector;
