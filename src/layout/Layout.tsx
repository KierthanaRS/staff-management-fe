import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { styles } from './layout.style'

interface LayoutProps {
  navigation: any;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ navigation, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Staff Manager</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('StaffStatus')}
        >
          <Text style={styles.linkText}>Staff Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('ShiftSchedule')}
        >
          <Text style={styles.linkText}>Shift Schedules</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

export default Layout;
