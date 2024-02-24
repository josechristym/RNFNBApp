// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootreducers'; // Import your reducers

const store = configureStore({
  reducer: rootReducer,
  // Additional configuration options can be added here
});

export default store;