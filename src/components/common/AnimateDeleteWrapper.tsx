// components/common/AnimatedDeleteWrapper.tsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

type AnimatedDeleteWrapperProps = {
  children: React.ReactNode;
  onDeleteComplete: () => void;
  style?: ViewStyle;
};

export type AnimatedDeleteRef = {
  animateDelete: () => void;
};

const AnimatedDeleteWrapper = forwardRef<AnimatedDeleteRef, AnimatedDeleteWrapperProps>(
  ({ children, onDeleteComplete, style }, ref) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useImperativeHandle(ref, () => ({
      animateDelete: () => {
        console.log('Animation started');
        
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -400,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          console.log('Animation finished:', finished); 
          if (finished) {
            onDeleteComplete();
          }
        });
      },
    }));

    return (
      <Animated.View
        style={[
          style,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}>
        {children}
      </Animated.View>
    );
  }
);

export default AnimatedDeleteWrapper;