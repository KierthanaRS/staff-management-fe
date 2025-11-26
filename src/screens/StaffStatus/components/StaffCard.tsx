import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { SquarePen, Trash2 } from 'lucide-react-native';
import { styles } from '../styles/StaffCard.styles';
import { StaffCardProps } from '../../../types/staff';
import { theme } from '../../../theme';

const StaffCard = ({
  name,
  shift,
  id,
  active,
  onEdit,
  onDelete,
}: StaffCardProps) => {
  const [checkIn, setCheckIn] = useState(false);
  const onToggle = () => {
    setCheckIn(!checkIn);
  };
  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{name}</Text>

          <Switch
            value={checkIn}
            onValueChange={onToggle}
            thumbColor={theme.colours.primary}
          />
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit}>
            <SquarePen color={theme.colours.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
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
  );
};

export default StaffCard;
