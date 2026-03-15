# Tidelit Books Frontend

This is the Vue 3 frontend for the Tidelit Books application. It consumes the `/api/books` endpoint to display a list of books and their average ratings.

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

## Installation

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server, run:
```bash
npm run dev
```

This will start Vite. By default, it runs on `http://localhost:5173`. We have configured a proxy to forward requests to `/api/*` to `http://localhost:8000`. Make sure your backend server is running on port 8000.

## Running Tests

We use Vitest for unit testing. To run the tests, use:
```bash
npm run test:unit
```
