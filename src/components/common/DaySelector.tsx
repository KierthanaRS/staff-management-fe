import React from 'react';
import { DAYS, DayselectorProps } from '../../types';
import { styles } from '../styles/DaySelector.styles';
import { useAppLayout } from '../../hooks/useAppLayout';
import { View, Text, TouchableOpacity } from 'react-native';

const DaySelector = ({ value, onChange }: DayselectorProps) => {
  const { isDesktop } = useAppLayout();
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
            testID={`day-${day}`}
            style={[
              styles.dayButton,
              isDesktop && styles.dayButtonDesktop,
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
