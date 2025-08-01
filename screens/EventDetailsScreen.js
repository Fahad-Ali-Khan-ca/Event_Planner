/* screens/EventDetailsScreen.js */
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Button, StyleSheet, StatusBar, Platform, Alert } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;
  const { favorites, add, remove } = useFavorites();
  const isFav = favorites.some(e => e.id === event.id);

  function toggleFavorite() {
    isFav ? remove(event.id) : add(event);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>{event.date} @ {event.time}</Text>
          <Text style={styles.meta}>{event.location}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <Button
            title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={toggleFavorite}
          />
          <Button title="Back to List" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}