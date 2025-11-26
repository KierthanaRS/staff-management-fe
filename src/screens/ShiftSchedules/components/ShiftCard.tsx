import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { styles } from '../styles/ShiftCard.style';
import {theme } from '../../../theme'

interface Props {
  shift: any;
  onDelete: () => void;
}

const ShiftCard = ({ shift, onDelete }: Props) => {
  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const start = formatTime(shift.start_time);
  const end = formatTime(shift.end_time);

  const days = shift.shift_days?.map((d: any) => d.day) || [];

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{shift.shift_name} Shift</Text>

        <TouchableOpacity onPress={onDelete}>
            <Trash2 size={22} color={theme.colours.secondary}/>
        </TouchableOpacity>
      </View>

      <Text style={styles.time}>
        {start} - {end}
      </Text>

      <View style={styles.daysRow}>
        {days.map((day: string) => (
          <View key={day} style={styles.dayPill}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ShiftCard;
