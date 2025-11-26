import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  label: {
    fontSize: 14,
    color: theme.colours.text,
    fontWeight: "600",
    marginBottom: 10,
  },

  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // flexWrap: "wrap",
  },

  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 50,
    backgroundColor: theme.colours.background,
    marginHorizontal: 4,
    marginBottom: 4,
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
    fontWeight: "500",
  },
});
