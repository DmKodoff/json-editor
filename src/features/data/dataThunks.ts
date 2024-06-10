// dataThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import dataService from '../../services/dataService';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
	const data = await dataService.fetchData();

	return data;
});
