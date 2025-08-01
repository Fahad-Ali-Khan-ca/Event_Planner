import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';

export default function EventListScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const q = query(collection(db, 'events'), orderBy('date'), orderBy('time'));
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchEvents();
  }, []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetails', { event: item })}>
        <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.date} @ {item.time}</Text>
          <Text style={styles.meta}>{item.location}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0 },
  card: { flexDirection: 'row', margin: 8, backgroundColor: 'white', borderRadius: 8, overflow: 'hidden' },
  thumbnail: { width: 100, height: 100 },
  info: { flex: 1, padding: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  meta: { fontSize: 12, color: '#555' }
});