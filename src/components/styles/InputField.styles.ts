import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const inputFieldStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: theme.typography.md,
    fontWeight: '500',
    color: theme.colours.text,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colours.border,
    borderRadius: 8,
    backgroundColor: theme.colours.background,
    paddingHorizontal: 12,
  },
  inputContainerFocused: {
    borderColor: theme.colours.primary,
  },
  inputContainerError: {
    borderColor: theme.colours.secondary,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: theme.colours.text,
  },
  icon: {
    marginLeft: 8,
  },
  errorText: {
    fontSize: 14,
    color: theme.colours.secondary,
    marginTop: 4,
  },
});
