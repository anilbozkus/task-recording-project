import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import MainPage from './pages/MainPage/mainPage';
import { AppProvider } from './appContext';


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
