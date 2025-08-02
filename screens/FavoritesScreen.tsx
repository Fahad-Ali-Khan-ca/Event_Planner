import React from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/EventStack';
import { useFavorites, Event } from '../contexts/FavoritesContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
  const { favorites, remove, clear } = useFavorites();

  const confirmClear = () =>
    Alert.alert(
      'Clear Favorites?',
      'Remove all favorite events?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, clear', onPress: () => clear() },
      ]
    );

  const renderItem = ({ item }: { item: Event }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetails', { event: item })}>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
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
        ListEmptyComponent={<Text style={styles.empty}>No favorites yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 8, padding: 12, backgroundColor: 'white', borderRadius: 8, elevation: 2 },
  title: { flex: 1, fontSize: 16, marginRight: 12 },
  empty: { marginTop: 20, textAlign: 'center', color: '#555' },
});
