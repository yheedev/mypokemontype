import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { persistor } from './stores/store';
import { PersistGate } from 'redux-persist/integration/react';
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer, { persistedReducer } from 'stores/reducer';
// import RootRoute from 'route/RootRoute';
import { store } from 'stores/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
