import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const buttonStyles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

  primary: {
    backgroundColor: theme.colours.primary,
  },

  secondary: {
    backgroundColor: theme.colours.background,
    borderWidth: 1,
    borderColor: theme.colours.primary,
    color: theme.colours.primary,
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    fontSize: theme.typography.md,
    fontWeight: '600',
  },

  primaryText: {
    color: theme.colours.background,
  },
  
  secondaryText: {
    color: theme.colours.text,
  },
});
