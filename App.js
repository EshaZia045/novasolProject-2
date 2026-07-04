import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PomodoroTimer from './PomodoroTimer';
import LocationCheckIn from './LocationCheckIn';

// ---------- Phase 1: Playlist Component ----------
const TrackItem = ({ title, artist }) => {
  return (
    <View style={styles.trackBox}>
      <Text style={styles.trackTitle}>{title}</Text>
      <Text>{artist}</Text>
    </View>
  );
};

function Playlist() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks([
      { id: '1', title: 'Focus Flow', artist: 'Nova Beats' },
      { id: '2', title: 'Deep Work', artist: 'LoFi Study' }
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Focus Playlist</Text>
      {tracks.map((track) => (
        <TrackItem key={track.id} title={track.title} artist={track.artist} />
      ))}
    </View>
  );
}

// ---------- Home Menu + Navigation ----------
export default function App() {
  const [screen, setScreen] = useState('home');

  if (screen === 'playlist') return <ScreenWrapper onBack={() => setScreen('home')}><Playlist /></ScreenWrapper>;
  if (screen === 'pomodoro') return <ScreenWrapper onBack={() => setScreen('home')}><PomodoroTimer /></ScreenWrapper>;
  if (screen === 'location') return <ScreenWrapper onBack={() => setScreen('home')}><LocationCheckIn /></ScreenWrapper>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NovaSol Milestone 2</Text>

      <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('playlist')}>
        <Text style={styles.menuButtonText}>Phase 1: Playlist</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('pomodoro')}>
        <Text style={styles.menuButtonText}>Phase 2: Pomodoro Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('location')}>
        <Text style={styles.menuButtonText}>Phase 3: Location Check-In</Text>
      </TouchableOpacity>
    </View>
  );
}

function ScreenWrapper({ children, onBack }) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back to Menu</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  trackBox: { padding: 15, backgroundColor: '#e2e8f0', marginBottom: 10 },
  trackTitle: { fontSize: 16, fontWeight: '600' },
  menuButton: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15
  },
  menuButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  backButton: { padding: 15, paddingTop: 50 },
  backButtonText: { color: '#4f46e5', fontWeight: 'bold', fontSize: 16 }
});