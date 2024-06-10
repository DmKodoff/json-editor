import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { fetchData } from './features/data/dataThunks';
import AppContent from './components/AppContent';

const App = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	return (
		<div>
			<h1>JSON Data Editor</h1>
			<AppContent />
		</div>
	);
};

export default App;
