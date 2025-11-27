import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colours.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  logoText: {
    fontSize: theme.typography.xxxl,
    fontWeight: 'bold',
    color: theme.colours.primary,
  },
});
