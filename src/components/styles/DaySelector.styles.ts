import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  label: {
    fontSize: 14,
    color: theme.colours.text,
    fontWeight: '600',
    marginBottom: 10,
  },

  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 50,
    backgroundColor: theme.colours.background,
    marginHorizontal: 2,
    marginBottom: 4,
  },

  daySelected: {
    backgroundColor: theme.colours.primary,
    borderColor: theme.colours.border,
    borderWidth: 1,
  },

  dayText: {
    fontSize: theme.typography.sm,
    color: theme.colours.subtext,
  },

  dayTextSelected: {
    color: theme.colours.background,
    fontWeight: '500',
  },
});
