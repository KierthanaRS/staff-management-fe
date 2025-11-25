import React, { useEffect, useRef } from 'react';
import { Text, Animated } from 'react-native';
import {styles } from './styles/splash.style'

const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      });
    }, 1500);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.logoText}>Staff Managment</Text>
    </Animated.View>
  );
};



export default SplashScreen;

//.start(() => navigation.replace('Home'))