import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  // Converts raw seconds into "MM:SS" formatted text
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const paddedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${minutes}:${paddedSecs}`;
  };

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup: clears the interval when paused, unmounted, or re-triggered
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NovaSol Productivity Engine</Text>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePause}>
          <Text style={styles.buttonText}>PAUSE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  timerText: { fontSize: 64, fontWeight: 'bold', marginBottom: 30 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginHorizontal: 5
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
