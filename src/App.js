/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text,
} from 'react-native';

const App: () => Node = () => (
  <>
    <SafeAreaView style={styles.statusBar}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
    </SafeAreaView>
    <SafeAreaView>
      <Text>성지원 바보 멍청이</Text>
    </SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#000000',
  },
});

export default App;
