# System Implementation Walkthrough

## Overview
I have successfully implemented both the Vue 3 frontend and the React Native mobile application as requested.

### Vue 3 Frontend
The application is scaffolded using Vite and Vue 3, with Vitest for unit testing. It includes a minimal setup, replacing the default starter code with a functional `BookList` component that consumes the `/api/books` API.

#### Changes Made
- Scaffolded a new Vue 3 project in `frontend/`.
- Created [src/components/BookList.vue](file:///home/computer/Documentos/tidelit_libros/frontend/src/components/BookList.vue) which fetches books from `/api/books`.
- Replaced the default [src/App.vue](file:///home/computer/Documentos/tidelit_libros/frontend/src/App.vue) content with `<BookList />`.
- Added a Vite proxy configuration in [vite.config.js](file:///home/computer/Documentos/tidelit_libros/frontend/vite.config.js) to route `/api` to `localhost:8000`.
- Wrote unit tests for [BookList.vue](file:///home/computer/Documentos/tidelit_libros/frontend/src/components/BookList.vue) in [src/components/__tests__/BookList.spec.js](file:///home/computer/Documentos/tidelit_libros/frontend/src/components/__tests__/BookList.spec.js).

#### Testing and Verification
Unit tests were written and executed, covering the initial loading state, successful fetches, failed fetches, empty responses, and refresh button click events. All 5 tests are passing.

To run the application manually:
1. Ensure your backend API is running on `http://localhost:8000`.
2. Move into the frontend directory: `cd frontend`.
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Visit `http://localhost:5173` to view the application in action.

---

### React Native Mobile App
A new generic Expo app was created to consume the same API. The app is written in React Native and uses modern Hooks for state management and an elegant UI.

#### Changes Made
- Scaffolded the React Native project inside the `mobile/` directory using `pnpm dlx create-expo-app .`.
- Configured a scalable folder structure under `mobile/src/` (api, components, screens).
- Implemented `booksService.js` using `axios` for fetching `/api/books`.
- Created a `BookItem` component to cleanly display the `title`, `author`, `published_year`, and `average_rating`.
- Developed the main `BookListScreen`, featuring a `FlatList` with implemented pull-to-refresh logic, loading states, and error handling.
- Replaced the default `App.js` entry point with the newly created `BookListScreen` wrapped inside a `SafeAreaView`.
- Added a specific [mobile/README.md](file:///home/computer/Documentos/tidelit_libros/mobile/README.md) with detailed steps to install dependencies (`pnpm install`) and start the app (`npx expo start`).


#### Testing and Verification
The mobile client handles errors, loading gracefully, and pull-to-refresh.
To run the Mobile App manually:
1. Move into the mobile directory: `cd mobile`
2. Install the dependencies via pnpm: `pnpm install`
3. Start Expo server via `npx expo start`
4. Open the emulator Android/iOS (`a` or `i`) or scan the QR Code.
