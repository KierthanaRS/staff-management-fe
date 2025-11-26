import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const addStaffStyles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: theme.colours.background,
    paddingHorizontal: 20,
    paddingTop: 20,
    margin: 20,
    borderRadius: 20,
    elevation: 8,
    shadowColor: theme.colours.border,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: theme.typography.xl,
    fontWeight: '900',
    color: theme.colours.text,
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 0.5,
    marginRight: 10,
  },
  fullWidth: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'column',
    gap: 10,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  countryPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colours.border,
    marginBottom: 20,
  },
  countryCodeWrapper: {
    flex: 0.3,
  },

  phoneInputWrapper: {
    flex: 0.65,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: theme.colours.background,
  },
});
