import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/data/dataSlice';

const store = configureStore({
	reducer: {
		data: dataReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
