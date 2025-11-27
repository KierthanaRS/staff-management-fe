import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colours.background,
    padding: 18,
    marginVertical: 10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: theme.colours.border,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderLeftColor: theme.colours.primary,
    borderLeftWidth: 6,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: theme.typography.md,
    fontWeight: 'bold',
    color: theme.colours.text,
  },

  time: {
    marginTop: 6,
    fontSize: theme.typography.sm,
    color: theme.colours.subtext,
  },

  daysRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },

  dayPill: {
    backgroundColor: theme.colours.day,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  dayText: {
    fontSize: 12,
    color: theme.colours.primary,
    fontWeight: '600',
  },
});
