import React from 'react';
import InputField from '../../../components/common/InputField';
import TimePicker from '../../../components/common/TimePicker';
import Button from '../../../components/common/Button';
import { styles } from '../styles/NewShift.styles';
import { View, Text } from 'react-native';
import DaySelector from '../../../components/common/DaySelector';

const NewShift: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Shift</Text>
      <View style={styles.underline}></View>
        <InputField
          value=""
          placeholder="Shift Name (e.g., Closing Shift)"
          onChangeText={() => {}}
        />
        <View style={styles.timer}>
          <View style={styles.timerComponent}>
            <TimePicker label="Start Time" value="00:00" onChange={() => {}} />
          </View>
          <View style={styles.timerComponent}>
            <TimePicker label=" End Time" value="00:00" onChange={() => {}} />
          </View>
        </View>
        <DaySelector 
          value={[]}
          onChange={() => {}}
        />
        <Button
         title="+  Create Shift Schedule"
         onPress={()=>{}}
         />
    </View>
  );
};

export default NewShift;
