import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from './dataThunks';

interface DataState {
  data: unknown[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string | null
}

const initialState: DataState = {
	data: [],
	status: 'idle',
	error: null,
};
const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		updateRow: (state, action: PayloadAction<{ id: string; data: unknown }>) => {
			const { id, data } = action.payload;
			const index = state.data.findIndex((row) => {
				if (typeof row === 'object' && row !== null && 'id' in row) {
					return row.id === id;
				}
				return false;
			});
			if (index !== -1) {
				state.data[index] = data;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchData.fulfilled, (state, action: PayloadAction<unknown[]>) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});
export const { updateRow } = dataSlice.actions;
export default dataSlice.reducer;
