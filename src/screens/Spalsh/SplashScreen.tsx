import React, { useEffect, useRef } from 'react';
import { Text, Animated } from 'react-native';
import { styles } from './styles/Splash.style';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() =>
        navigation.navigate('Main', {
          screen: 'StaffStatus',
        }),
      );
    }, 1500);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.logoText}>Staff Management</Text>
    </Animated.View>
  );
};

export default SplashScreen;
