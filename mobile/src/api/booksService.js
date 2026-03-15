import axios from 'axios';
import { Platform } from 'react-native';

// Default host based on platform: 10.0.2.2 is the special alias for the host loopback interface in the Android emulator
// For iOS simulator and web, localhost is fine. If using a physical device, this should be the computer's local IP.
const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const API_URL = process.env.EXPO_PUBLIC_API_URL || `http://[IP_ADDRESS]`;
console.log(API_URL)
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const fetchBooks = async () => {
  try {
    const response = await api.get('/api/books');
    // We expect the array directly if the backend is configured this way
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error?.message || error);
    throw error;
  }
};
