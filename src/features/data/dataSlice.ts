import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from './dataThunks';

interface DataState {
  data: any[]
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
		updateRow: (state, action) => {
			const { id, data } = action.payload;
			const index = state.data.findIndex(row => row.id === id);
			state.data[index] = data;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchData.fulfilled, (state, action: PayloadAction<any[]>) => {
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
