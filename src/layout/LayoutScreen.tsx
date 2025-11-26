import Layout from "../layout/Layout";
import { createStackNavigator } from "@react-navigation/stack";
import StaffStatusScreen from "../screens/StaffStatus/StaffStatusScreen";
import ShiftSchedulesScreen from "../screens/ShiftSchedules/ShiftSchedulesScreen";
import AddStaffScreen from "../screens/AddStaff/AddStaffScreen";

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
