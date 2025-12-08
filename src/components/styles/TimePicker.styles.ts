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

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },

  content: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  doneButton: {
  marginTop: 10,
  padding: 12,
  backgroundColor: "#007AFF",
  borderRadius: 10,
  alignItems: "center",
},

doneText: {
  color: "white",
  fontSize: 16,
  fontWeight: "600",
},

buttonContainer : {
  flexDirection:'row',
  justifyContent:'space-between'
}
});
