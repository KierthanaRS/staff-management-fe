import React from 'react'
import TimePicker from '../../../components/common/TimePicker'
import { styles } from '../styles/NewShift.styles'
import { TimerProps } from '../../../types'
import { View, Text } from 'react-native'

const Timer: React.FC <TimerProps> = (props) => {
    const { startTime, endTime, setStartTime, setEndTime, errorMessage } = props;
    return (
        <View>
        <View style={styles.timer}>
          <View style={styles.timerComponent}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={setStartTime}
            />
          </View>
          <View style={styles.timerComponent}>
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={setEndTime}
            />
          </View>
        </View>
        {errorMessage.startTime && (
          <Text style={styles.errorText}>{errorMessage.startTime}</Text>
        )}
        {errorMessage.endTime && (
          <Text style={styles.errorText}>{errorMessage.endTime}</Text>
        )}
      </View>
    )
}

export default Timer