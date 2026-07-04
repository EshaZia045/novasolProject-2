import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

export default function LocationCheckIn() {
  const [locationData, setLocationData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    // Ask the user for foreground location permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission Denied');
      setLocationData(null);
      return;
    }

    // Permission granted: fetch current GPS coordinates
    setErrorMsg(null);
    const currentPosition = await Location.getCurrentPositionAsync({});
    setLocationData(currentPosition.coords);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NovaSol Remote Operations</Text>

      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.buttonText}>CHECK IN FOR SHIFT</Text>
      </TouchableOpacity>

      {errorMsg && <Text style={styles.errorText}>Status: {errorMsg}</Text>}

      {locationData && (
        <View style={styles.resultBox}>
          <Text style={styles.statusText}>Status: Location Acquired!</Text>
          <Text>Latitude: {locationData.latitude.toFixed(4)}</Text>
          <Text>Longitude: {locationData.longitude.toFixed(4)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#059669',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 25
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  resultBox: { alignItems: 'center' },
  statusText: { fontWeight: 'bold', marginBottom: 8, color: '#059669' },
  errorText: { color: '#dc2626', fontWeight: 'bold' }
});
