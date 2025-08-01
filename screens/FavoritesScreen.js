/* screens/FavoritesScreen.js */
import React from 'react';
import { SafeAreaView, FlatList, View, Text, Button, TouchableOpacity, StyleSheet, StatusBar, Platform, Alert } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites, remove, clear } = useFavorites();

  function confirmClear() {
    Alert.alert(
      'Clear Favorites?',
      'Remove all favorite events?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => clear() }
      ]
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetails', { event: item })}>
      <Text style={styles.title}>{item.title}</Text>
      <Button title="Remove" onPress={() => remove(item.id)} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Clear All Favorites" onPress={confirmClear} />
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

