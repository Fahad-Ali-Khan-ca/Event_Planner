// seedEvents.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Paste your same firebaseConfig here:
const firebaseConfig = {
  apiKey: "AIzaSyAz34G59rJ75vGhsK7a5Zkq9EaRiAdkG6Y",
  authDomain: "lab3--fahad-ali-khan.firebaseapp.com",
  projectId: "lab3--fahad-ali-khan",
  storageBucket: "lab3--fahad-ali-khan.firebasestorage.app",
  messagingSenderId: "980249952581",
  appId: "1:980249952581:web:84924c326ef35aac2b3e2c",
  measurementId: "G-BW1NXFMNM5"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Your sample events
const sampleEvents = [
  {
    title: "Live Jazz at the Park",
    date: "2025-09-15",
    time: "18:30",
    location: "Harbourfront Patio",
    description: "Free outdoor concert featuring local jazz artists.",
    imageUrl: "https://example.com/jazz.jpg"
  },
  {
    title: "Artisan Market",
    date: "2025-09-20",
    time: "10:00",
    location: "Downtown Square",
    description: "Hand-made crafts, food trucks, live music.",
    imageUrl: "https://example.com/market.jpg"
  },
  {
    title: "Summer Food Festival",
    date: "2025-09-20",
    time: "12:00",
    location: "Central Park",
    description: "Enjoy street food from around the world in a family-friendly outdoor market.",
    imageUrl: "https://example.com/foodfest.jpg"
  },
  {
    title: "Tech Startup Pitch Night",
    date: "2025-09-20",
    time: "19:00",
    location: "Innovation Hub Auditorium",
    description: "Watch local startups pitch their ideas to a panel of investors.",
    imageUrl: "https://example.com/pitchnight.jpg"
  },
  {
    title: "Outdoor Yoga Session",
    date: "2025-09-20",
    time: "08:30",
    location: "Riverside Lawn",
    description: "Free all-levels yoga class overlooking the river. Bring your own mat.",
    imageUrl: "https://example.com/yoga.jpg"
  },
  {
    title: "Charity Fun Run",
    date: "2025-09-20",
    time: "09:00",
    location: "City Stadium Track",
    description: "5K run in support of local children’s hospitals. Register online in advance.",
    imageUrl: "https://example.com/funrun.jpg"
  },
  {
    title: "Stand-up Comedy Night",
    date: "2025-09-20",
    time: "20:00",
    location: "Downtown Comedy Club",
    description: "Laugh out loud with top regional comedians. 19+ only.",
    imageUrl: "https://example.com/comedy.jpg"
  },
  {
    title: "Art Exhibition Opening",
    date: "2025-09-20",
    time: "17:00",
    location: "Modern Art Gallery",
    description: "Opening reception for a new collection of contemporary paintings and sculptures.",
    imageUrl: "https://example.com/artexhibit.jpg"
  },
  {
    title: "Movie Under the Stars",
    date: "2025-09-20",
    time: "20:30",
    location: "Westside Amphitheater",
    description: "Outdoor screening of a classic film. Bring blankets and snacks.",
    imageUrl: "https://example.com/movieoutdoor.jpg"
  },
  {
    title: "Wine Tasting Evening",
    date: "2025-09-20",
    time: "18:00",
    location: "Vineyard Terrace",
    description: "Sample fine wines from local vineyards accompanied by cheese pairings.",
    imageUrl: "https://example.com/winetasting.jpg"
  }
];

async function seed() {
  for (const ev of sampleEvents) {
    await addDoc(collection(db, 'events'), ev);
    console.log(`Added event: ${ev.title}`);
  }
  console.log('All done!');
  process.exit(0);
}

seed().catch(console.error);
