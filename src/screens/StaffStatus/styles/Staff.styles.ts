import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  containerDesktop: {
    width: '90%',
    maxWidth: 1200,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: theme.colours.background,
    borderRadius: 20,
    shadowColor: theme.colours.border,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth:1,
    borderColor: theme.colours.border
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

  desktopButton: {
    marginTop: 10,
    backgroundColor: theme.colours.background,
  },
});
