import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/EventStack';
import { useFavorites } from '../contexts/FavoritesContext';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

export default function EventDetailsScreen({ route, navigation }: Props) {
  const { event } = route.params;
  const { favorites, add, remove } = useFavorites();
  const isFav = favorites.some(e => e.id === event.id);

  const toggleFavorite = () => {
    isFav ? remove(event.id) : add(event);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>{event.date.toLocaleDateString()} @ {event.time}</Text>
          <Text style={styles.meta}>{event.location}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <Button title={isFav ? 'Remove from Favorites' : 'Add to Favorites'} onPress={toggleFavorite} />
          <Button title="Back to List" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  image: { width: '100%', height: 200 },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  meta: { fontSize: 14, color: '#555', marginBottom: 4 },
  description: { fontSize: 14, marginBottom: 16 },
});