import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';


// --- Load from localStorage ---
const loadFromLocalStorage = () => {
  if (typeof window === 'undefined') return undefined;
  try {
    const data = localStorage.getItem('userState');
    return data ? JSON.parse(data) : undefined;
  } catch (e) {
    console.warn('Load error', e);
    return undefined;
  }
};

// --- Save to localStorage ---
const saveToLocalStorage = (state: any) => {
  try {
    const serialized = JSON.stringify(state.user);
    localStorage.setItem('userState', serialized);
  } catch (e) {
    console.warn('Save error', e);
  }
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: loadFromLocalStorage(), // 👈 load initial state
  },
});

// Save to localStorage on every change
store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;