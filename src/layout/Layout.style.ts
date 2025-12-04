import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerDesktop: {
    flexDirection: 'row',
  },

  topBar: {
    backgroundColor: theme.colours.primary,
    paddingVertical: 10,
  },

  topBarDesktop: {
    width: 260,
    height: '100%',
    paddingVertical: 30,
    justifyContent: 'flex-start',
  },

  title: {
    color: 'white',
    fontSize: theme.typography.lg,
    alignItems: 'flex-end',
    marginLeft: 15,
    fontWeight: 'bold',
  },

  header: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: theme.colours.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colours.border,
  },

  headerDesktop: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    marginTop: 20,
  },

  link: {
    padding: 10,
  },

  linkDesktop: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  activeLink: {
    padding: 10,
    marginLeft:10,
    borderBottomWidth: 4,
    borderBottomColor: theme.colours.primary,
  },

  activeLinkDesktop: {
    padding: 10,
    marginLeft:10,
    borderBottomWidth: 0,
    backgroundColor: theme.colours.border, 
    borderRadius: 6,
  },

  linkText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.colours.text,
    fontWeight: '500',
  },

  linkTextDesktop: {
    marginLeft: 0,
  },

  content: {
    flex: 1,
  },

  contentDesktop: {
    padding: 20,
  },

});
