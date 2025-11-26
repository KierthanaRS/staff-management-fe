import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { styles } from './Layout.style'
import type {RootStackParamList} from '../types/staff'

interface LayoutProps {
  children: React.ReactNode;
}



const Layout: React.FC<LayoutProps> = ({  children }) => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Staff Manager</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={route.name === 'StaffStatus' ? styles.activeLink : styles.link}
         onPress={() => navigation.navigate("Main", {screen: "StaffStatus"})}
        >
          <Text style={styles.linkText}>Staff Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={route.name === 'ShiftSchedule' ? styles.activeLink : styles.link}
          onPress={() => navigation.navigate("Main", { screen: "ShiftSchedule"})}
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
