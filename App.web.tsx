import React from "react";
import { Provider } from "react-redux";
import { setWebNavigate } from "./src/navigation/NavigationWebMock.web";
import { store } from "./src/app/store";

import StaffStatusScreen from "./src/screens/StaffStatus/StaffStatusScreen";
import AddStaffScreen from "./src/screens/AddStaff/AddStaffScreen";
import SplashScreen from "./src/screens/Spalsh/SplashScreen";
import Layout from "./src/layout/Layout";
import ShiftSchedulesScreen from "./src/screens/ShiftSchedules/ShiftSchedulesScreen";

type RouteState = {
  name: string;
  params?: any;
};

const resolveRoute = (name: string, params?: any): RouteState => {
  if (name === "Main" && params?.screen) {
    return {
      name: params.screen,
      params: params.params,
    };
  }

  return { name, params };
};

export default function App() {
  const [route, setRoute] = React.useState<RouteState>({
    name: "StaffStatus",
  });

  const navigate = React.useCallback((name: string, params?: any) => {
    setRoute(resolveRoute(name, params));
  }, []);

  React.useEffect(() => {
    setWebNavigate(navigate);
  }, [navigate]);

  const renderRoute = () => {
    switch (route.name) {
      case "Addstaff": {
        const screen = <AddStaffScreen route={{ params: route.params }} />;
        return <Layout>{screen}</Layout>;
      }
      
      case "StaffStatus": {
        const screen = <StaffStatusScreen />;
        return <Layout>{screen}</Layout>;
      }
      case "ShiftSchedule": {
        const screen = <ShiftSchedulesScreen />;
        return <Layout>{screen}</Layout>;
      } 
      case "Splash": {
        return <SplashScreen />;
      }
    }
  };

  return <Provider store={store}>{renderRoute()}</Provider>;
}
