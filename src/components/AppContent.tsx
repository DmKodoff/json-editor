import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import DataTable from './DataTable';

const AppContent = () => {
	const status = useSelector((state: RootState) => state.data.status);
	const error = useSelector((state: RootState) => state.data.error);
	const isFetching = status === 'loading';
	const isError = status === 'failed';

	if (isError) {
		return (
			<div>
				Error:
				{error}
			</div>
		);
	}

	if (isFetching) {
		return <p>Get data...</p>;
	}

	return <DataTable />;
};

export default AppContent;
