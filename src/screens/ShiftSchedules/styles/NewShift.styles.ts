import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.background,
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 10,
    borderRadius: 20,
    elevation: 8,
    shadowColor: theme.colours.border,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginBottom: 10,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },

  activitIndicator: {
    fontSize: 16,
    color: theme.colours.primary,
    textAlign: 'center',
    marginTop: 16,
  },

  title: {
    fontSize: theme.typography.xl,
    fontWeight: '900',
    color: theme.colours.text,
    marginBottom: 10,
  },

  underline: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colours.border,
    marginBottom: 20,
  },

  timer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  
  timerComponent: {
    flex: 1,
  },
});
