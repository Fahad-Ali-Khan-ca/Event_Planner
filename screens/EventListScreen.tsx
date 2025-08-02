import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Button
} from 'react-native';
import { collection, getDocs, query, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db, Timestamp } from '../config/FirebaseConfig';
import { Event } from '../contexts/FavoritesContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/EventStack';

type Props = NativeStackScreenProps<RootStackParamList, 'EventList'>;

export default function EventListScreen({ navigation }: Props) {
  const [events, setEvents] = useState<Event[]>([]);

    React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Favorites"
          onPress={() => navigation.navigate('Favorites')}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchEvents() {
      try{
      const q = query(collection(db, 'events'), orderBy('date'));
      const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const evs: Event[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
          time: data.time,
          location: data.location,
          description: data.description,
          imageUrl: data.imageUrl,
        };
      });
      setEvents(evs);
    } catch(err){
      console.error("Error fetching events:", err);                       // ← catch errors
    }
    }
    fetchEvents();
  }, []);

  const renderItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventDetails', { event: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.date.toLocaleDateString()} @ {item.time}</Text>
        <Text style={styles.meta}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No events found.</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  card: { flexDirection: 'row', margin: 8, backgroundColor: 'white', borderRadius: 8, overflow: 'hidden', elevation: 2 },
  thumbnail: { width: 100, height: 100 },
  info: { flex: 1, padding: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  meta: { fontSize: 12, color: '#555' },
  empty: { marginTop: 50, textAlign: 'center', color: '#555' },

});
