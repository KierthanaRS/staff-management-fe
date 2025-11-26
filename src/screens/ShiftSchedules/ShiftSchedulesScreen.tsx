import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../../layout/Layout';

const ShiftSchedulesScreen = ({ navigation }: any) => {
  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Shift Schedules</Text>
        <Text>Shift schedules content goes here.</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ShiftSchedulesScreen;
