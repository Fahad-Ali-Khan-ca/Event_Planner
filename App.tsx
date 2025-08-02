import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { FavoritesProvider } from './contexts/FavoritesContext';
import AppNavigator from './navigation';

export default function App() {
  return (
    <FavoritesProvider>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
        <ExpoStatusBar style="auto" />
      </SafeAreaView>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});