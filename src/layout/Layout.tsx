import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  useRoute,
  useNavigation,
  NavigationProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useAppLayout } from '../hooks/useAppLayout';
import { styles } from './Layout.style';
import type { RootStackParamList } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const route = useRoute();
  const { isDesktop } = useAppLayout();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const activeChild = getFocusedRouteNameFromRoute(route) ?? 'Main';
  const Navigate = (screen: 'StaffStatus' | 'ShiftSchedule' | 'Addstaff') => {
    navigation.navigate('Main', { screen: screen });
  };
  return (
    <View style={[styles.container, isDesktop && styles.containerDesktop]}>
      <View style={[isDesktop && styles.topBarDesktop]}>
      <View style={[styles.topBar]}>
        <Text style={styles.title}>Staff Manager</Text>
      </View>
      <View style={[styles.header, isDesktop && styles.headerDesktop]}>
        <TouchableOpacity
          style={[
            isDesktop ? activeChild ==='StaffStatus' ? styles.activeLinkDesktop : styles.linkDesktop :
            activeChild === 'StaffStatus' ? styles.activeLink : styles.link
          ]}
          onPress={() => Navigate('StaffStatus')}
        >
          <Text style={[styles.linkText,isDesktop && styles.linkTextDesktop]}>Staff Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
           isDesktop ? activeChild ==='ShiftSchedule' ? styles.activeLinkDesktop : styles.linkDesktop :
            activeChild === 'ShiftSchedule' ? styles.activeLink : styles.link
          ]}
          onPress={() => Navigate('ShiftSchedule')}
        >
          <Text style={[styles.linkText, isDesktop && styles.linkTextDesktop]}>Shift Schedules</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={[styles.content, isDesktop && styles.contentDesktop ]}>{children}</View>
    </View>
  );
};

export default Layout;
