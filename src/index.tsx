import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { AppProvider } from './appContext';
import MainPage from './pages/MainPage/MainPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <MainPage />
    </AppProvider>

  </React.StrictMode>
);
