import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../../layout/Layout';

const StaffStatusScreen = ({ navigation }: any) => {
  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Staff Status</Text>
        <Text>Staff status content goes here.</Text>
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

export default StaffStatusScreen;
