<script setup>
import BookList from './components/BookList.vue'
</script>

<template>
  <main>
    <BookList />
  </main>
</template>

<style>
/* Remove default create-vue styling */
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #ecf0f1;
}

#app {
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
</style>
