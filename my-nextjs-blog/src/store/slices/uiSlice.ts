import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface UiState {
  isDarkMode: boolean;
  notifications: Notification[];
  isModalOpen: boolean;
  modalContent: string | null;
}

const initialState: UiState = {
  isDarkMode: false,
  notifications: [],
  isModalOpen: false,
  modalContent: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    addNotification(state, action: PayloadAction<Omit<Notification, 'id'>>) {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
      state.notifications.push({ ...action.payload, id });
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    openModal(state, action: PayloadAction<string>) {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalContent = null;
    },
  },
});

export const {
  toggleDarkMode,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
