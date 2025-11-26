import { StyleSheet } from 'react-native';
import { theme } from '../../../theme'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colours.background,
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: theme.colours.text,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer:{
     flexDirection:'row',
     justifyContent:'space-between'
  },
  name: {
    fontWeight: 'bold',
    fontSize: theme.typography.md,
  },

  shift: {
    marginTop: 6,
    color: theme.colours.subtext,
  },

  shiftHighlight: {
    color: theme.colours.primary,
    fontWeight: '600',
  },

  id: {
    marginTop: 4,
    fontSize: theme.typography.sm,
    color: theme.colours.subtext,
  },

  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
});
