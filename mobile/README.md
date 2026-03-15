# Tidelit Book App - Mobile Client

This is the React Native (Expo) mobile client for the Tidelit Book application. It consumes the `GET /api/books` endpoint to display a list of books and their ratings.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- Expo Go app on your physical device (iOS/Android), or an Android Emulator / iOS Simulator.

## Installation and Execution

1. **Navigate to the mobile directory**:
   ```bash
   cd mobile
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```
   *(Alternatively, you can run `pnpm expo start`)*

4. **Run the App**:
   - Press `a` in the terminal to open it in an Android Emulator.
   - Press `i` in the terminal to open it in an iOS Simulator.
   - Or scan the QR code with the Expo Go app on your physical device.

## Features

- **Book List**: Displays a scrollable list of books with title, author, published year, and average rating.
- **Pull-to-Refresh**: Swipe down on the list to fetch the latest data from the server.
- **Error Handling**: Displays an error message and a retry button if the backend server is unreachable.

## Configuration

By default, the app expects the backend to run locally. 
- For Android Emulator, the app connects to `10.0.2.2:8000`.
- For iOS Simulator, it connects to `localhost:8000`.

If you need to change the API URL (e.g., to run on a physical device pointing to your computer's local network IP), you can set the `EXPO_PUBLIC_API_URL` environment variable:
```bash
EXPO_PUBLIC_API_URL=http://192.168.1.X:8000 npx expo start
```
