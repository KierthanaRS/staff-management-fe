import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const dropDownStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: theme.typography.md,
    fontWeight: '500',
    color: theme.colours.text,
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colours.border,
    borderRadius: 8,
    backgroundColor: theme.colours.background,
  },
  picker: {
    height: 50,
    color: theme.colours.text,
  },
  errorText: {
    fontSize: 14,
    color: theme.colours.secondary,
    marginTop: 4,
  },
});
