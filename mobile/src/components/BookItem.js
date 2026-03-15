import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookItem = ({ title, author, published_year, average_rating }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.year}>{published_year}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{average_rating}</Text>
        <Text style={styles.star}>★</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1e1eff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#ffffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e9e5e5ff',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#a8a5a5ff',
    marginBottom: 2,
  },
  year: {
    fontSize: 12,
    color: '#999',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0b4fe2ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f3bf12ff',
    marginRight: 4,
  },
  star: {
    color: '#f3bf12ff',
    fontSize: 14,
  },
});

export default BookItem;
