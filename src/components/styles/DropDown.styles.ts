import { StyleSheet, Platform } from 'react-native';
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

  inputBox: {
    borderWidth: 1,
    borderColor: theme.colours.border,
    borderRadius: 8,
    backgroundColor: theme.colours.background,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  inputText: {
    fontSize: 16,
    color: theme.colours.text,
  },

  placeholder: {
    color: theme.colours.border,
  },

  errorText: {
    fontSize: 14,
    color: theme.colours.secondary,
    marginTop: 4,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'center',
  },

  modalOverlayDesktop: {
    flex: 1,
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: theme.colours.background,
    padding: 20,
    maxHeight: '60%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  modalContentDesktop: {
    width: '40%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: theme.colours.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  androidCentered: {
    borderRadius: 16,
    marginHorizontal: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  modalTitleDesktop: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },

  option: {
    paddingVertical: 14,
    // borderBottomWidth: 1,
    borderBottomColor: theme.colours.border,
  },

  optionDesktop: {
    paddingVertical: 16,
  },

  optionText: {
    fontSize: 16,
    color: theme.colours.text,
  },

  cancelButton: {
    marginTop: 10,
  },

  cancelButtonText: {
    textAlign: 'center',
    color: theme.colours.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
