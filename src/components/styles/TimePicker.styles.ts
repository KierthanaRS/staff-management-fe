import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  label: {
    fontSize: theme.typography.sm,
    color: theme.colours.text,
    marginBottom: 5,
    fontWeight: '600',
  },

  input: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: theme.colours.background,
    borderWidth: 1,
    borderColor: theme.colours.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  value: {
    fontSize: 16,
    color: theme.colours.subtext,
  },
  
  placeholder: {
    fontSize: 16,
    color: theme.colours.text,
  },
});
