/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Permissions} from '@cross/permissions';
import {paymentsApi} from '@cross/core';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.sectionContainer}>
        <Text style={styles.aaa}>Payment APIs</Text>
        <Text style={styles.aaa}>{paymentsApi.getPayments()}</Text>
        <Text style={styles.aaa}>{paymentsApi.getPayment(':id')}</Text>

        {Object.values(Permissions).map(permission => (
          <Text key={permission} style={styles.text}>
            {permission}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  aaa: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  sectionContainer: {
    height: '100%',
    marginTop: 100,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
