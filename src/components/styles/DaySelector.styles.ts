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
    gap:2
    // justifyContent: 'space-between',
  },
  
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    minWidth:50,
    borderRadius: 8,
    backgroundColor: theme.colours.background,
    marginHorizontal: 1,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: theme.colours.border,
    justifyContent:'center',
    alignItems:'center'
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
