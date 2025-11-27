import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  useRoute,
  useNavigation,
  NavigationProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { styles } from './Layout.style';
import type { RootStackParamList } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const activeChild = getFocusedRouteNameFromRoute(route) ?? 'Main';
  const Navigate = (screen: 'StaffStatus' | 'ShiftSchedule' | 'Addstaff') => {
    navigation.navigate('Main', { screen: screen });
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Staff Manager</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={
            activeChild === 'StaffStatus' ? styles.activeLink : styles.link
          }
          onPress={() => Navigate('StaffStatus')}
        >
          <Text style={styles.linkText}>Staff Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeChild === 'ShiftSchedule' ? styles.activeLink : styles.link
          }
          onPress={() => Navigate('ShiftSchedule')}
        >
          <Text style={styles.linkText}>Shift Schedules</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default Layout;
