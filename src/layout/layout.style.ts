import { StyleSheet } from "react-native";
import { theme } from "../theme";
import { Link } from "@react-navigation/native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: theme.colours.primary,
    paddingVertical: 10,
  },
  title: {
    color: 'white',
    fontSize: theme.typography.lg,
    alignItems:'flex-end',
    marginLeft:15,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: theme.colours.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colours.border,
  },
  link: {
    padding: 10,
  },
  linkText: {
    marginLeft:10,
    fontSize: 16,
    color: theme.colours.text,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
});
