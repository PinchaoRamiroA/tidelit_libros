import { defineStore } from 'pinia'
import axios from 'axios'
import { Book } from '../models/Book'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const useBookStore = defineStore('book', {
    state: () => ({
        books: [],
        loading: false
    }),

    actions: {
        setBooks(books) {
            this.books = books
        },

        async chargeBooks() {
            if (this.loading) return

            this.loading = true

            try {
                const response = await axios.get(`${API_URL}/api/books`)
                const rawBooks = response.data.data || response.data
                this.books = rawBooks.map(item => new Book(item))
            } finally {
                this.loading = false
            }
        }
    }
})