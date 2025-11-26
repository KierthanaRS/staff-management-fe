import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/DaySelector.styles";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  value: string[];          
  onChange: (days: string[]) => void;
}

const DaySelector = ({ value, onChange }: Props) => {

  const toggleDay = (day: string) => {
    if (value.includes(day)) {
        console.log("Hi There")
      onChange(value.filter(d => d !== day)); 
    } else {
      // add the day immutably and notify parent
      onChange([...value, day]);
    }
    console.log(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Days</Text>

      <View style={styles.daysRow}>
        {DAYS.map((day) => (
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
