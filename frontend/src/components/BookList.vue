<script setup>
import { ref, onMounted } from 'vue'
import { Book } from '../models/Book'

const books = ref([])
const loading = ref(false)
const error = ref(null)

const fetchBooks = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('/api/books')
    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    const rawBooks = data.data || data
    if (!Array.isArray(rawBooks)) {
      throw new Error('Invalid format: expected an array')
    }
    books.value = rawBooks.map(item => new Book(item))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<template>
  <div class="book-list-container">
    <h2>Book List</h2>
    <button @click="fetchBooks" :disabled="loading" class="refresh-btn">
      {{ loading ? 'Refreshing...' : 'Refresh List' }}
    </button>
    
    <div v-if="error" class="error-msg">
      {{ error }}
    </div>

    <div v-else-if="loading && books.length === 0" class="loading-msg">
      Loading books...
    </div>

    <ul v-else class="book-list">
      <li v-for="book in books" :key="book.id" class="book-item">
        <div class="book-info">
          <span class="book-title">{{ book.title }}</span>
          <br>
          <small class="book-author" v-if="book.author">por {{ book.author }} ({{ book.published_year }})</small>
        </div>
        <span class="book-rating" v-if="book.average_rating !== null">
           ⭐ {{ Number(book.average_rating).toFixed(1) }}
        </span>
        <span class="book-rating" v-else>
           Sin calificación
        </span>
      </li>
    </ul>
    
    <div v-if="!loading && books.length === 0 && !error" class="empty-msg">
      No books available.
    </div>
  </div>
</template>

<style scoped>
.book-list-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #333;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.refresh-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.refresh-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.error-msg {
  color: #e74c3c;
  text-align: center;
  padding: 10px;
  background-color: #fadbd8;
  border-radius: 4px;
}

.loading-msg, .empty-msg {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 20px;
}

.book-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ecf0f1;
  background-color: white;
  margin-bottom: 5px;
  border-radius: 4px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.book-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.book-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.book-title {
  font-weight: 600;
  color: #2c3e50;
  display: inline-block;
  margin-bottom: 4px;
}

.book-author {
  color: #7f8c8d;
  font-size: 13px;
}

.book-rating {
  font-size: 14px;
  color: #f39c12;
  font-weight: bold;
}
</style>
