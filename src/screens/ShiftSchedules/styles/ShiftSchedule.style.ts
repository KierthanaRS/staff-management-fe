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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
