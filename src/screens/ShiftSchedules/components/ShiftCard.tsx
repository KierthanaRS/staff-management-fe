import React,{useRef} from 'react';
import AnimatedDeleteWrapper from '../../../components/common/AnimateDeleteWrapper';
import { styles } from '../styles/ShiftCard.style';
import { theme } from '../../../theme';
import { Trash2 } from 'lucide-react-native';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  shift: any;
  onDelete: () => void;
}

const ShiftCard = ({ shift, onDelete }: Props) => {
  const animationRef = useRef<any>(null);
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

  const handleDelete = () => {
    if (animationRef.current) {
      animationRef.current.animateDelete();
    }
  };

  const handleDeleteComplete = () => {
    onDelete();
  };
  return (
    <AnimatedDeleteWrapper
    ref={animationRef}
    onDeleteComplete={handleDeleteComplete}>
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{shift.shift_name} Shift</Text>

        <TouchableOpacity onPress={handleDelete}>
          <Trash2 size={22} color={theme.colours.secondary} />
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
    </AnimatedDeleteWrapper>
  );
};

export default ShiftCard;
