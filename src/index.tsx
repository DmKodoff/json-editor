import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</Provider>
	</React.StrictMode>
);
