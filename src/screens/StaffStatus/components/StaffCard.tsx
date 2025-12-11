import React, { useRef } from 'react';
import AnimatedDeleteWrapper from '../../../components/common/AnimateDeleteWrapper';
import { checkIn, checkOut } from '../../../app/slice/attendanceSlice';
import { SquarePen, Trash2 } from 'lucide-react-native';
import { StaffCardProps } from '../../../types';
import { styles } from '../styles/StaffCard.styles';
import { theme } from '../../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import type { RootState, AppDispatch } from '../../../app/store';

const StaffCard = ({ name, shift, id, onEdit, onDelete }: StaffCardProps) => {
  const animationRef = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const staffId = Number(id);
  const attendanceId = useSelector(
    (state: RootState) => state.attendance.checkIns[staffId],
  );
  const isCheckedIn = !!attendanceId;
  const handleToggle = () => {
    if (!isCheckedIn) {
      dispatch(checkIn(staffId));
    } else {
      dispatch(checkOut({ attendance_id: attendanceId }));
    }
  };
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
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{name}</Text>

          <Switch
            value={isCheckedIn}
            onValueChange={handleToggle}
            trackColor={{
              true: theme.colours.primary,
              false: theme.colours.subtext,
            }}
            thumbColor={theme.colours.background}
            style={styles.switch}
          />
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit}>
            <SquarePen color={theme.colours.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Trash2 color={theme.colours.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.shift}>
        Shift: <Text style={styles.shiftHighlight}>{shift}</Text>
      </Text>

      <Text style={styles.id}>
        {id.length > 6 ? `ID: ${id.slice(0, 6)}...` : `ID: ${id}`}
      </Text>
    </View>
    </AnimatedDeleteWrapper>
  );
};

export default StaffCard;
