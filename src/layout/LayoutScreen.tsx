import React from 'react';
import AddStaffScreen from '../screens/AddStaff/AddStaffScreen';
import Layout from '../layout/Layout';
import ShiftSchedulesScreen from '../screens/ShiftSchedules/ShiftSchedulesScreen';
import StaffStatusScreen from '../screens/StaffStatus/StaffStatusScreen';
import { createStackNavigator } from '@react-navigation/stack';

const InnerStack = createStackNavigator();

const LayoutScreen = () => {
  return (
    <Layout>
      <InnerStack.Navigator screenOptions={{ headerShown: false }}>
        <InnerStack.Screen name="StaffStatus" component={StaffStatusScreen} />
        <InnerStack.Screen name="ShiftSchedule" component={ShiftSchedulesScreen} />
        <InnerStack.Screen name="Addstaff" component={AddStaffScreen} />
      </InnerStack.Navigator>
    </Layout>
  );
};

export default LayoutScreen;
