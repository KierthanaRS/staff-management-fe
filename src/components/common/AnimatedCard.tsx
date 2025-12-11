import React, { useEffect, useRef, type PropsWithChildren } from 'react';
import { Animated, type ViewStyle } from 'react-native';

type AnimatedCardProps = PropsWithChildren<{
  style?: ViewStyle;
  index?: number; 
  duration?: number;
  delay?: number;
}>;

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  style,
  index = 0,
  duration = 600,
  delay = 0,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current; 

  useEffect(() => {
    const staggerDelay = index * 150 + delay;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        delay: staggerDelay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: duration,
        delay: staggerDelay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: staggerDelay,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim, index, duration, delay]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedCard;