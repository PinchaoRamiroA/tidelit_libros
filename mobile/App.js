import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, View } from 'react-native';
import BookListScreen from './src/screens/BookListScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <BookListScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Quick fix for Android StatusBar
  },
});
