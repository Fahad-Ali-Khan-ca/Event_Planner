import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FavoritesProvider } from './contexts/FavoritesContext';
import AppNavigator from './navigation';

export default function App() {
  return (
    <View style={styles.container}>
       <FavoritesProvider><AppNavigator/></FavoritesProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
