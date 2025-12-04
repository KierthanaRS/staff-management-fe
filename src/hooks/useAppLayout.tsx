import { Platform, useWindowDimensions } from 'react-native';

export const useAppLayout = () => {
  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === 'web';
  return {
    width,
    isWeb,
    isDesktop: isWeb && width >= 1024,
    isTablet: width >= 600 && width < 1024,
    isMobile: width < 600,
  };
};
