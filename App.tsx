/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import LayoutScreen from './src/layout/LayoutScreen';
import SplashScreen from './src/screens/Spalsh/SplashScreen';
import Toast from 'react-native-toast-message';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {SafeAreaProvider,useSafeAreaInsets,SafeAreaView} from 'react-native-safe-area-context';
import { store } from './src/app/store';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={SplashScreen}  />
      <Stack.Screen name="Main" component={LayoutScreen}  />
     
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  return (
     <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <MyStack />
           <Toast />
        </NavigationContainer>
      </Provider>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
